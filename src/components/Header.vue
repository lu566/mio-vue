<template>
  <div>
    <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.mdAndUp"
        app
        v-model="drawer"
      >
        <v-list dense>
          <template v-for="item in items">
            <v-layout
              row
              v-if="item.heading"
              align-center
              :key="item.heading"
            >
              <v-flex xs6>
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-flex>
              <v-flex xs6 class="text-xs-center">
                <a href="#!" class="body-2 black--text">EDIT</a>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="item.children"
              v-model="item.model"
              :key="item.text"
              prepend-icon=""
              :append-icon="item.icon"
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="(child, i) in item.children"
                :key="i"
                @click="clickItem(child)"
              >
                <v-list-tile-action class="icon-width">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ child.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
            <v-list-tile v-else :key="item.text">
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-navigation-drawer>
    <!-- <v-app id="inspire"> -->
	    <v-toolbar
        color="#3F51B5"
        dark
        app
        :clipped-left="$vuetify.breakpoint.mdAndUp"
        fixed
      >
        <v-toolbar color="#193A9A" class="header-title">
          <v-avatar size="32px">
              <img
                src="../assets/images/gitlab-logo.jpg"
                alt=""
              >
            </v-avatar>
            <span class="header-title-span">CI/CD CONSOLE</span>
        </v-toolbar>
        <v-toolbar-title style="width: 100px" class="ml-0 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar-title>
        <v-flex xs12 sm1>
          <v-select 
          class="header-select"
          :items="itemList"
          @change="onChange"
          v-model="selected"
          item-value="value"
          item-text="name"
          solo
          light
          ></v-select>
        </v-flex>
        <v-flex xs12 sm1 class="colorD1">
          <v-btn depressed color="transparent">模板管理</v-btn>
        </v-flex>
        <v-flex xs12 sm1 class="colorD1">
          <v-btn depressed color="transparent">系统管理</v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <!-- 用户头像 -->
        <v-flex xs12 sm2>
        <v-text-field
            solo
            light
            label="Search"
            prepend-inner-icon="search"
          ></v-text-field>
          </v-flex>
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
          <v-btn icon>
            <span class="showTips">1</span>
            <v-icon large>notifications</v-icon>
          </v-btn>
        <v-menu offset-y light>
          <v-btn slot="activator" depressed color="transparent">
            <v-avatar size="32px">
              <img
                :src=user.avatar_url
                alt=""
              >
            </v-avatar>
            <!-- <span class="name">{{user.name}}</span> -->
            <!-- <v-icon>keyboard_arrow_down</v-icon> -->
          </v-btn>
          <v-list>
            <v-list-tile
              v-for="(item, index) in logout"
              :key="index"
              @click="logoutCb"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      <!-- 用户头像 -->
      </v-toolbar>
    <!-- </v-app> -->

  </div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return{
        user: {},
        drawer: null,
        items: [
          {
            icon: 'view_headline',
            // icon: 'keyboard_arrow_up',
            // 'icon-alt': 'keyboard_arrow_down',
            text: '概况',
            model: false,
            // children: [
            //   { text: '数据字典',path: '/' },
            //   { text: '远程部署',path: '/RdIndex' },
            //   { text: '环境部署',path: '/EnvIndex' }
            // ]
          },
          {
            icon: 'dashboard',
            text: 'Pipeline',
            model: false,
          },
          {
            icon: 'perm_media',
            text: 'Deployment',
            model: false,
          },
          {
            icon: 'question_answer',
            text: 'Pods',
            model: false,
          },
          {
            icon: 'dashboard',
            text: 'Services',
            model: false,
          },
          {
            icon: 'perm_media',
            text: 'Gateway',
            model: false,
          }
        ],
        itemList:[{name:'应用',value:1},{name:'应用1',value:2},{name:'应用2',value:3}],
        logout:[{title:'注销登录'}],
        selected:''
			}
    },
    created () {
      this.selected = this.itemList[0].value
    },
    mounted  () {
      this.user = JSON.parse(sessionStorage.getItem('userInfo')) || {}
      // if(Object.keys(this.user).length == 0){
      //   let userInfo
      //   var clock = setInterval( () => {
      //     userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      //     if(Object.keys(userInfo).length != 0){
      //       this.user = userInfo
      //       clearInterval(clock)
      //     }
      //   }, 500)
      // }
    },
    methods:{
      clickItem(child){
        // console.log(child)
        this.$router.push(child.path)
      },
      logoutCb () {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userInfo')
        this.$router.replace('/Login')
      },
      onChange (val) {
        this.selected = val
        console.log(this.selected)
      }
    }
	}
</script>
<style type="text/css">
  .icon-width{
    min-width: 25px;
  }
  .header-title{
    width:260px;
    height:100%;
    padding-left:16px!important;
  }
  .header-title-span{
    margin-left:20px;
    font-size: 20px;
  }
  .v-toolbar__content{
    padding-left:0;
  }
  .header-select{
    width:90%;
    /* height: 40px; */
  }
  .v-input__slot{
    margin-bottom:0;
    /* min-height:40px; */
  }
  .colorD1{
    color:#d1d1f0;
  }
  .showTips{
    position: absolute;
    background: #F44336;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    right: 0;
    top: 0;
    line-height: 20px;
  }
</style>