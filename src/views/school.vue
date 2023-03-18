<template>
  <div>
    <navs></navs>
    <section id="section">
      <h5>活动:</h5>
      <br>
      <div class="list_box">
        <transition-group name="list" tag="ul" appear>
          <li  @click="dialogBoxShow(item)" v-for="item in items" :key="item.id" class="list_item" v-wave="{color: '#2f90b9',initialOpacity: 0.5,easing: 'ease-in',}">
            <div class="content">
              <h5>{{item.eventsname}}</h5>
              <p>{{ item.detailed }}</p>
            </div>
            <div class="user_info">
              <p>发布人:{{item.uname}}</p>
              <p>活动时间: {{item.starttime}} ---- {{item.shuttime}}</p>
            </div>
          </li>
        </transition-group>
      </div>
      <dialogBox v-if="ctrlDialogBoxShow"></dialogBox>
    </section>
    <div class="refresh">
      <p v-if="showRefresh" @click="pushDataList">点击加载更多!</p>
      <p v-else>没有数据了!</p>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted, computed,nextTick} from 'vue'
import navs from "@/components/common/nav";
//对话框
import dialogBox from "@/components/common/dialogBox";
//vuex
import {useStore} from "vuex";
//api
import {getSchoolData} from "@/request/school/index"

//数据
let items=ref([]);
//控制加载 更多数据 的显示与隐藏
let showRefresh = ref(true);
//请求参数
let requestParams = reactive({
  //页数
  pageNum:0,
  //每页的数量
  pageSize:15
})

onMounted( ()=>{
  getDataList();
})
/**获取数据*/
const getDataList = async function (){
  let {data:res} = await getSchoolData(requestParams);
  if(res.data.length != 0){
    res.data.forEach((item)=>{
      items.value.push(item)
    })
  }else{
    showRefresh.value=false;  //隐藏获取更多数据
  }
}


/**显示关闭对话框*/
let {commit,state} = useStore();
let ctrlDialogBoxShow = computed(()=>state.dialogBox.dialogShow)

let dialogBoxShow = (value)=>{
  commit('ctrlDialogShow', true);
  commit('getEventsInfo',value);
}
/**点击加载更多数据*/
const pushDataList = function (){
  requestParams.pageNum++;
  getDataList();
}
</script>

<style lang="less" scoped>
section {
  padding: 40px 40px 0px 40px;
}
.list_item{
  margin: 0 auto 35px;
  width: 90%;
  height: 150px;
  background-color: rgba(178,187,190,.5);
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0.3);
  box-shadow: 10px 5px 15px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: all 0.2s;
  .content{
    flex: 2;
    p{
      font-size: 14px;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /* 这里是超出几行省略 */
      overflow: hidden;
    }
  }
  .user_info{
    flex: 1;
    padding: 0 10px;
   p{
     font-size: 14px;
     word-break: break-all;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 1; /* 这里是超出几行省略 */
     overflow: hidden;
   }
  }
}
.list_item:hover{
  width: 95%;
  height: 160px;
  box-shadow: 15px 10px 20px rgba(0,0,0,0.5);
}

//设置列表动画
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;

}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  margin-top: 500px;
}

.refresh{
  text-align: center;
  p{
    cursor: pointer;
    background-color: #dddddd;
  }
}
</style>
