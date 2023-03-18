import { createStore } from 'vuex'
import user from './modules/user'
import dialogBox from "@/store/modules/dialogBox";
export default createStore({
  state: {
    previewPictureShow:false
  },
  getters: {
  },
  mutations: {
    //控制查看图片组件的显示与隐藏
    changePreviewPictureShow(state,value){
      state.previewPictureShow = value;
      console.log( state.previewPictureShow)
      return;
    }
  },
  actions: {
  },
  modules: {
    user,
    dialogBox
  }
})
