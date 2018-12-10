<template>
    <v-breadcrumbs divider="-">
        <v-breadcrumbs-item 
        class="first-type"
        v-for="(item, index) in items"
        v-if="index == 0"
        :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
        <v-icon color="#000" style="margin-left:15px;">home</v-icon>
      </v-breadcrumbs-item>


      <v-breadcrumbs-item
        v-for="(item, index) in items"
        v-if="index != 0"
        :key="item.text"
        :disabled="item.disabled"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>
<script>
export default {
    data () {
        return{
            items: [
                {
                    text: '应用详情',
                    disabled: true
                },{
                    text: '应用列表',
                    disabled: true
                },{
                    text: '控制台',
                    disabled: true
                }
            ]
        }
    },
    methods:{}
}
</script>
<style>
.v-breadcrumbs li.first-type{
    font-size:24px;
}
.v-breadcrumbs li.first-type a{
    color:#000!important;
}
</style>
