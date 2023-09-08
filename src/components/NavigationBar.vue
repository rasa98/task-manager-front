<template>
<div v-if="showNav" id="nav">
    <nav class="navbar navbar-expand-lg mx-5">
        <a class="navbar-brand" href="#">
            <img alt="Vue logo" src="../assets/logo.png">
        </a>
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button> -->

        <div class="navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav mr-auto">
                <router-link to="/" class="nav-item nav-link">Home</router-link>                              
                <!-- <router-link to="/About" class="nav-item nav-link">About</router-link> -->  
                <div class="menu-item" v-for="b in boards" :key="b.id">
                    <router-link to="/board" @click="setCurrentBoard(b.id)">{{ b.name }}</router-link>
                </div>             
                <!-- <drop-down :title="'My boards'"></drop-down>                        -->
            </div>            
        </div>
        

        <form class="d-flex">
            <router-link to="/login" class="nav-item nav-link">
                <img alt="Vue logo" src="../assets/login.png">
            </router-link>
        </form>
        <!-- <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-dark" type="submit">Search</button>
        </form> -->
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
        const routesToHideNavbar = ['login', 'signup']; // Replace with your route names

        // Check if the current route is in the list of routes to hide the navbar
        return !routesToHideNavbar.includes(this.$route.name);
        },
        userEmail() {
            return this.$store.getters["user/getEmail"];
        },
        boards() {
            return this.$store.getters["userModule/getBoards"];
        },        
    },
    methods: {
        setCurrentBoard(id) {
            this.$store.dispatch("getBoardData", id);
        }
    }
}
</script>

<style scoped>
    .nav-link {
        color: #000000;
        font-size: 28px;        
    }
    #nav {                
        background-color: hsl(83, 100%, 97%);
        backdrop-filter: blur(10px);        
    }
    /* .transparent-navbar {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    min-height: 0 !important;
  } */

    nav a {
    font-weight: bold;
    color: #cb2c2c;   
    /* font-family: Avenir, Helvetica, Arial, sans-serif;   */
    }
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