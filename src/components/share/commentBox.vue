<template>
  <div>
    <div v-for="(item,index) in dataList" :key="index" class="box">
      <div class="img_title_box">
        <div class="img_box">
          <el-avatar :size="50" :src="item.uimg"/>
        </div>
        <div class="title_box">
          <h6>{{ item.uname }}</h6>
        </div>
      </div>
      <div class="content_box">
        <div class="content_text">
          <p>{{ item.comment }}</p>
        </div>
        <div class="content_img">
          <el-image v-for="(i,j) in item.img" :key="j" :src="i" fit="cover" @click="clickPicture(i)"/>
        </div>
      </div>
      <!--      功能列表-->
      <div class="function_box">
        <i class="iconfont icon-xiaoxi1"  @click="ctrlSonInputBox(index)"></i>
      </div>
      <!--      回复评论框-->
      <div v-if="sonInputBoxIndex == index ? true : false " class="sonInputBox">
        <sonInputBox @sonpublishAgain="sonpublishAgain" :pname="item.uname" :pid="item.id"></sonInputBox>
      </div>
      <!--      子级评论-->
      <div v-if="sonInputBoxIndex == index ? true : false" class="sonCommentBox">
        <div v-for="(n,m) in item.children" :key="m" class="sonCommentList">
          <div class="son_img_title_box">
            <div class="son_img_box">
              <el-avatar :size="50" :src="n.uimg"/>
            </div>
            <div class="son_title_box">
              <p class="uname">{{n.uname}} 回复</p>
              <p class="pname">{{n.pname}}</p>
            </div>
          </div>
          <div class="son_content_box">
            <div class="son_content_text">
              <p>{{n.comment}}</p>
            </div>
            <div class="son_content_img">
              <el-image v-for="(v,w) in n.img" :key="w" :src="v" fit="cover" @click="clickPicture(v)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import sonInputBox from '@/components/share/sonInputBox';
import Lines from "@/components/common/lines";
import {ref} from "vue";

const props = defineProps(['dataList'])
console.log(props)
/** emit 点击图片传值给父组件 实现图片预览*/
let emit = defineEmits(['click-picture','publishAgain']);

const clickPicture = function (url) {
  emit("click-picture", url, true)
}

const sonpublishAgain = function (){
  emit('publishAgain');
}

/** 回复 展示 评论功能 */
//     点击显示回复评论框 评论列表
let sonInputBoxIndex = ref(null)

//点击图标显示或关闭回复评论框
const ctrlSonInputBox = function (index) {
  if(sonInputBoxIndex.value == index){
    sonInputBoxIndex.value=null;
  }else{
    sonInputBoxIndex.value = index;
  }
}
</script>

<style lang="less" scoped>
.box {
  margin: 0 0 15px 0;
  width: 700px;
  border-radius: 8px;
  padding: 10px 0;
  background-color: #ffffff;
}

.img_title_box {
  display: flex;
  height: 50px;
  width: 100%;
  margin: 5px 0;

  .img_box {
    margin: 0 10px;
  }

  .title_box {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h6 {
      padding: 0;
      margin: 3px 0;
      display: block;

    }

    span {
      display: block;
      font-size: 10px;
      color: #aaaaaa;
    }
  }
}

.content_box {
  width: 100%;
  padding: 10px 10px 10px 60px;

  .content_text {
    p {
      word-wrap: break-word;
      word-break: break-all;
    }
  }

  .content_img {
    .el-image {
      margin: 0 5px 0 0;
      width: 150px;
      height: 150px;
      cursor: pointer;
    }
  }
}

.function_box {
  width: 100%;
  height: 30px;
  padding: 10px 10px 10px 60px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: flex-end;
  align-items: center;

  i {
    display: block;
    font-size: 25px;
    margin: 0 20px;
    cursor: pointer;
  }

  .icon-aixin {
    color: red;
  }
}

.sonCommentBox {
  height: 100%;
}

.sonCommentList {
  padding-left: 50px;

  .son_img_title_box {
    display: flex;
    height: 50px;
    width: 100%;
    margin: 5px 0;

    .son_img_box {
      margin: 0 10px;
    }

    .son_title_box {
      display: flex;
      flex-direction: row;
      justify-content: center;

      p{
        padding: 0;
        margin: 3px 3px;
        display: block;
      }
      .pname{
        color:#4d84e2;
      }

    }
  }

  .son_content_box {
    width: 100%;
    padding: 0 0 0 70px;

    .son_content_text {
      p {
        word-wrap: break-word;
        word-break: break-all;
      }
    }

    .son_content_img {
      .el-image {
        margin: 0 5px 0 0;
        width: 150px;
        height: 150px;
        cursor: pointer;
      }
    }
  }
}

.sonInputBox {
  margin: 5px 0px;
}
</style>
