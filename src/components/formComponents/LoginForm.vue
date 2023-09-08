<template>
  <section class="bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">              

              <form @submit.prevent="login" @keyup.enter="login">

                <div class="form-floating mb-4">
                  <input v-model="user" type="email" id="form3Example3cg" class="form-control form-control-lg" required/>
                  <label class="form-label" for="form3Example3cg">Your email</label>                  
                </div>

                <div class="form-floating mb-3">
                  <input v-model="pass" type="password" id="form3Example4cg" class="form-control form-control-lg" required/>
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <label v-if="failed" class="mb-3" style="color: red;">Username or password don't match!</label>

                <div class="d-flex justify-content-center">
                  <button type="submit" class="btn btn-primary btn-lg custom-4">Login</button>
                </div>
                <div class="d-inline-block bg-white rounded p-1 mt-3">
                  <p class="text-center text-muted my-0">Don't have an account? <a href="#signup"
                      class="fw-bold text-body"><u>Sign up here</u></a></p>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
 

<script>
import axios from 'axios';

  export default {  
    el: '#app1',
    components: {
      
    },
    data: function() {
      return {
        failed: false,
        user: "",
        pass: ""   
      }
    },
    methods: {
      async login(){
        this.failed = false;        

        try{
            const response = await axios.post('user/login', {email: this.user, pass: this.pass});
            const userData = response.data;
            
            console.log('response for user: ', response);
            console.log('store: ', this.$store);
            if(userData !== ""){
              this.$store.dispatch("userModule/login", userData);
              this.$router.push('/home');
            } else {
              this.failed = true;
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
      }
    }
  }
</script>

<style scoped>
  .bg-image {
    /* height: calc(100vh - 190px);    */
    height: 100vh;   
    background-repeat: no-repeat;     
    background: url('../../assets/background.jpeg') no-repeat fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;    
  }
    .gradient-custom-3 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(224, 132, 250, 0.5), rgba(143, 211, 244, 0.5))
  }
  .card {
  background-color: rgba(255, 255, 255, 0.66); /* Semi-transparent white background */
  backdrop-filter: blur(2px); 
  }
</style>