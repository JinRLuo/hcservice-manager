<template>
  <div class="loginPage">
    <div class="loginDiv">
      <div class="loginTitle">
        <p>西山龙胤管理系统</p>
      </div>
      <el-card class="loginForm" >
        <el-form ref="form" class="form" :model="form" :rules="rules" @submit.native.prevent>
          <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="用户名" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="form.password" autocomplete="off" style="width: 250px;" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" @click="submitForm('form')" class="submit_btn" style="width: 250px;">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post("/api/admin/login",{account: this.form.account, password: this.form.password}).then(res => {
            if (res.status == 'success') {
              this.$message.success('登录成功！');
              this.$router.replace('/index');
            } else {
              this.$message.error(res.data.errMsg);
            }
          }).catch(err => {
            this.$message.error('网络错误！');
          });
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
.loginPage {
  height: 100vh;
  width: 100%;
  background: #324057;
}
.loginDiv {
  position: absolute;
  align-items: center;
  width: 350px;
  height: 400px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.loginTitle{
  text-align: center;
  font-size: 34px;
  color: #fff;
  height: 50px;
  width: 100%;
}
.loginForm {
  position: absolute;
  background: aliceblue;
  margin-top: 20px;
  height: 240px;
  width: 100%;

}
.form {
  padding: 18px 0 0 27px;
  /*margin-top: 20%;*/
  /*transform: translateY(-25%);*/
}
</style>
