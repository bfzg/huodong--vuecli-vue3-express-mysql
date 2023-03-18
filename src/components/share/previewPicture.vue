<template>
  <div class="previewPicture">
    <div class="icon_btn">
      <i class="iconfont icon-guanbi4" @click="shutView"></i>
    </div>
    <div class="previewPicture_img">
      <el-image :src="picUrl" fit="scale-down" style="width: 1000px; height: 700px"/>
    </div>
  </div>
</template>

<script setup>
//接收父组件传来的参数
const props = defineProps(['picUrl'])
/** 通过emit 来控制组件的显示与隐藏 */
let emit = defineEmits(['click-picture']);
const shutView = function () {
  emit("click-shutIcon", false);
}
/** end 通过emit 来控制组件的显示与隐藏 */
</script>

<style lang="less" scoped>
.previewPicture {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  position: absolute;
  left: 0;
  top: 0;
  min-width: 1200px;
}

.previewPicture_img {
  width: 1000px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon_btn {
  position: absolute;
  top: 20px;
  right: 100px;

  i {
    font-size: 40px;
    cursor:pointer;
    color: #ffffff;
  }
}
</style>
