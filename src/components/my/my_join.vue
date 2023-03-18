<template>
<div class="my_join">
  <titleList titles="我参加的"></titleList>
  <Lines></Lines>
  <div class="content_box">
<!--    表格区域-->
    <el-table :data="tableData" stripe height="400px">
      <el-table-column fixed prop="time" label="结束日期" width="100" />
      <el-table-column prop="eventsname" label="活动名称" width="100" />
      <el-table-column prop="uemail" label="联系方式" width="180" />
      <el-table-column prop="tname" label="发布人" width="100" />
      <el-table-column prop="address" label="地址" width="120" />
      <el-table-column label="操作">
        <template  #default="scope">
          <el-button @click="removeEvent(scope.row)" type="warning">退出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    表格区域 end-->

  </div>
</div>
</template>

<script setup>
import titleList from "@/components/my/title"
import Lines from "@/components/common/lines";
//axios
import {getUserJoinInfo,removeJoinEvent} from "@/request/my/mys";
//vuex
import {useStore} from "vuex";
import {ref, onMounted, toRaw, computed} from "vue";
import {ElMessage} from 'element-plus'
let {state,commit} = useStore();
let user = toRaw(computed(() => state.user.userInfo).value);

//数据
let tableData = ref([]);
//请求参数
let data ={
  uid:user[0].uid,
  uname:user[0].uname
};

onMounted(  ()=>{
  getDataList();
})
/**请求数据*/
const getDataList = async function (){
  let {data:res} = await getUserJoinInfo(data);
  tableData.value=res.data
  let i = res.data.length;
  commit("getUserJoinNumber",i);
}

/**退出活动*/
const removeEvent = async function (data){
  let {data:res} = await removeJoinEvent(data.id)
  if(res.status == 200){
    ElMessage.success(res.message);
    getDataList();
  }
}
</script>

<style lang="less" scoped>

</style>
