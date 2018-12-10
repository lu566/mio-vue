<template>
<div id = "app">
  <!--进度条-->

  <div style="width: auto; height: 100px"></div>
  <table class="table">
    <tr>
      <td ><v-icon>timeline</v-icon><span :style="piplineHead">pipeline</span></td>
      <td @click="$router.push({path:'/PipelineList',params:{name:'hello-world',namespace:'demo'}})">

        <!--步进器
        <div class="stage" style="font-size: 10px">
          <div class="build-stage">
            <v-stepper >
              <v-stepper-header >

                <v-stepper-step step="1" complete>Build</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :rules="[() => false]" step="2">
                  Test
                  <small>Test filed</small>
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step step="3">Deploy to dev</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">Notify</v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </div>
        </div>
        -->

        <!--简单步进器-->
        <vue-step :now-step="nowStep" :step-list="stepList" style-type="style2" ></vue-step>
      </td>

      <td rowspan="3" class="circular-td" style="height: 160px; width: 160px; right: 20px" >

        <!--环形进度条-->
        <v-progress-circular
          :rotate="36"
          :size="140"
          :width="8"
          :value="value"
          color="green"
        >
          <div><span style="font-size: 50px; color: dimgrey;">{{ number }}</span>
            <span style="font-size: 10px; color: dimgrey;">{{ kind }}</span></div>
        </v-progress-circular>

      </td>

      <td rowspan="3">
        <v-btn icon  @click="replicaUp"><v-icon :large="true">keyboard_arrow_up</v-icon></v-btn>
        <br/>
        <br/>
        <v-btn icon @click="replicaDown"><v-icon :large="true">keyboard_arrow_down</v-icon></v-btn>

        <!--<v-icon :right="true" :large="true" @mouseenter="replicaUpEnter" @mouseleave="replicaUpLeave" :color="replicaUpColor"   @click="replicaUp">keyboard_arrow_up</v-icon>-->
        <!--<br/>-->
        <!--<br/>-->
        <!--<v-icon :right="true" :large="true" @mouseenter="replicaDownEnter" @mouseleave="replicaDownLeave" :color="replicaDownColor" @click="replicaDown">keyboard_arrow_down</v-icon>-->

      </td>

    </tr>
    <tr>
      <td><v-icon>share</v-icon><span :style="piplineHead">commit</span>  {{ commitId }}</td>
      <td><v-icon>low_priority</v-icon>  {{ pipelineStatus }}</td>

    </tr>
    <tr>
      <td><v-icon>swap_calls</v-icon><span :style="piplineHead">branch</span>  {{ pipelineBranch }}</td>
      <td><v-icon>access_time</v-icon>  {{ pipelineTime }}</td>
    </tr>
    <tr>

    </tr>
  </table>

  <div class="log">
  <v-app id="inspire">
    <v-tabs
      color="transparent"
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider color="purple"></v-tabs-slider>

      <v-tab>
        <span style="color: black">pipleline log</span>
      </v-tab>

      <v-tabs-slider  color="purple"></v-tabs-slider>
      <v-tab>
        <span style="color: black">application log</span>
      </v-tab>
      <v-tabs-items>

        <div v-show="!bottom" style="position:fixed; right: 0; bottom:35px;"><v-btn flat icon @click="isBottom"><v-icon>keyboard_arrow_down</v-icon></v-btn></div>
        <div v-show="bottom" style="position:fixed; right: 0; bottom:35px;"><v-btn flat icon @click="isBottom"><v-icon>stop</v-icon></v-btn></div>
        <div style="position:fixed; right: 0; bottom:70px;"><v-btn flat icon @click="scrollTop"><v-icon>keyboard_arrow_up</v-icon></v-btn></div>
        <v-tab-item >
          <v-card flat>
            <div class="log-body">

              <!-- 使用prism 插件实现log 部分显示高亮 -->
              <!-- <prism language="bash">{{pipline.text}}</prism> -->

              <ol><li v-for="(item,index) in pipline.logs" :key="index">
              {{ item }}
              </li></ol>
          </div>
          </v-card>

        </v-tab-item >

        <v-tab-item >
          <v-card flat>
            <div class="log-body">

              <!-- 使用prism 插件实现log 部分显示高亮 -->
              <!-- <prism language="bash">{{app.text}}</prism> -->

              <ol><li v-for="(item,index) in app.logs" :key="index">
                {{ item }}
              </li></ol>

            </div>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-app>
  </div>

</div>

</template>

<script >
  import Vue from 'vue'

  //使用自定义模块变更text
  //<log-item> </log-item>
  //Vue.component('log-item',{
    //props: ['text'],
    //template: '<ol>{{ text }}</ol>'
  //})

  // 使用prism 插件实现log 部分显示高亮
  // import Prism from 'prismjs';
  // import 'prismjs/themes/prism.css'
  // import 'prismjs/components/prism-bash.js'


  // import 'prismjs';
  // import 'prismjs/components/prism-bash'
  // import 'prismjs/components/prism-javascript'
  // import "prismjs/themes/prism.css";
  // import Prism from 'vue-prism-component'

  import vueStep from 'vue-step'


  export default {
    data() {
      return {
        code: 'const a = b',
        piplineHead: {
          fontWeight: '600',
          fontSize: '18px'
        },
        interval: {},
        value: 100,
        number: 0,
        kind: 'pod',
        commitId: '123sard',
        pipelineBranch: 'master',
        pipelineTime: '2018-09-10',
        pipelineStatus: 'passed',
        replicaUpColor: '',
        replicaDownColor: '',
        text: 'failed to find logs...',
        bottom: false,
        isShow: true,

        pipline : {
          name:'hello-world',
          podname:'',
          namespace: 'demo',
          ws:null,
          logs: [],
          text: 'failed to find logs...',
          tail: '',
        },
        app : {
          name:'',
          podname:'hiadmin-145-6cz7x',
          namespace: 'demo',
          ws:null,
          logs: [],
          text: 'failed to find logs...',
          tail: '300',
        },
        host:'ws://nginx-gateway.app.vpclub.io/demo/websocket',
        // stepper: [
        //   {'stage':"Build",'result':'complete','rules':[]},
        //   {'stage':"Build",'result':'','rules':[() => false]},
        //   {'stage':"Build",'result':'','rules':[]},
        //   {'stage':"Build",'result':'','rules':[]},
        // ],
        nowStep: 3,
        stepList: [
          'Build',
          'Test',
          'Deploy to dev',
          'Notify'
        ]
      }
    },
    components: {
      //加载自定义模块 log-item
      //'log-item': TodoItem

      //加载三方插件 Prism
      //Prism
      vueStep
    },
    mounted() {
      this.init()
      this.piplineLogs()
      this.appLogs()
    },
    //监测数据变化
    watch:{
      logs : function () {
      if (this.bottom) {
        this.scrollToBottom()
      }
    },
      text : function () {
        if (this.bottom) {
          this.scrollToBottom()
        }
      }
    },
    computed: {},
    // updated:function(){
    //   this.scrollToBottom();
    // },
    methods: {
      async init(){

      },
      async piplineLogs() {
        this.pipline.text = ''
        this.pipline.ws = new WebSocket(this.host+'/webSocket/buildLogs?namespace='+this.pipline.namespace+'&name='+this.pipline.name+'&verbose=true')
        this.pipline.ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          this.pipline.ws.send('Holle')
          console.log('数据发送中...')
        }
        this.pipline.ws.onmessage = evt => {
          console.log('数据已接收...', evt.data)
          this.pipline.logs.push(evt.data)
          //this.pipline.text = this.pipline.text + evt.data
          console.log(evt.data)
        }
        this.pipline.ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // 路由跳转时结束websocket链接
        this.$router.afterEach(function () {
          // this.pipline.ws.close()
        })
      },
      async appLogs() {
        this.app.text = ''
        this.app.ws = new WebSocket(this.host+'/webSocket/appLogs?namespace='+this.app.namespace+'&podname='+this.app.podname+'&tail='+this.app.tail)
        this.app.ws.onopen = () => {
          // Web Socket 已连接上，使用 send() 方法发送数据
          this.app.ws.send('Holle')
          console.log('数据发送中...')
        }
        this.app.ws.onmessage = evt => {
          console.log('数据已接收...', evt.data)
          this.app.logs.push(evt.data)
          //this.app.text = this.app.text + evt.data
          console.log(evt.data)
        }
        this.app.ws.onclose = function () {
          // 关闭 websocket
          console.log('连接已关闭...')
        }
        // 路由跳转时结束websocket链接
        this.$router.afterEach(function () {
          // this.app.ws.close()
        })
      },
      replicaUp() {
        this.number++
      },
      replicaDown() {
        if (this.number === 0) {
          alert('replica cannot be lower than 0')
          return
        }
        this.number--
      },
      scrollTop: function () {
        window.scrollTo(null, 0);
      },
      scrollToBottom: function () {
          var container = document.getElementById('app')
          window.scrollTo(null, container.scrollHeight);
      },
      isBottom: function () {
        this.bottom = !this.bottom
      }
    }
  }
</script>

<style type="text/css">
  /*.stage{*/
    /*height: 20px;*/
    /*width: 300px;*/
  /*}*/
  .build-stage{
    height: 72px;
    width: 100%;
  }

  .table{
    width: 90%;
    height: 200px;
    font-size: 18px;
    margin-left:auto;margin-right:auto;
  }
  .log{
    width: 90%;
    margin-left:auto;margin-right:auto;
  }
  /*.group{*/
  /*display: flex;*/
  /*flex: 1;*/
  /*justify-content: space-around;*/
  /*}*/

  .circular-td{
    text-align:center;
  }

  .footer-head{
    font-size: 25px;
    text-align:center;
  }
  .log-body {
    clear: left;
    min-height: 42px;
    padding: 0px 0;
    color: #f1f1f1;
    font-family: Cousine;
    font-size: 12px;
    line-height: 19px;
    /*white-space: pre-wrap;*/
    word-wrap: break-word;
    background-color: #222;
    counter-reset: line-numbering;
    margin-top: 0;
    margin-bottom: 10px;
    min-height: 700px;
  }

</style>
