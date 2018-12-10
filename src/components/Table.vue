<template>
	<div>
        <v-data-table
          :headers="headers"
          :items="desserts"
					hide-actions
					:pagination.sync="pagination"
          class="elevation-1"
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
            <template slot="items" slot-scope="props">
            	<tr @click="jumpPage(props.item)">
                <td class="text-xs-center" v-for="(item,index) in headers" v-if="item.value != 'active'" :key="index">{{ props.item[item.value] }}</td>
                <td class="justify-center layout px-0 actionCenter" v-for="(item,index) in headers" :key="index" v-if="item.value == 'active'">
                  <v-btn class="edit-btn" outline fab color="#3F51B5"><v-icon color="#3F51B5" small class="underline" @click.stop="edit(props.item)">edit</v-icon></v-btn>
                  <v-btn class="delete-btn" outline fab color="#F44336"><v-icon color="#F44336" small class="underline" @click.stop="deleteItem(props.item)">delete</v-icon></v-btn>
                </td>
              </tr>
            </template>
            <template slot="no-data">
              <p class="nodata">没有数据</p>
            </template>
        </v-data-table>
				<div class="text-xs-center pt-2">
					<v-pagination color="#3f51b5" v-model="pagination.page" :length="pages" class="pageSelect" circle></v-pagination>
				</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'Table',
		data () {
			return {
				pagination: {},
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
		props:{
			headers:Array,
			desserts:Array
		},
		methods: {
			jumpPage(item){
				this.$emit('jump',item)
			},
			edit(item){
				this.$emit('onEdit',item);
			},
			deleteItem(item){
				this.$emit('onDelete',item);
			},

		},
	}
</script>
<style type="text/css" scope>
	.underline{
	    color:#58a4e5;
	    margin-right: 5px;
	    cursor: pointer;
	}
    .nodata{
	    text-align:center;
	    margin-bottom:0;
	}
	.container.grid-list-xl .layout:not(:only-child){
   	margin:auto 0;
	}
	.delete-btn,.edit-btn{
		width:32px;
		height:32px;
	}
	.delete-btn i,.edit-btn i{
		margin-right:0;
	}
  </style>