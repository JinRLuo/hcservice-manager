<template>
  <div>
    <el-table
      ref="table"
      :data="managerAccounts"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="adminName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="权限"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-for="(role, i) in scope.row.roles" :key="i"
            :type="role.detail === '系统管理员' ? 'primary' : 'success'"
                  style="margin: 0px 2px"
            disable-transitions>{{ role.detail }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status==true?"正常":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">管理权限</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">封禁</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0;text-align: center"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      @current-change="getAccountListByPage">
    </el-pagination>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "ManagerAccount",
  data () {
    return {
      managerAccounts: [],
      pageNum: 1,
      pageSize: 10,
      tableHeight: 1000,
      total: 20,
    }
  },
  methods: {
    getAccountListByPage () {
      post('/api/admin/getAccountList', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.managerAccounts = res.data.list;
          this.total = res.data.total;
        } else {
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.$message.error('网络错误！');
      });
    }
  },
  created() {
    post('/api/admin/getAccountList', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      if(res.status == "success") {
        this.managerAccounts = res.data.list;
        this.total = res.data.total;
      } else {
        this.$message.error(res.data.errMsg);
      }
    }).catch(err => {
      this.$message.error('网络错误！');
    });
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
