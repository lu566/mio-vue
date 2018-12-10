<template>
    <v-container>
        <span class="magBot14">应用</span>
        <v-divider></v-divider>
        <v-layout row wrap class="filter">
            <v-spacer></v-spacer>
            <v-flex xs12 sm6 md3>
            <v-text-field 
                solo 
                placeholder="Filter by name…"
                class="application-input"
            ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md3>
            <v-select 
                class="application-input"
                :items="itemList"
                @change="onChange"
                v-model="selected"
                item-value="value"
                item-text="name"
                solo
                light
            ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md1>
            <v-btn class="add" fab small color="#F44336" @click="addType">＋</v-btn>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-data-table 
            hide-headers
            :items="dataList"
            hide-actions
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td class="text-xs-left">
                        <span class="color">H</span>
                        <span>vpcloudio / hello-world</span>
                        <span class="projectRole">Developer</span>
                    </td>
                    <td class="text-xs-right">
                        <p>
                            <v-icon>stars</v-icon>
                            <span>0</span>
                            <v-icon>lock</v-icon>
                        </p>
                        <p>updated a day ago</p>
                    </td>
                </tr>
            </template>
            <template slot="no-data">
                <p class="nodata">没有数据</p>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
export default {
    data () {
        return {
            itemList:[{name:'Last updated',value:1},{name:'Last updated1',value:2},{name:'Last updated2',value:3}],
            selected:'',
            dataList:[
                {
				name:'1',
				value:'2',
				type:'3'
                },{
				name:'4',
				value:'5',
				type:'6'
                }
            ]
        }
    },
    mounted () {
        this.selected = this.itemList[0].value
    },
    methods: {
        onChange () {},
        addType () {},
    }
}
</script>
<style>
.magBot14{
    margin-bottom: 14px;
    display: inline-block;
    font-size: 12px;
}
.add{
    font-size: 28px;
    line-height: 34px;
    margin:0;
}
.add.v-btn--floating.v-btn--small{
    width:34px;
    height:34px;
}
.add .v-btn__content{
	color:#fff;
}
.filter{
    padding-top:12px;
}
.filter .v-input__slot{
    min-height:34px;
}
.application-input{
    width:90%;
}
.color{
    display: inline-block;
    width:40px;
    height:40px;
    border-radius: 50%;
    line-height: 40px;
    background: #eee;
    text-align: center;
    margin-right:10px;
}
.projectRole{
    display: inline-block;
    border: 1px solid #e5e5e5;
    padding:2px 10px;
    color:#707070;
    border-radius:12px;
    margin-left:10px;
}
.text-xs-right p{
    margin-bottom: 0;
}
.text-xs-right .v-icon{
    font-size:16px;
    color:#000;
}
</style>
