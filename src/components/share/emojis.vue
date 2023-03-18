<template>
  <div class="chatIcon">
    <el-popover popper-class="biaoqing" placement="top" :width="400" trigger="click">
      <template #reference>
        <div class="emotionSelect"><img src="../../assets/biaoqing.png" alt=""></div>
      </template>
      <div class="emotionList">
        <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index"
           class="emotionItem">{{item}}</a>
      </div>
    </el-popover>

  </div>
</template>
<script setup>
import appData from "./emoji.js"
import {onMounted,ref} from "vue";
onMounted(()=>{
  for (let i in appData) {
    faceList.value.push(appData[i].char);
  }
})

let faceList=ref([]);
let emojiItem = ref(null);
let emit = defineEmits(['changeText']);
//这里父组件 触发事件 都会执行
const getEmo = (index) => {
      emojiItem.value = index;
      emit("changeText",faceList.value,emojiItem.value)
    };
</script>
<style scoped>
.emotionSelect {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  padding: 1px;


}
img {
  padding: 0;
  margin: 0;
  width: 100%
}
.chatIcon {
  padding: 0 10px;
  font-size: 25px;
}
.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}
.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>
