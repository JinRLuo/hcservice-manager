<template>
  <div>
    <el-input v-model="searchAccountName" placeholder="查找账号" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getAccountListByPage('search')">搜索</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="userInfo"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="300">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="300">
        <template slot-scope="scope">
          <span>{{scope.row.status==true?"正常":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="modifyStatus(scope.$index, scope.row)">{{scope.row.status==true?"封禁":"解禁"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "UserAccount",
  data () {
    return {
      searchAccountName: '',
      tableLoading: false,
      userInfo: [],
      tableHeight: 1000
    }
  },
  methods: {
    getAccountListByPage(type) {

    },
    modifyStatus(index, row) {

    }
  },
  mounted:function(){
    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 100
      }
    })
  }
}
</script>

<style scoped>

</style>
