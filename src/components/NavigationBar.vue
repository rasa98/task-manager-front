<template>
<div v-if="showNav" id="nav">
    <nav class="navbar navbar-expand-lg mx-5">
        <a href="#/">
            <img alt="Vue logo" src="../assets/logo.png">
        </a>       

        <div class="navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav xy-margin">
                <router-link to="/" class="nav-item nav-link">Home</router-link>                              
                
                <DropDown :bottom="true" label="All boards" theme="auto">
                    <div v-for="b in boards" :key="b.id">
                        <router-link class="nav-link" :to="`/board/${b.id}`">{{ b.name }}</router-link>
                    </div>                
                </DropDown>

            </div>            
        </div>
        
        <!-- <p class="navbar-brand">user: </p> -->
        <DropDown :bottom="true" :label="userEmail" theme="auto">
            <router-link  class="nav-link" to="/login" @click="removeSessionStorage" >
                log out
            </router-link>                
        </DropDown>
        

    
    </nav>
 </div>
  <router-view/>
</template>

<script>
// import DropDown from './utils/DropDown.vue';


export default {
    components: {
        
        
    },
    computed: {
        showNav() {
        // Define the routes where you want to hide the navbar
        const routesToHideNavbar = ['login', 'signup', 'notFoundPage']; // Replace with your route names

        // Check if the current route is in the list of routes to hide the navbar
        return !routesToHideNavbar.includes(this.$route.name);
        },
        userEmail() {
            return this.$store.getters["userModule/getEmail"];
        },
        boards() {
            return this.$store.getters["userModule/getBoards"];
        },        
    },
    methods: {
        // setCurrentBoard(id) {
        //     this.$store.dispatch("getBoardData", id);
        // }
        removeSessionStorage(){
            this.$store.dispatch('userModule/restartUser');
            window.sessionStorage.clear();
        }
    }
}
</script>

<style scoped>    
    .xy-margin > *{
        margin-right: 0.5rem;
        margin-left: 0.5rem;
    }
    .dropper-root {         
        z-index: 5001 !important;             
    }
    .dropper-root>.list-group {
        z-index: 5001 !important;  
           
    }
    .dropper-root>.list-group>* {
        text-align: center;  
        z-index: 5001 !important;   
        background-color: rgb(237, 237, 237) ;            
    }
    .dropper-root>.list-group>*:hover {
         
        background-color: rgb(220, 220, 220) ;            
    }
    .nav-link {
        color: #000000;              
    }
    #nav {                
        background-color: hsl(83, 100%, 97%);
        backdrop-filter: blur(10px);
        z-index: 9999;
        position: relative;        
    }
    /* .transparent-navbar {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    min-height: 0 !inavbar-brand;   
    /* font-family: Avenir, Helvetica, Arial, sans-serif;   */
    /* }, */
    img {
    width: 50px;
    height: auto; 
    }




    /* nav a:hover {  
    /* color: #1188ff; */    
    /* background: rgb(224, 224, 224);  */
    /* border-radius: .5rem; */
    /* } */

    nav a.router-link-exact-active {
    /* color: whitesmoke; */
    background: rgb(207, 207, 207);
    border-radius: .5rem;
    }
    
</style>