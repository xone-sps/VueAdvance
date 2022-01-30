<template>
  <div>
    <h1>Login</h1>

     <div class="credential">
       <label>Credential</label>
       <input v-model="user.email">
     </div>
     <div class="password">
       <label>Password</label>
       <input v-model="user.password">
     </div>
      <div>
        <button @click="submitLogin">Login</button>
      </div>

  </div>
</template>

<script>
import User from "@/store/models/User";
export default {
  name:"Login",
  data:() => ({
    user:new User(),
  }),
  methods:{
   async submitLogin(){
     console.log(this.user)
    try {
      console.log('Loading ...')
      const response = await this.$store.dispatch('auth/login',this.user);
      console.log('response',response)
    }catch (error){
      console.log("error")
    }finally{
     console.log('Loaded');
    }
  }
}}
</script>

<style>
.credential{
  margin-bottom: 8px;
}
.password{
  margin-bottom: 8px;
}
</style>
