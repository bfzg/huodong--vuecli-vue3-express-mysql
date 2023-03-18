const dialogBox = {
    state: {
        //控制对话框的显示与隐藏
        dialogShow:false,
        eventsInfo:{},
    },
    getters: {
    },
    mutations: {
        ctrlDialogShow(state,value){
            state.dialogShow = value;
            return;
        },
        //获取需要渲染的数据
        getEventsInfo(state,info){
            state.eventsInfo = info;
        },
        //清空活动信息
        removeEventsInfo(state){
            state.eventsInfo=''
        }
    },
    actions: {
    },
}
export default dialogBox;
