<template>
    <div class="container">
      <slot name="header">默认值</slot>
      <slot name="body"></slot>
      <slot :user="user"></slot>

    </div>
</template>

<script>
    export default {
        name: "comTest",
      data(){
          return {
            user:'lalalalla'
          }
      }
    }
</script>

<style scoped>

</style>
