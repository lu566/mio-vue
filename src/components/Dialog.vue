<template>
	<v-dialog
        v-model="isShow"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            提示
          </v-card-title>
          <v-card-text>
            确定要删除这条数据吗？
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="cancel"
            >
              取消
            </v-btn>
            <v-btn
              color="primary"
              flat
              @click="sure"
            >
              确定
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script type="text/javascript">
	export default{
		data () {
			return{}
		},
		props:{
			isShow: Boolean
		},
		methods:{
			cancel () {
				this.$emit('onCancel')
			},
			sure () {
				this.$emit('onSure')
			}
		}
	}
</script>