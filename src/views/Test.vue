<template>
    <button @click="http">http test</button>
</template>

<script>
    export default {
      methods: {
        http () {
          this.$http.get('http://localhost:8080/v1/user').then(response => {

            // get body data
            this.someData = response.body;
            console.log(response.body)
          }, response => {
            // error callback
          });
        }
      }

    }
</script>

<style scoped>

</style>
