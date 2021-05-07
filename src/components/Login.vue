<template>
  <div class="loginPage">
    <div class="loginDiv">
      <div class="loginTitle">
        <p>西山龙胤管理系统</p>
      </div>
      <div class="loginForm">
        <el-form ref="form" :model="form">
          <el-form-item prop="username">
            <el-input v-model="form.account" placeholder="用户名" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码"  v-model="form.password" autocomplete="off" style="width: 250px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" class="submit_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
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
      }
    }
  },
  methods: {
    submitForm() {
      post("/api/common/login",{account: this.form.account, password: this.form.password}).then(res => {
        if (res.status == 'success') {
          this.$message.success('登录成功！');
          this.$router.replace('/index');
        } else {
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.$message.error('网络错误！');
      });
    }
  }
}
</script>

<style scoped>
.loginPage {
  height: 100vh;
  width: 100%;
  background: black;
}
.loginDiv {
  position: absolute;
  width: 400px;
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
  background: aliceblue;
  height: 300px;
  width: 100%;
}
</style>
