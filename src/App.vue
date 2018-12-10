<template>
  <v-app>
    <Header v-if="isShow"></Header>
    <v-content>
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
    </v-content>
  </v-app>
</template>

<script>
  import Header from './components/Header.vue'
  export default {
    data () {
      return {
        isShow:false
      }
    },
    components:{
      Header
    },
    created () {
      if(this.$route.name == 'Login'){
        this.isShow = false
      }else{
        this.isShow = true
      }
    },
    watch: {
      '$route' (to, from) {
        if(to.name == 'Login'){
          this.isShow = false
        }else{
          this.isShow = true
        }
      }
    },
    name: 'App'
  }
</script>