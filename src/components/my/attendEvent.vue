<template>
<div>
  <el-table :data="tableList" height="400">
    <el-table-column property="uname" label="姓名" width="150" />
    <el-table-column property="uemail" label="联系方式" width="200" />
    <el-table-column property="eventsname" label="活动名称" />
  </el-table>
</div>
</template>

<script setup>
let props = defineProps(['tableList'])
</script>

<style scoped>

</style>
