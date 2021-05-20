<template>
  <div class="indexPage">
    <el-container style="height: 100%">
      <el-header class="top" height="60px">
        <el-row class="demo-avatar demo-basic">
          <el-col :span="3">
            <div class="topTitle">西山龙胤</div>
          </el-col>
          <el-col :span="2" :offset="19">
            <div class="headImage">
              <el-dropdown @command="handleCommand">
                <el-avatar class="el-dropdown-link" size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出账号</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="leftAside" width="300px">
          <el-menu
            default-active="main"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#ffd04b" style="height: 100%" router>

            <el-menu-item index="main">
              <i class="el-icon-s-data"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>账号管理</span>
              </template>
              <el-menu-item index="managerAccount">管理员</el-menu-item>
              <el-menu-item index="userAccount">业主</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>房产管理</span>
              </template>
              <el-menu-item index="auditRoom">审核房产</el-menu-item>
              <el-menu-item index="house">管理房产</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-comment"></i>
                <span>信息发布</span>
              </template>
              <el-menu-item index="notice">公告管理</el-menu-item>
              <el-menu-item index="complaint">投诉信息</el-menu-item>
            </el-submenu>

            <el-menu-item index="repair">
              <i class="el-icon-s-open"></i>
              <span slot="title">维修管理</span>
            </el-menu-item>

            <el-menu-item index="visitor">
              <i class="el-icon-s-check"></i>
              <span slot="title">访客管理</span>
            </el-menu-item>

            <el-menu-item index="car">
              <i class="el-icon-s-finance"></i>
              <span slot="title">停车管理</span>
            </el-menu-item>

            <el-menu-item index="service">
              <i class="el-icon-s-management"></i>
              <span slot="title">物业管理</span>
            </el-menu-item>

            <el-menu-item index="order">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="modifyPasswordDialogFormVisible" width="400px">
      <el-form ref="modifyPasswordForm" :model="modifyPasswordForm" :rules="modifyPasswordRules" v-loading="dialogLoading" label-position="left" label-width="70px" hide-required-asterisk>
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input type="password"  v-model="modifyPasswordForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="modifyPasswordForm.newPassword" autocomplete="off" required></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword">
          <el-input type="password" v-model="modifyPasswordForm.repeatPassword" autocomplete="off" required></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyPasswordDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "index",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.modifyPasswordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      modifyPasswordDialogFormVisible: false,
      dialogLoading: false,
      modifyPasswordForm: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
      },
      modifyPasswordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repeatPassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand(command) {
      if (command == 'logout') {
        post('/api/admin/logout', {}).then(res => {
          if (res.status == "success") {
            this.$store.commit('CLEAR_ADMIN_INFO');
            this.$router.replace('/');
            this.$message.success("已退出该账号");
          } else {
            this.$message.error(res.data.errMsg);
          }
        }).catch(err => {
          this.$message.error('网络错误');
        });
      } else if(command == 'modifyPassword') {
        this.modifyPasswordDialogFormVisible = true;
      }
    },
    modifyPassword() {
      this.$refs['modifyPasswordForm'].validate((valid) => {
        if (valid) {
          post('/api/admin/modifyPassword', {newPassword: this.modifyPasswordForm.newPassword, oldPassword: this.modifyPasswordForm.oldPassword}).then(res => {
            if (res.status == "success") {
              this.$message.success('密码修改成功，请重新登录');
              this.$router.replace('/');
            } else {
              this.$message.error(res.data.errMsg);
            }
          }).catch(err => {
            this.$message.error('网络错误');
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.indexPage {
  height: 100vh;
  margin: 0;
  padding: 0;
  border-width: 0;
}
.top {
  background: #23262E;
}
.leftAside {

}
el-menu-item {
  background: #1F2D3D;
}
.headImage {
  padding: 11px 0px 0px 85px;
}
.topTitle {
  line-height: 55px;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
</style>
