<template>
  <section class="bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">

              <form @submit.prevent="signup" @keyup.enter="signup">

                <div class="form-floating mb-4">
                  <input v-model="formData.user" type="email" id="form3Example3cg" class="form-control form-control-lg" required/>
                  <label class="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div class="form-floating mb-4">
                  <input v-model="formData.pass" type="password" id="form3Example4cg" class="form-control form-control-lg" required/>
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="form-floating mb-4">
                  <input v-model="formData.pass2" type="password" id="form3Example4cdg" class="form-control form-control-lg" required/>
                  <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>   

                <label v-if="passFailed" class="mb-3" style="color: red;">Passwords don't match!</label>             

                <div class="d-flex justify-content-center">
                  <button type="submit"
                    class="btn btn-primary btn-lg">Sign up</button>
                </div>


                <div class="d-inline-block bg-white rounded p-1 mt-3">
                  <p class="text-center text-muted my-0">Have already an account? <a href="#login"
                    class="fw-bold text-body"><u>Login here</u></a></p>
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
        formData: {
          user: "",
          pass: "",
          pass2: ""
        },
        passFailed: false,
        // isFormValid: true,          
      }
    },
    methods: {
      signup(){           
        this.passFailed = false;

        if (this.formData.pass === this.formData.pass2) {
          axios.post('/user', {email: this.formData.user, pass: this.formData.pass}).then(r => {
            var success = r.data;
            if(success === true){
              this.$router.push('/');
            } else {
              alert('Account with that email already exist!!');
            }          
          })
        } else {
          this.passFailed = true;
        }
      }
    }
  }
</script>

<style scoped>
  .input-error {
    border-color: red;
  }

  .bg-image {
    height: 100vh;/*calc(100vh - 90px); */
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
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
  }
  .gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
  }
  .card {
  background-color: rgba(255, 255, 255, 0.66); /* Semi-transparent white background */
  backdrop-filter: blur(2px); 
  }
</style>