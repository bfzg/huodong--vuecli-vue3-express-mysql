<template>
<div class="box">
  <div class="img_box">
    <img src="../../assets/userInfo.png" alt="">
  </div>
  <div class="content">
    <div class="avatar">
      <el-avatar @click="goToMy" :size="60" :src="user[0].uimg" />
    </div>
    <div class="user_name">
      <p>{{user[0].uname}}</p>
    </div>
  </div>
  <div class="list">
    <div><span class="t">{{ joinNumber }}</span><span class="c">已参加</span></div>
    <div><span class="t">{{publishNumber}}</span><span class="c">已发布</span></div>
  </div>
</div>
</template>

<script setup>
import router from "@/router";
//vuex
import {useStore} from "vuex";
import {computed, ref, toRaw} from "vue";

//获取信息
let {state} = useStore();
let user = toRaw(computed(() => state.user.userInfo).value);
let joinNumber = toRaw(computed(() => state.user.join));
let publishNumber = toRaw(computed(() => state.user.publish));

//跳转到我的页面
const goToMy = function (){
  router.push('/my');
}
</script>

<style lang="less" scoped>
.box{
  width: 230px;
  height: 180px;
  background: #ffffff;

}
.img_box{
  width: 100%;
  height: 80px;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
}
.content{
  display: flex;
  .avatar{
    width: 70px;
    height: 70px;
    margin:-20px 0 0 20px;
    .el-avatar{
      cursor: pointer;
    }
  }
}
.list{
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: space-evenly;
  .t{
    margin: 0 5px;
  }
  .c{
    margin: 0 3px;
    font-size: 10px;
    color: #aaaaaa;
  }
}
</style>
