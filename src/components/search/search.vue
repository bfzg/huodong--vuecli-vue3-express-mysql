<template>
  <div class="box">
<!--    搜索框-->
    <div class="form__group field">
      <input v-model="eventsName" placeholder="Name" class="form__field" type="input">
      <label class="form__label" for="name">活动名称</label>
    </div>
    <hr>
    <!-- 选项卡-->
    <div class="x_box" >
      <div class="overflow-hidden box row row-cols-2 ">
        <div v-for="(item,index) in o.list" :key="index"  class=" row gx-5 col card text-center item" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{item.eventsname}}</h5>
            <p class="card-text">{{item.detailed}}</p>
            <button @click="dialogBoxShows(item)" type="button" class="btn btn-primary">
              查看详情
            </button>
          </div>
        </div>
      </div>
      <dialogBox v-if="ctrlDialogBoxShow"></dialogBox>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, computed,watch} from "vue";
import {getSearch} from "@/request/api/search";
import {ElMessageBox} from "element-plus";
//对话框
import dialogBox from "@/components/common/dialogBox"
import {useStore} from "vuex";

//获取输入的数据
const eventsName = ref('');
let o = reactive({
  list:null
})

/** 搜索功能 */
const getData = async function () {
  if (eventsName.value == '') return;
  let {data:res} = await getSearch(eventsName);
  o.list = res.results;
}

const searchInput = debounce(getData,500);

/** 点击详情*/
let {commit,state} = useStore();
let ctrlDialogBoxShow = computed(()=>state.dialogBox.dialogShow)
const dialogBoxShows = function (value){
      commit('ctrlDialogShow', true);
      commit('getEventsInfo',value);
}

/** 监听输入框的值变化 */
watch(eventsName,()=>{
  searchInput();
  console.log(1111)
})


/** 防抖处理*/
function debounce(foo,delay){
  let timer;
  return function (){
    if(timer) clearTimeout(timer);
    timer = setTimeout(()=>{
      foo.call(this,arguments)
    },delay || 1000)
  }
}

</script>

<style lang="less" scoped>
.form__group {
  position: relative;
  padding: 20px 0 0;
  margin-top: 10px;
  width: 100%;
  max-width: 180px;
  left: 50%;
  transform: translate(-50%,0%);
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: none;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 17px;
  color: #000;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__field::placeholder {
  color: transparent;
}

.form__field:placeholder-shown ~ .form__label {
  font-size: 17px;
  cursor: text;
  top: 20px;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #9b9b9b;
  pointer-events: none;
}

.form__field:focus {
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 3px;
  border-image: linear-gradient(to right, #116399, #38caef);
  border-image-slice: 1;
}

.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 17px;
  color: #38caef;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}
.card{
  box-shadow: 5px 5px 10px #888888;
}

.box_cont{
  margin-left: 20px;
  span{
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
  }
  .text-cent{
    margin-top: 40px;
  }
}
section{
  padding: 0 50px;
}
.dropdown{
  margin:20px 0;
}
.t_box{
  .t_care{
    margin: 10px 10px;
    height: 200px;
    background-color: #4158D0;
    border: none;
    color:#eee;
    transition: all 0.7s;
    cursor:pointer;
  }
  .t_care:hover{
    background-color: #8EC5FC;
    color: #222;
  }
}
.x_box{

  .item{
    margin: 10px 10px;
    background-color: #eeeeee;
    color: #222;
    transition: all 0.4s;
    cursor:pointer;
  }
  .item:hover{
    background-color: #ffffff;
    color: #000;
  }
}
.card-text{
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
  overflow: hidden;
}
.box{
  justify-content: center;
}
</style>
