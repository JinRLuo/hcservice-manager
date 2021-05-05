<template>
  <div class="indexPage">
    <el-container style="height: 100%">
      <el-header class="top" height="60px">Header</el-header>
      <el-container>
        <el-aside class="leftAside" width="250px">
          Aside
        </el-aside>
        <el-main>
          Main
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
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
  background: gray;
}
.top {
  background: red;
}
.leftAside {
  background: green;
}
</style>
