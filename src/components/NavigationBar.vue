<template>
<div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mx-5">
        <a class="navbar-brand" href="#">
            <img alt="Vue logo" src="../assets/logo.png">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-nav mr-auto">
                <router-link to="/" class="nav-item nav-link">Home</router-link>
                <router-link to="/About" class="nav-item nav-link">About</router-link>
                                
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
export default {

}
</script>

<style scoped>
    .nav-link {
        color: #000000;
        font-size: 28px;        
    }
    nav {
        padding: 30px;  
        height: 90px; 
        background-color: #cbcbcb;
        text-align: center;
    }

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