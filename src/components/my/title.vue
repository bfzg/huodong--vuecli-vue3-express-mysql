<template>
<div>
  <div class="title_box">
    <h6>{{ titles }}</h6>
  </div>
</div>
</template>

<script setup>
  //props
  let props = defineProps({
    titles:String
  });
</script>

<style lang="less" scoped>
.title_box{
  padding: 10px 15px;
  h6{
    text-align: left;
  }
}
</style>
