<template>
  <div class="share">
    <div ref="refNavs" class="navs">
      <navs></navs>
    </div>
    <div class="content_box">
      <div class="center_big_box">
        <div ref="refUserInfo" class="userInfo">
          <userInfo></userInfo>
        </div>
        <div :class="marginCenterBox ? 'marginCenterBox' : ''" class="center_small_box wrapper">
          <div class="bs_box">
            <inputBoxs @publishAgain="getDataList"></inputBoxs>
            <commentBox @publishAgain="getDataList" :dataList="dataList" @click-picture="emitPic"></commentBox>
            <div v-if="showRefresh" class="refresh">
              <p>没有更多了...</p>
            </div>
          </div>
        </div>
      </div>
      <previewPicture v-if="previewPicShow" :picUrl="emitPicUrl" @click-shutIcon="shutDown"></previewPicture>
    </div>
  </div>
</template>

<script setup>
import navs from "@/components/common/nav";
//滚动插件
import Bscroll from 'better-scroll'
import {onMounted, nextTick, ref, reactive, watch, toRaw, onBeforeUpdate} from "vue";
//组件
import inputBoxs from "@/components/share/inputBox";
import userInfo from "@/components/share/userInfo";
import commentBox from "@/components/share/commentBox";
import previewPicture from "@/components/share/previewPicture";
//api
import {getComments} from "@/request/share/share";
//vuex
import {useStore} from "vuex";

let {state} = useStore();

/** 请求参数 */
let requestParams = reactive({
  //当前页数
  pageNum:0,
  //每页显示的数据
  pageSize:15
})

//控制下拉刷新的显示与隐藏
let showRefresh = ref(false);

//获取的数据
let dataList = ref([]);


/** 获取数据 */

onMounted( () => {
  getDataList();
})
const getDataList = async function (){
  let {data:res} = await getComments(requestParams);
  console.log(res)
  if(dataList.value.length==0){
    dataList.value=res.data;
    return;
  }else{
    res.data.forEach(item=>{
      dataList.value.push(item);
    })
    return;
  }
}


/** 局部滚动*/
//控制导航栏的显示与隐藏
    //获取导航栏dom
let refNavs = ref(null);
//控制元素是否添加class
let marginCenterBox = ref(true);
//用户信息dom
let refUserInfo = ref(null);

let bscroll = reactive({});
onMounted(() => {
  //创建betterScroll对象
  bscroll = new Bscroll(document.querySelector('.wrapper'), {
    probeType: 3,
    click: true,
    mouseWheel: true,
    pullUpLoad: true
  })
  //触发滚动事件
  bscroll.on('scroll', (position) => {
    if (position.y < -200) {
      refNavs.value.style.top = -60 +'px';
      refUserInfo.value.style.top = 10 +'px';
      marginCenterBox.value = false;
    } else {
      refNavs.value.style.top = 0 + 'px';
      refUserInfo.value.style.top = 70 +'px';
      marginCenterBox.value = true;
    }
    overheight();
  })
  // 触底发生事件
  bscroll.on('pullingUp',()=>{
    showRefresh.value = true;
    requestParams.pageNum++;
    getDataList();
    console.log(requestParams.pageNum)
    // bscroll.finishPullUp()
  })
})
//监听任何一个变量有变化
watch(dataList, () => {
  nextTick(() => {
    //重新计算高度
    bscroll && bscroll.refresh();
  })
}, {
  deep: true
})
onBeforeUpdate(()=>{
  nextTick(()=>{
    bscroll && bscroll.refresh();
  })


})
const overheight = function (){
  nextTick(()=>{
    bscroll && bscroll.refresh();
  })
}

/** emit处理 监听子组件点击图片事件 */
let previewPicShow = ref(false);
let emitPicUrl = ref(null);

const emitPic = (e, b) => {
  emitPicUrl.value = e;
  previewPicShow.value = b;
}
//子组件点击关闭按钮
const shutDown = function (b) {
  previewPicShow.value = b;
}


</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.content_box {
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.png");

}

.center_big_box {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 1px 0;
}

.center_small_box {
  width: 700px;
  overflow: hidden;
  margin: 0 auto;
  height: 98vh;
  .bs_box {
    width: 100%;
    overflow: hidden;
    display: block;
  }
}

.navs {
  transition: all 0.4s;
  width: 100%;
  position: absolute;
  top: 0;
}

.userInfo{
  position: absolute;
  top: 70px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.4s;
}

.marginCenterBox {
  margin-top: 60px;
}

//上拉加载更多
.refresh{
  width: 100%;
  text-align: center;
}

</style>
