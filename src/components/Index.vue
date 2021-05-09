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
              <el-avatar size="medium" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="leftAside" width="300px">
          <el-menu
            default-active="index"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" style="height: 100%" router>

            <el-menu-item index="index">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>账号管理</span>
              </template>
              <el-menu-item index="managerAccount">管理员</el-menu-item>
              <el-menu-item index="userAccount">业主</el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>房产管理</span>
              </template>
              <el-menu-item index="3-1">审核房产</el-menu-item>
              <el-menu-item index="3-2">管理房产</el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息发布</span>
              </template>
              <el-menu-item index="4-1">公告管理</el-menu-item>
              <el-menu-item index="4-2">投诉信息</el-menu-item>
            </el-submenu>

            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">维修管理</span>
            </el-menu-item>

            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span slot="title">访客管理</span>
            </el-menu-item>

            <el-menu-item index="7">
              <i class="el-icon-setting"></i>
              <span slot="title">停车管理</span>
            </el-menu-item>

            <el-menu-item index="8">
              <i class="el-icon-setting"></i>
              <span slot="title">物业管理</span>
            </el-menu-item>

            <el-menu-item index="9">
              <i class="el-icon-setting"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>

          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data: {
    return () {

    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
  background: #545C64;
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
