<template>
  <router-view/>
</template>
<script>
import {useStore} from "vuex";
export default {
  setup(){
    let {commit} = useStore();
    commit("inituser");
    commit("getUserJPInfo");
  }
}
</script>
<style lang="less">
</style>
