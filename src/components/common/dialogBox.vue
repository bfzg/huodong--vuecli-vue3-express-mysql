<template>
<div>
  <el-dialog
      v-model="dialogShow"
      :title="eventsInfo.eventsname"
      width="50%"
      align-center
      draggable
      :show-close=false
      :close-on-click-modal="false"
  >
    <div>
      <div class="content">
          <p>{{eventsInfo.detailed}}</p>
      </div>
      <div class="user_info">
       <ul>
         <li>联系方式: {{eventsInfo.email}}</li>
         <li>发起人: {{eventsInfo.uname}}</li>
         <li>地点: {{eventsInfo.address}}</li>
         <li>活动时间: {{eventsInfo.starttime}} ----- {{eventsInfo.shuttime}}</li>
         <li>系部: {{eventsInfo.department}}</li>
       </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="downLoad(eventsInfo)">下载文件</el-button>
        <el-button @click="open(eventsInfo)" type="primary">报名</el-button>
        <el-button @click="dialogBoxHide">确定</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>

<script setup>
import {computed, reactive,ref, watch} from "vue";
//vuex
import {useStore} from "vuex";
//element-plus
import { ElMessage, ElMessageBox } from 'element-plus'
//axios
import {postSignUp} from "@/request/api/signUp";
import {download} from "@/request/api/download";

/*活动详情 start*/
let props = defineProps(['value'])
//控制对话框的显示与隐藏
//创建vux实例
let {commit,state} = useStore();
let dialogShow = computed(()=> state.dialogBox.dialogShow);
//获取数据
let eventsInfo = computed(()=>state.dialogBox.eventsInfo).value;
//确定按钮
const dialogBoxHide = ()=>{
  commit('ctrlDialogShow',false);
  commit('removeEventsInfo')
}
/*活动详情 end*/
/*报名 start*/
const open = (value) => {
  ElMessageBox.alert('确定参加此活动', '报名', {
    confirmButtonText: 'OK',
    callback: async (action) =>{
      //获取用户信息
      if(action === 'cancel'){
        return  ElMessage({
          type: 'info',
          message: '你已取消报名',
        })
      }
      let {value:userInfo} =  computed(()=> state.user.userInfo);
     let data = reactive({
       uid:userInfo[0].uid,
       tid:eventsInfo.id,
       uname:userInfo[0].uname,
       uemail:userInfo[0].email,
       eventsname:eventsInfo.eventsname,
       tname:eventsInfo.uname,
       address:eventsInfo.address,
       time:eventsInfo.shuttime,
       file:eventsInfo.file
     });
      console.log(data)
      const {data:res} = await postSignUp(data);
      console.log(res)
      if(res.status === 201){
        return  ElMessage({
          type: 'warning',
          message: res.message
        })
      }else if(res.status === 200){
        return  ElMessage({
          type: 'success',
          message: res.message
        })
      }else{
        return ElMessage({
          type: 'warning',
          message: '出现错误!'
        })
      }
    },
  })
}
/*报名 end*/

/*下载*/
const downLoad = async function (value){
  // console.log(value)
  if(value.file == null){
    return  ElMessage({
      type: 'warning',
      message: '该活动没有相关文件!'
    })
  }
  let {data:res} = await download(value.id);
  console.log(res)
  //创建一个新的窗口用于下载
  window.open(res.file, '_blank', 'fullscreen=no,width=400,height=300');
}
/*下载 end*/

</script>

<style scoped>

</style>
