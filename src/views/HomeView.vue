<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>Ovde je data: {{x}} </p>
    <p>Ovde je computed: {{myProp}} </p>
    <input v-model="myProp" />
    <button @click="doThis">klik</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      x: "Marko krasic Jelic",
      y: "Jedi govna"   
    }
  },
  methods: {
    doThis() {
      this.myProp = "Niko Nije Kao Ti";
    }
  },
  computed: {
    myProp: {
      get() {
        var names = this.x.split(' ');
        return names[0] + " " + names[names.length - 1];
      },
      set(newVal) {
        this.x += newVal;        
      }
    }
  }
}
</script>
