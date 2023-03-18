<template>
  <div>
    <titleList titles="我的评论"></titleList>
    <Lines></Lines>
    <div class="comment_box">
      <!--    表格区域-->
      <el-table :data="tableData"  stripe height="400px">
        <el-table-column type="index" />
        <el-table-column prop="comment" label="发表的评论" width="200" />
        <el-table-column label="图片地址">
          <template #default="scope">
            <div class="img_box">
              <el-image v-for="(item,index) in scope.row.img" :key="index"  style="width: 100px; height: 100px" :src="item" :fit="contain" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" >
          <template  #default="scope">
            <el-button @click="removeEvents(scope.row)" type="danger" :icon="Delete" circle />
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
import {getCommentList,removeComment} from "@/request/my/mys";
import {useStore} from "vuex";
import {ref, onMounted, toRaw, computed} from "vue";
import {Delete} from '@element-plus/icons-vue';
import {ElMessage} from "element-plus";
let {state} = useStore();
let userInfo = toRaw(computed(() => state.user.userInfo).value);

let tableData =ref([]);
onMounted( async ()=>{
  getDataList();
})

/**获取数据*/
const getDataList = async function (){
  let {data:res} = await getCommentList(userInfo[0].uid);
  tableData.value = res.data;
}

/**删除评论*/
const removeEvents = async function (data){
  let {data:res} = await removeComment(data.id);
  if(res.status == 200){
    ElMessage.success(res.message);
    getDataList();
  }
}

</script>

<style lang="less" scoped>
.img_box{
  display: flex;
  .el-image{
    margin:0 3px;
  }
}
</style>
