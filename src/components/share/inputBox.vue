<template>
<div class="box">
  <div class="form_box">
    <el-input
        v-model="upFormData.comment"
        :rows="2"
        type="textarea"
        placeholder="有什么想和大家分享的?"
        id="textarea"
        resize="none"
        :autosize="{ minRows: 2, maxRows: 12 }"
    />
    <div class="function_list">
      <div class="emoji">
        <Emoji ref="getEmoji" @changeText="changeText"></Emoji>
      </div>
      <div class="icon_img">
        <el-popover placement="bottom" :width="400"  trigger="click">
          <template #reference>
            <i class="iconfont icon-shangchuantupian"></i>
          </template>
          <el-upload
              action="http://127.0.0.1:3000/api/addComments"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :auto-upload="false"
              :on-change="handleChanged"
              :limit=6
              :multiple="true"
              :before-upload="beforeAvatarUpload"
              :on-exceed="onError"
              ref="uploadrefss"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-popover>

      </div>
      <div class="btn">
        <el-button type="primary" plain @click="addComment">发布</el-button>
      </div>
    </div>

  </div>
</div>
</template>

<script setup>
import Emoji from "@/components/share/emojis.vue";
import {ref, reactive, toRaw, computed,defineEmits} from "vue";
//element
import {postComments} from "@/request/share/share";
import { Plus } from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus'
//vuex
import {useStore} from "vuex";
let {state} = useStore();
let user = toRaw(computed(() => state.user.userInfo).value);
let emit = defineEmits(['publishAgain']);

/** 评论框 */
  //输入评论框的数据
  let message = ref('');

  //控制光标位置点击表情 插入
  const changeText =(faceList,emojiItem) => {
    var textArea = document.getElementById('textarea');
    function changeSelectedText(obj, str) {
      // 非IE浏览器
        textArea.setRangeText(str);
        // 在未选中文本的情况下，重新设置光标位置
        textArea.selectionStart += str.length;
        textArea.focus()
    }
    changeSelectedText(textArea, faceList[emojiItem]);
    upFormData.comment =textArea.value
  }

/** 发布评论*/

//用户发布动态 或 评论 数据
let upFormData = reactive({
  pid:null,       //父级评论id  可为空
  uid:user[0].uid,      //用户id 用来检索用户评论
  uimg:user[0].uimg,     //用户头像
  uname:user[0].uname,    //用户姓名
  pname:'',    //被回复的姓名
  comment:'',  //评论内容
})
//存储多张图片
let img = ref(null)

//发布
let uploadrefss = ref(null);
const addComment = async function (){
  if(upFormData.comment != ''){
    //转换成表单数据对象
    let formData = new FormData();
    Object.keys(upFormData).forEach((key) => {
      formData.append(key, upFormData[key]);
    });
    // 处理多张图片
    if(img.value != null){
      for (let i = 0; i < img.value.length; i++) {
        formData.append("images",img.value[i].raw)
      }
    }

    let {data:res}= await postComments(formData);
    if(res.status !==200){
      ElMessage.error('上传失败!');
    }else{
      ElMessage.success(res.message)
      upFormData.comment='';
      upFormData.pname='';
      upFormData.pid=null;
      uploadrefss.value.clearFiles()
      emit('publishAgain');
    }
  }else{
    ElMessage.error('请输入评论')
  }
}


/** 上传图片 */
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//图片预览
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
}

//当文件发生改变时
const handleChanged = function (file, fileList){
  img.value=fileList;
}

//上传文件之前的钩子
const beforeAvatarUpload = function (rawFile){
  if (rawFile.type !== 'image/jpeg' || rawFile.type !== 'image/png') {
    ElMessage.error('上传只能为jpeg或png');
    return false
  } else if (rawFile.size / 1024 / 1024 / 1024 / 1024 / 1024 / 1024/ 1024/ 1024 / 1024 / 1024 / 1024 / 1024 > 12) {
    ElMessage.error('上传的图片大小在12MB内');
    return false
  }
  return true
}

//图片规则约束
const onError = function (files){
  if(files){
    return ElMessage.error('上传的文件数超出6个，或单张图片大于12MB');
  }
}


</script>

<style lang="less" scoped>
.box{
  margin: 10px 0;
  width: 100%;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}

.form_box{
  .el-input{
    border: none !important;
  }
  .function_list{
    padding: 5px 5px;
    display: flex;
    justify-content: right;
    .emoji{
      margin:0 0px;
      cursor:pointer;
    }
    .btn{
      padding: 0;
      margin: 0;
      .el-button{
        width: 45px;
        height: 25px;
        font-size: 10px;
        text-align: center;
        line-height: 25px;
      }
    }
    .icon_img{
      width: 45px;
      height: 25px;
      line-height: 29px;
      .icon-shangchuantupian{
        font-size: 30px;
        color: #888888;
        cursor:pointer;
      }
    }
  }

}
</style>
