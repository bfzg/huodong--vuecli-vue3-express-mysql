<template>
  <div class="foot">
    <!--  导航栏-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="javascript:">Campus activities</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="javascript:" @click="gohome">首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:" @click="goschool">学校活动</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:" @click="goperson">动态</a>
            </li>
          </ul>
          <div class="d-flex">
            <div class="login">
              <button type="button" class="btn btn-primary" @click="gomy" v-if="disBtn">我的</button>
              <!--true为显示，false为隐藏-->
              <button type="button" class="btn btn-primary" @click="login" v-else>登录</button>
              <button type="button" class="btn btn-danger" @click="goupload">上传</button>
            </div>
            <button class="btn btn-outline-success" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop" type="submit">搜索
            </button>
          </div>
        </div>
      </div>
    </nav>
    <!--    模态框-->
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
      <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <!--  搜索-->
      <div class="search_box">
        <search></search>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import {computed} from 'vue';
import router from "@/router";
//引入搜索框
import search from "@/components/search/search";
//引入element弹出框
import {ElMessageBox} from 'element-plus'
//vuex
import {useStore} from "vuex";

export default {
  name: "foot",
  setup() {
    //弹出框
    const open = (item) => {
      ElMessageBox.alert(
          `<div style="word-break: break-all;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 100; /* 这里是超出几行省略 */overflow: hidden;"> ${item.content}<br><br><br><span>发起人:${item.sponsor}</span><br><span>联系方式:${item.emali}</span> <br><span>部门:${item.department}</span> </div>`,
          item.emali,
          {
            dangerouslyUseHTMLString: true,
          }
      )
    }

    //实例化vuex
    let {state, commit} = useStore();
    //判断是否登录,登录则隐藏登录按钮，并显示我的
    let disBtn = computed(() => state.user.loginStatus);
    const displayBtn = function () {
      if (localStorage.getItem('teaUserInfo') != null) {
        commit("displaylogin", true);
      } else {
        commit("displaylogin", false);
      }
    }
    displayBtn();

    //路由区域
    let gohome = function () {
      router.push('/');
    };
    let goschool = function () {
      router.push('/school');
    }
    let goperson = function () {
      router.push('/share');
    }
    let login = function () {
      router.push('/login');
    }
    let goupload = function () {
      router.push('/upload');
    }
    let gomy = function () {
      router.push('/my');
    }
    return {
      gohome,
      goschool,
      goperson,
      login,
      goupload,
      open,
      disBtn,
      displayBtn,
      gomy,
    };
  },
  components: {
    search,
  }
}
</script>

<style lang="less" scoped>
.foot:after{
  clear: both;
}
.offcanvas-top {
  height: 100% !important;
}

.btn {
  margin-left: 10px !important;
}

//搜索框
</style>
