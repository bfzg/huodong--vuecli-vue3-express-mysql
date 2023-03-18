<template>
  <div>
    <!--  关闭按钮区域-->
    <div class="shut_down">
      <button @click="gohome" type="button" class="btn-close" aria-label="Close"></button>
    </div>
    <!--  卡片视图区域-->
    <el-card>
      <el-form :rules="updateFormRules" :model="updateForm" ref="updateFormRef" label-width="100px">
        <el-form-item label="活动名称" prop="eventsname">
          <el-input v-model="updateForm.eventsname"/>
        </el-form-item>
        <el-form-item label="联系方式" prop="email">
          <el-input v-model="updateForm.email"/>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="uname">
          <el-input v-model="updateForm.uname" disabled placeholder="Please input" />
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input v-model="updateForm.detailed" type="textarea"/>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="updateForm.address"/>
        </el-form-item>
        <!--        活动时间-->
        <el-form-item label="活动时间" prop="starttime">
          <el-col :span="11">
            <el-date-picker
                v-model="updateForm.starttime"
                type="date"
                placeholder="开始时间"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="updateForm.shuttime"
                type="date"
                placeholder="结束时间"
                style="width: 100%"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="所属类型" prop="type">
          <el-select v-model="updateForm.type" placeholder="请选择你所属的类型">
            <el-option label="学校" value="school"/>
            <el-option label="个人" value="personal"/>
          </el-select>
        </el-form-item>
        <!--        所属系部-->
        <el-form-item label="所属系部" prop="department">
          <el-select v-model="updateForm.department" placeholder="请选择你所属的系部">
            <el-option label="机电信息系" value="机电信息系"/>
            <el-option label="新闻传播系" value="新闻传播系"/>
            <el-option label="经济管理系" value="经济管理系"/>
            <el-option label="艺术设计系" value="艺术设计系"/>
            <el-option label="总务处" value="总务处"/>
          </el-select>
        </el-form-item>
        <!--        上传文件-->
        <el-form-item>
          <el-upload
              class="upload-demo"
              action="http://127.0.0.1:3000/upload"
              multiple
              :limit="1"
              :on-exceed="exceedMaxFile"
              :auto-upload="false"
              :on-change="handleChanged"
              ref="uploadrefss"
          >
            <el-button type="primary">点击上传文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="update()" type="primary">上传</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import router from "@/router";
import {computed, reactive, ref, toRaw, unref} from 'vue'
import {upload} from '@/request/api/update'
//element提示
import {ElMessage, FormInstance} from 'element-plus'
//vuex
import {useStore} from "vuex"
export default {
  setup() {
    let {state} = useStore();
    let user = toRaw(computed(() => state.user.userInfo).value);

    // 上传表单数据
    let updateForm = reactive({
      uid:user[0].uid,
      eventsname: '',
      email: '',
      uname: user[0].uname,
      detailed: '',
      address: '',
      starttime: '',
      shuttime: '',
      department: '',
      type: '',
      files: []
    });
    //表单校验
    const updateFormRules = reactive({
      eventsname: [
        {required: true, message: '请输入活动名称', trigger: 'blur'},
      ],
      email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
      ],
      type: [
        {required: true, message: '请选择你所属的类型', trigger: 'change',},
      ],
      department: [
        {required: true, message: '请输入所属系部', trigger: 'change',},
      ],
      starttime: [
        {required: true, message: '请选择开始时间', trigger: 'change'},
      ],
    });

    //确认上传
    let updateFormRef = ref(null);
    let uploadrefss = ref(null);
    const update = function () {
      //判断是否有表单项未输入
      updateFormRef.value.validate(async (valid) => {
        if (valid) {
          let formData = new FormData();
          // 将数据循环放入formdata中
          Object.keys(updateForm).forEach((key) => {
            formData.append(key, updateForm[key]);
          });
          const {data:res} = await upload(formData);
          if(res.status === 200){
            updateForm.detailed = '';
            updateForm.address = '';
            updateForm.shuttime= '';
            updateFormRef.value.resetFields();

            uploadrefss.value.clearFiles()
            return ElMessage.success(res.message);
          }else{
            return ElMessage.error('上传失败!');
          }
        } else {
          return ElMessage.error('请完善表单!');
        }
      })


    }
    //超过多选文件最大限额
    const exceedMaxFile = function () {
      ElMessage({
        message: '选取文件超过1个',
        type: 'warning',
      })
    }
    //文件改变时的操作 不自动上传设置
    const handleChanged = function (file) {
      updateForm.files = file.raw;
    }

    //点击关闭按钮返回主页
    const gohome = function () {
      router.push('/')
    }
    return {
      updateForm,
      gohome,
      updateFormRules,
      update,
      exceedMaxFile,
      handleChanged,
      updateFormRef
    }
  }
}
</script>

<style lang="less" scoped>
.shut_down {
  margin: 20px 10px;
}

.el-card {
  margin: 30px;
}
</style>
