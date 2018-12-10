<template>
	<div>
		<BreadCrumbs></BreadCrumbs>
		<v-layout row wrap>
			<!-- <v-flex xs12 sm6 offset-sm3> -->
				<v-flex xs12 sm6 md3 offset-sm4>
					<v-text-field 
					class="input-height"
					solo 
					label="输入名称过滤"
					prepend-inner-icon="search"
					v-model="searchName"
					></v-text-field>
				</v-flex>
				<v-flex xs12 sm6 md3>
					<v-btn color="info" @click="search" class="search">搜索</v-btn>
				</v-flex>
		 	<!-- </v-flex> -->
        </v-layout>
		<v-container id="dropdown-example" grid-list-xl>
			<v-layout row wrap>
				<v-spacer></v-spacer>
				<v-btn class="add" fab small color="#F44336" @click="addType">＋</v-btn>
			</v-layout>
			<Table :headers='headers' @jump='jumpPage' :desserts='desserts' @onEdit='doEdit' @onDelete='doDelete'></Table>
		</v-container>
		<!-- <div>{{ count }}</div> -->
		<Dialog :isShow='isShow' @onCancel='cancel' @onSure='sure'></Dialog>
	</div>
</template>
<script type="text/javascript">
import { mapState } from 'vuex'
import BreadCrumbs from '../components/BreadCrumbs.vue'
import Table from '../components/Table.vue'
import Dialog from '../components/Dialog.vue'
export default{
	data () {
		return{
			searchName:'',
			isShow:false,
			headers: [
				{ text: '名称', align: 'center', value: 'name', sortable: false },
				{ text: '标识', align: 'center', value: 'value' , sortable: false },
				{ text: '类型', align: 'center', value: 'type' , sortable: false },
				{ text: '操作', align: 'center' , value: 'active' , sortable: false },
			],
			desserts:[
				{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},{
				name:'123',
				value:'123',
				type:'564'
				},
			]
		}
	},
	created () {
		this.getTableData()
	},
	components:{
		BreadCrumbs,
		Table,
		Dialog
	},
	methods:{
		getTableData () {

		},
		jumpPage (item) {},
		doEdit (item) {},
		doDelete (item) {
			this.isShow = true
		},
		cancel () {
			this.isShow = false
		},
		sure () {
			this.getTableData()
			this.isShow = false
		},
		search () {},
		addType () {},
	},
	computed:mapState({
		// count: state => state.count
	})
}
</script>
<style>
.input-height .v-input__slot{
	min-height:36px;
}
.search{
	margin:0 0 0 24px;
}
.add{
    font-size: 30px;
    line-height: 30px;
}
.add .v-btn__content{
	color:#fff;
}
#dropdown-example{
	padding-top:0;
}
</style>
