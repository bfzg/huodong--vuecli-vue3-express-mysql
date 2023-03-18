<template>
  <div>
    <foot></foot>
    <section>
      <hr>
      <br>
      <h3>活动</h3>
      <!-- 选项卡-->
      <div class="x_box">
          <div class="overflow-hidden box row row-cols-2 ">
            <div v-for="(item,index) in list" :key="index" class=" row gx-5 col card text-center item"
                 style="width: 18rem;">
              <div class="card-body">
                <h5 class="card-title">{{ item.eventsname }}</h5>
                <p class="card-text">{{ item.detailed }}</p>
                <button class="btn btn-primary" type="button" @click="dialogBoxShow(item)">
                  查看详情
                </button>
              </div>
            </div>
          </div>
      </div>
      <dialogBox v-if="ctrlDialogBoxShow" ></dialogBox>
    </section>
    <div class="refresh">
      <p v-if="showRefresh" @click="pushDataList">点击加载更多!</p>
      <p v-else>没有数据了!</p>
    </div>
  </div>
</template>

<script setup>
import foot from "@/components/common/nav";
import {getHomeList} from "@/request/home/home";
import {onMounted, ref, computed, reactive} from "vue";
//对话框
import dialogBox from "@/components/common/dialogBox"
//vuex
import {useStore} from "vuex"
/** 获取首页活动数据*/
let list = ref([])

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

/**请求数据*/
const getDataList = async function (){
  let {data: res} = await getHomeList(requestParams);
  if(res.data.length != 0){
    res.data.forEach((item)=>{
      list.value.push(item)
    })
  }else{
    showRefresh.value=false;  //隐藏获取更多数据
  }
}

/** 控制对话框的显示与隐藏*/
let {commit,state} = useStore();
let ctrlDialogBoxShow = computed(()=>state.dialogBox.dialogShow)
let dialogBoxShow = (value) => {
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
.btn_success {
  font-size: 8px;
  margin: 0 5px;
}

.card {
  box-shadow: 5px 5px 10px #888888;
}

.box_cont {
  margin-left: 20px;

  span {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
  }

  .text-cent {
    margin-top: 40px;
  }
}

section {
  padding: 0 50px;
}

.dropdown {
  margin: 20px 0;
}

.t_box {
  .t_care {
    margin: 10px 10px;
    height: 200px;
    background-color: #4158D0;
    border: none;
    color: #eee;
    transition: all 0.7s;
    cursor: pointer;
  }

  .t_care:hover {
    background-color: #8EC5FC;
    color: #222;
  }
}

.x_box {

  .item {
    margin: 10px 10px;
    background-color: #eeeeee;
    color: #222;
    transition: all 0.4s;
    cursor: pointer;
  }

  .item:hover {
    background-color: #ffffff;
    color: #000;
  }
}

.card-text {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
  overflow: hidden;
}

.box {
  justify-content: center;
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
