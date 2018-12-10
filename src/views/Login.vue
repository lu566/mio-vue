<template>
  <!-- <v-app id="inspire"> -->
    <v-content>
        <v-toolbar color="#3f51b5" class="login-bar"></v-toolbar>
      <v-container fluid fill-height style="margin-top:-120px;">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <div class="login-logo-box">
                <img class="login-logo" src="../assets/images/gitlab-logo.jpg" />
                <p>VPCloud &nbsp;&nbsp;控制台</p>
              </div>
              <v-form  ref="form" v-model="valid" lazy-validation>
              <v-card-text class="input-padding">
                  <v-text-field label="账号" :rules="rules" append-icon="person" placeholder="请输入登录账号" v-model="users"></v-text-field>
                  <v-text-field :rules="rules" append-icon="lock" name="password" label="密码" id="password" placeholder="请输入密码" type="password" v-model="password"></v-text-field>
              </v-card-text>
              <v-card-actions class="login-bottom">
                  <img class="login-gitlab" @click="gotoOauth" src="../assets/images/gitlab-logo.jpg" />
                  <v-spacer></v-spacer>
                <!-- <v-flex xs12 sm12 text-xs-center> -->
                  <v-btn small color="#3f51b5" style="color:#fff;" @click="gotolist">登录</v-btn>
                <!-- </v-flex> -->
              </v-card-actions>
              </v-form>
              <!-- <div class="other-login"> -->
                <!-- <img class="login-gitlab" @click="gotoOauth" src="../assets/images/gitlab-logo.jpg" /> -->
              <!-- </div> -->
            </v-card>
          </v-flex>
        </v-layout>
      <!-- </v-form> -->
      </v-container>
    </v-content>
  <!-- </v-app> -->
</template>
<script type="text/javascript">
  export default{
    data () {
      return {
        valid:true,
        users:'',//用户名
        password:'',//用户密码
        oauthUrl:'',//授权地址
        rules:[
          v => !!v || '不能为空'
        ]
      }
    },
    //第一次创建组件时执行
    created () {
    //   sessionStorage.removeItem('token')
    //   sessionStorage.removeItem('userInfo')
    //   let res = await this.$http('login/getOauth', 'get', {})
    //   if(res.code === 200){
    //     this.oauthUrl = res.data.authUrl
    //   }
    },
    //每一次进入该页面都会执行
    activated () {

    },
    methods: {
      async gotolist () {
        if (this.$refs.form.validate()) {
          let params = {
            username:this.users,
            password:this.password
          }
          let res = await this.$http('login/login', 'post', params)
          if(res.code === 200){
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('userInfo', JSON.stringify(res.data.user))
            this.$router.replace('/')
          }
        }
      },
      gotoOauth () {
        location.href = this.oauthUrl
      }
    }
  }
</script>
<style lang="scss">
  .login-gitlab{
    width:22px;
    cursor: pointer;
  }
  .login-logo-box{
      text-align: center;
      padding-top:20px;
      p{
          color:#3f51b5;
          font-size:35px;
      }
  }
  .login-logo{
      width:50px;
  }
  .login-bar{
      height:120px;
  }
  .input-padding{
      padding:20px 30px;
  }
  .login-bottom{
      padding:20px 30px 100px;
  }
</style>