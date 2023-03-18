<template>
<div class="big_box">
  <navs></navs>
  <div class="box">
    <div class="user_info_box">
      <div class="left">
          <div class="img_box">
            <el-avatar :src="user[0].uimg" />
            <i @click="replaceImg">更换头像</i>
          </div>
          <div class="user_info">
            <div>
              <i class="iconfont icon-yonghuming"></i>
              <span class="name">{{user[0].uname}}</span>
              <p class="email">ID:{{ user[0].email }}</p>
              <p :title="user[0].uintroduction" class="uintroduction">{{user[0].uintroduction}}</p>
            </div>
            <div class="txt_list">
              <span class="t">{{ joinNumber }}</span><span class="c">已参加</span>
              <span class="t">{{ publishNumber }}</span><span class="c">已发布</span>
            </div>
          </div>
      </div>
      <div class="right">
        <el-button type="danger" plain @click="quit">退出登录</el-button>
      </div>
    </div>
    <div class="content_box">
      <div class="title_list">
<!--          -->
        <titleList titles="个人中心"></titleList>
        <lines></lines>
          <div class="list">
            <ul>
              <li :class="index === item.id ? 'active':''" v-for="item in list" :key="item.id" @click="selectList(item.id)">
                <i :class="item.icon"></i>{{item.name}}
              </li>
            </ul>
          </div>
      </div>
      <div class="content">
        <myjoin v-show="index === 0 ? true : false"></myjoin>
        <mypublish v-show="index === 1 ? true : false"></mypublish>
        <mycommentOn v-show="index === 2 ? true : false"></mycommentOn>
      </div>
    </div>
  </div>
  <!--    更换头像对话框-->
  <el-dialog
      v-model="centerDialogVisible"
      title="更换头像"
      width="30%"
      center="center"
  >

    <el-upload
        class="avatar-uploader"
        action="http://192.168.31.233:3000/alterPicture"
        :data="uploadData"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
    >
      <el-icon class="avatar-uploader-icon">
        <Plus/>
      </el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>
<script setup>
import navs from "@/components/common/nav";
import lines from "@/components/common/lines";
//三个功能组件
import myjoin from "@/components/my/my_join";
import mypublish from "@/components/my/my_publish";
import mycommentOn from "@/components/my/my_commentOn";
import titleList from "@/components/my/title";
//vuex
import {useStore} from "vuex";
//路由
import router from "@/router";
// element 组件
import {ElMessage} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {ref,toRaw,computed,reactive} from "vue";

//个人中心功能列表
const list = [
  {id:0,name:"参加的活动",icon:"iconfont icon-xiangmu"},
  {id:1,name:"发布的活动",icon:"iconfont icon-fabu"},
  {id:2,name:"我的评论",icon:"iconfont icon-31pinglun"}
];

//点击功能列表 跳转到 相应的模块
let index = ref(1);
const selectList = function (id){
  if(index.value === id){
    return;
  }
  index.value = id;
}

/*退出登录*/
  //实例化vuex
  let {state} = useStore();
  let user = toRaw(computed(() => state.user.userInfo).value);
  let joinNumber = toRaw(computed(() => state.user.join));
  let publishNumber = toRaw(computed(() => state.user.publish));

//退出登录功能
  const quit = function () {
    localStorage.removeItem('teaUserInfo');
    localStorage.removeItem('token')
    router.push('/');
  }
/*end 退出登录 */

/*更换头像*/
  //控制对话框的显示与隐藏
  let centerDialogVisible = ref(false);
  const replaceImg = function () {
    centerDialogVisible.value = true;
  }
  //上传之前判断是否为图片
  const beforeAvatarUpload = function (rawFile) {
    if (rawFile.type !== 'image/jpeg') {
      ElMessage.error('上传只能为image/jpeg');
      return false
    } else if (rawFile.size / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 > 10) {
      ElMessage.error('上传的图片大小在10MB内');
      return false
    }
    user.forEach(i=>{
      uploadData.uid = i.uid
    })
    return true
  }
  // 用户id
  let uploadData = reactive({
    uid:''
  })
  //上传成功后的回调函数
  const handleAvatarSuccess = function (res){
    if(res.status !== 200){
      return ElMessage.error('更换头像失败!');
    }
    ElMessage.success(res.message)
  }
/*end 更换头像*/


</script>
<style scoped lang="less">
.big_box{
  width: 100%;
  height: 100%;
  background-color:#F0F1F5 ;
}
.box{
  width: 1000px;
  height: 100vh;
  margin: 0 auto;
  margin-top: 20px;
}
//用户信息
.user_info_box{
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px 30px;
  display: flex;
  .left{
    width: 500px;
    height: 100%;
    display: flex;
    .img_box{
      width: 120px;
      height: 120px;
      position: relative;
      .el-avatar{
        width: 100%;
        height: 100%;
      }
      i{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        line-height: 120px;
        opacity: 0%;
        background-color: rgba(0,0,0,0.5);
        transition: all 0.5s;
        cursor:pointer;
        color:#ffffff;
      }
      i:hover{
        opacity: 100%;
      }
    }
    .user_info{
      width: 170px;
      height: 100%;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      i{
        text-align: center;
        color: #00B7FF;
      }
      .name{
        margin: 0 0px 8px 10px;
      }
      .email{
        font-size: 10px;
        color: #aaaaaa;
      }
      .uintroduction{
        font-size: 10px;
        margin: 0;
        padding: 0;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
        color: #aaaaaa;
      }
      .txt_list{
        margin-top: 20px;
        .t{
          font-size: 18px;
          color:#000000;
          margin-right: 10px;
        }
        .c{
          font-size: 10px;
          color:#aaaaaa;
          margin-right: 10px;

        }
      }
    }
  }
  .right{
    width: 500px;
    height: 100%;
    .el-button{
      float: right;
      margin-right: 20px;
    }
  }
}
//用户活动列表
.content_box{
  width: 100%;
  height: 500px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  /*右侧*/
  .title_list{
    width: 250px;
    height: 100%;
    background-color: #ffffff;
    margin-right:20px;
    border-radius: 10px;
    padding: 5px 10px;
    h6{
      text-align: left;
      height: 30px;
      line-height: 30px;
    }
    .list{
      padding: 10px 0px;
      ul{
        list-style-type: none;
        li{
          margin: 20px 0;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s;
          i{
            line-height: 30px;
            margin: 0px 5px;
            text-align: center;
            font-size: 20px;
          }
        }
      }
    }
  }
  .active{
    color:#00B7FF;
  }
  /*左侧*/
  .content{
    width: 750px;
    height: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 5px 10px;
  }
}
</style>
