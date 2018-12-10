<template>
  <div>
    <div style="width: auto; height: 100px"></div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.namespace }}</td>
        <td class="text-xs-left"><vue-step :now-step="nowStep" :step-list="stepList" style-type="style2" ></vue-step></td>
        <td class="text-xs-left">{{ props.item.time }}</td>
        <td class="text-xs-left">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>

<script>
  import vueStep from 'vue-step'

  export default {
    data () {
      return {
        name: this.$route.query.name,
        namespace: this.$route.params.namespace,
        nowStep: 3,
        stepList: [
          'Build',
          'Test',
          'Deploy to dev',
          'Notify'
        ],
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Namespace', value: 'namespace' ,align: 'left',sortable: false},
          { text: 'Stage', value: 'stage' ,align: 'left',sortable: false},
          { text: 'Time', value: 'time' ,align: 'left',sortable: false},
          { text: 'Actions', value: 'name', sortable: false }
        ],
        desserts: [
          {
            value: false,
            name: 'hello-world01',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world02',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },
          {
            value: false,
            name: 'hello-world',
            namespace: 'demo',
            stage: '--O--O---O--O--O',
            time: '2018-12-18',
          },

        ]
      }
    },
    mounted() {

    },
    async created(){
      // console.log(this.$route.query.name+'====='+this.$route.params.namespace)
      // console.log(this.name+'====='+this.namespace)
      //this.init()

       let res = await this.$http('http://nginx-gateway.app.vpclub.io/demo/websocket/health', 'get', {})
       console.log(res.data)
    },
    methods: {
      init () {
        // GET /someUrl
        this.$http.get('http://localhost:8081/build/namespace/demo/label/number=215').then(response => {
          console.log(response.body)
          // get body data
          this.someData = response.body;

        }, response => {
          // error callback
          console.log(response.body)
        });



      },
      deleteItem (item) {
        this.desserts.splice(item,1)
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },
    components: {
      vueStep
    }
  }
</script>

<style scoped>

</style>
