<template>
  <div>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
<!--          登录页面-->
          <form action="#" class="sign-in-form">
            <h2 class="title">登录</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input v-model="uname" type="text" placeholder="用户名" />
            </div>
            <div class="input-field">
              <i class="iii fa fa-unlock" @click="oniconShowShutL" v-if="LiconShow"></i>
              <i class="iii fas fa-lock" @click="oniconShowOpenL"  v-else></i>
              <input v-model="upassword" :type="LiconShow ? 'text' : 'password'" type="password" placeholder="密码" />
            </div>
            <input @click="gologin" type="button" value="立即登录" class="btn solid" />
            <p class="social-text" @click="gohome">退出</p>
          </form>
<!--          注册页面-->
          <form action="#" class="sign-up-form">
            <h2 class="title">注册</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input v-model="e_uname" type="text" placeholder="用户名" />
            </div>
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input v-model="e_email" type="email" placeholder="邮箱" />
            </div>
            <div class="input-field">
<!--              密码输入框-->
              <i class="iii fa fa-unlock" @click="oniconShowShut" v-if="iconShow"></i>
              <i class="iii fas fa-lock" @click="oniconShowOpen"  v-else></i>
              <input v-model="e_pwd" :type="iconShow ? 'text' : 'password'" placeholder="密码" />
            </div>
            <div class="input-yz">
              <input v-model="code" type="text" placeholder="验证码" />
              <button type="button" @click="goSendverify">发送验证码</button>
            </div>
            <input @click="goenroll" type="button" class="btn" value="立即注册" />
            <p class="social-text" @click="gohome">退出</p>
          </form>
        </div>
      </div>
      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>加入我们</h3>
            <p>
              加入我们，成为本站的一份子。
            </p>
            <button class="btn transparent" id="sign-up-btn">
              去注册
            </button>
          </div>
          <img src="../assets/log.svg" class="image" alt="" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>已有帐号？</h3>
            <p>
              立即登录已有帐号，享受独家权益。
            </p>
            <button class="btn transparent" id="sign-in-btn">
              去登录
            </button>
          </div>
          <img src="img/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from "vue";
import router from "@/router";
//登录api
import {postlogin,getverify,postenroll} from "@/request/api/login";

//element组件
import { ElMessage } from 'element-plus'
//vuex
import {useStore} from "vuex";
export default {
  name: "login",
  setup(){
    //退出
    let gohome = function (){
      router.push('/');
    }
    //登录功能
    let uname = ref('');
    let upassword = ref('');

    //创建vuex的实例
    let {commit} = useStore();

    //点击登录
    const gologin = function (){
      postlogin(uname.value,upassword.value).then(res =>{
        if(res.data.code != 200){
          ElMessage.error(res.data.msg);
        }else {
          ElMessage({
            message: res.data.msg,
            type: 'success',
          })
          let user = res.data.result;
          let token = res.data.token;
          localStorage.setItem('token',token);
          commit("updateuser",user);   //commit提交数据
          router.push('/');
        }
      })
    }

    //注册功能
    let e_uname = ref('');
    let e_email = ref('');
    let e_pwd = ref('');
    let code = ref('');
    //发送验证码
    let goSendverify = function (){
      if(e_uname.value =='' || e_email.value == '' || e_pwd.value ==''){
        return  ElMessage({
            message:'用户名，邮箱，密码为必填项',
            type:'error',
            duration:5000
        })
      }else{
        //邮箱及密码正则
        const email = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if(!email.test(e_email.value)){
          return ElMessage({
            message:'邮箱格式不正确，请检查!',
            type:'error',
            duration:5000
          })
        }
        //密码正则
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
        if(!reg.test(e_pwd.value)){
          return ElMessage({
            message:'密码在6到12之间，且是字母加密码',
            type:'error',
            duration:8000
          })
        }
        getverify(e_email.value).then(res => {
          if(res.data.code != 200){
            ElMessage.error(res.data.msg);
          }else{
            ElMessage({
              message:'验证码以发送',
              type:'success'
            })
          }
        })
      }

    }
    //点击注册功能
    const goenroll = function (){
      if(code.value == '' || code.value.length !== 5){
        return ElMessage({
          message:'请检查验证码!',
          type:'error',
          duration:5000
        })
      }
      postenroll(e_uname.value,e_email.value,e_pwd.value,code.value).then(res =>{
        if(res.data.code != 200){
          ElMessage.error(res.data.msg);
        }else{
          ElMessage({
            message:res.data.msg,
            type:'success'
          })
        }
      })
    }

    //注册点击按钮显示或隐藏密码
    let iconShow = ref(false);
    const oniconShowOpen = ()=>{
      iconShow.value = true;
    }
    const oniconShowShut = ()=>{
      iconShow.value = false;
    }

    //登录点击按钮显示隐藏密码
    let LiconShow = ref(false);
    const oniconShowOpenL = ()=>{
      LiconShow.value = true;
    }
    const oniconShowShutL = ()=>{
      LiconShow.value = false;
    }

    //注册页面动画
    onMounted(()=>{
      const sign_in_btn = document.querySelector("#sign-in-btn");
      const sign_up_btn = document.querySelector("#sign-up-btn");
      const container = document.querySelector(".container");
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });
      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    })

    return{
      gohome,
      uname, upassword,
      gologin,
      e_uname,e_email,e_pwd,code,
      goSendverify,
      goenroll,
      oniconShowShut,oniconShowOpen,iconShow,
      oniconShowOpenL,oniconShowShutL,LiconShow
    }
  }
}
</script>

<style lang="less" scoped>
.iii{
  cursor:pointer;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body,
input {
  font-family: "Poppins", sans-serif;
}

.input-yz{
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  input{
    padding: 0 5px 0 18px;
  }
  button{
    border-radius: 7px;
    background-color: #dddddd;
    font-size: 14px;
    line-height: 14px;
    padding: 0 4px;
  }
  button:active{
    width: 80px;
    height: 34px;
  }
}

.input-yz input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}
.input-yz button{
  border: 1px solid #888888;
  height: 35px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.container {
  position: relative;
  min-width: 100vw;
  background-color: #fff;
  min-height: 100vh !important;
  overflow: hidden;
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}

form.sign-up-form {
  opacity: 0;
  z-index: 1;
}

form.sign-in-form {
  z-index: 2;
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
  display: block;
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 0.4rem;
  position: relative;
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: 0.5s;
  font-size: 1.1rem;
}

.input-field input {
  background: none;
  outline: none;
  border: none;
  line-height: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500;
}

.social-text {
  padding: 0.7rem 0;
  font-size: 1rem;
  cursor: pointer;
}

.social-media {
  display: flex;
  justify-content: center;
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: 0.3s;
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}
.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: 0.4s;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem;
}

.panel p {
  font-size: 0.95rem;
  padding: 0.7rem 0;
}

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: 0.8rem;
}

.right-panel .image,
.right-panel .content {
  transform: translateX(800px);
}

/* ANIMATION */

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%;
}

.container.sign-up-mode .left-panel .image,
.container.sign-up-mode .left-panel .content {
  transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
  left: 25%;
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh;
  }
  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s 0.8s ease-in-out;
  }

  .signin-signup,
  .container.sign-up-mode .signin-signup {
    left: 50%;
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr;
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2;
  }

  .right-panel {
    grid-row: 3 / 4;
  }

  .left-panel {
    grid-row: 1 / 2;
  }

  .image {
    width: 200px;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel .content {
    padding-right: 15%;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.8s;
  }

  .panel h3 {
    font-size: 1.2rem;
  }

  .panel p {
    font-size: 0.7rem;
    padding: 0.5rem 0;
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: 0.7rem;
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out;
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial;
  }

  .container.sign-up-mode .left-panel .image,
  .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px);
  }

  .container.sign-up-mode .right-panel .image,
  .container.sign-up-mode .right-panel .content {
    transform: translateY(0px);
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateY(300px);
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0);
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem;
  }

  .image {
    display: none;
  }
  .panel .content {
    padding: 0.5rem 1rem;
  }
  .container {
    padding: 1.5rem;
  }

  .container:before {
    bottom: 72%;
    left: 50%;
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%;
  }
}

</style>
