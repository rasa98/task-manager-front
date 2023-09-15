<template>
  <div class="centered-container">
    <div class="m-4 p-4 text-center"> <!-- Center the content horizontally -->
      <p>Choose the board</p>
      <DropDown :bottom="true" :width="'20rem'" label="All boards" theme="auto">
        <div v-for="b in boards" :key="b.id" @click="selectBoardAndLoadSnapshots(b)" style="position: relative;">
          <p>{{ b.name }}</p>
        </div>
      </DropDown>
    </div>

    <div v-if="chartData" class="chart-container">
      <Line :data="chartData" :options="options"></Line>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
    components: {
        Line,
    },
    data() {
        return {                        
            chartData: null,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    computed: {        
        boards() {
            return this.$store.getters["userModule/getBoards"];
        },        
    },
    methods: {
        async selectBoardAndLoadSnapshots(selectedBoard) {  
            try{
                const resp = await axios.get(`boards/${selectedBoard.id}/snapshots`);
                this.prepareSnapshotsForChart(resp.data);
            } catch(error) {
                // Handle errors
                console.error('GET snapshots request error:', error);
            }
        },
        prepareSnapshotsForChart(snapshots) {
            
            const sortedSnapshots = snapshots.sort((a, b) =>
            a.snapshotDate.localeCompare(b.snapshotDate)
            );

            //removed hours mins and secs
            const labels = sortedSnapshots.map((snapshot) => snapshot.snapshotDate.replace(/T\d{2}:\d{2}:\d{2}\.\d+$/, ''));
            const completedTasksData = sortedSnapshots.map((snapshot) => snapshot.completedTasks);
            const undoneTasksData = sortedSnapshots.map((snapshot) => snapshot.undoneTasks);
            const totalTasksData = sortedSnapshots.map((snapshot) => snapshot.totalTasks);

            this.chartData = {
                labels: labels,
                datasets: [
                {
                    label: 'Completed Tasks',
                    data: completedTasksData,
                    borderColor: 'green',
                    fill: false,
                },
                {
                    label: 'Undone Tasks',
                    data: undoneTasksData,
                    borderColor: 'red',
                    fill: false,
                },
                
                {
                    label: 'Total Tasks',
                    data: totalTasksData,
                    borderColor: 'blue',
                    fill: false,
                },
                ],
            };          
        }
    },
}
</script>

<style scoped>
    .chart-container {
        height: 500px;
        width: 1200px;
        /* max-width: 1000px; 
        max-height: 800px;  */
        overflow: auto; 
    }
    .centered-container {
        display: flex;
        flex-direction: column;  
        align-items: center;  
    }
    .dropper-root>.list-group>* {                 
        z-index: 1002 !important;            
    }
    .dropper-root>.list-group> div p {
        text-align: center;  
        margin-top: 0;
        margin-bottom: 0;                   
    }
</style>