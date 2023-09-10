<template>
  <div class="center">
    <img alt="error 404" src="../assets/404error.png">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
</div>
</template>

<script>
export default {

}
</script>

<style>
.center { 
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>