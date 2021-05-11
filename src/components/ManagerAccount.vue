<template>
  <div>
    <el-table
      v-loading="tableLoading"
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
            @click="authorityEdit(scope.$index, scope.row)">管理权限</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="modifyStatus(scope.$index, scope.row)">{{scope.row.status==true?"封禁":"解禁"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0;text-align: center"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      @current-change="getAccountListByPage">
    </el-pagination>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible" width="650px">
      <el-transfer v-model="selectedAuthority" :data="allAuthority" v-loading="dialogLoading"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyAuthority">确 定</el-button>
      </div>
    </el-dialog>
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
      total: 0,
      dialogFormVisible: false,
      allAuthority: [
        {
          key: 1,
          label: '系统管理员'
        },
        {
          key: 2,
          label: '小区管理员'
        },
        {
          key: 3,
          label: '停车场管理员'
        },
        {
          key: 4,
          label: '维修人员'
        },
        {
          key: 5,
          label: '保安'
        }
      ],
      selectedAuthority: [],
      selectedAdminId: 0,
      selectedIndex: 0,
      dialogLoading: false,
      tableLoading: false
    }
  },
  methods: {
    getAccountListByPage () {
      this.tableLoading = true;
      post('/api/admin/getAccountList', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.managerAccounts = res.data.list;
          this.total = res.data.total;
          this.tableLoading = false;
        } else {
          this.tableLoading = false;
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.tableLoading = false;
        this.$message.error('网络错误！');
      });
    },
    authorityEdit(index, row) {
      this.selectedAdminId = row.adminId;
      this.selectedIndex = index;
      this.selectedAuthority=[];
      for(let i=0;i<row.roles.length;i++) {
        this.selectedAuthority.push(row.roles[i].roleId);
      }
      this.dialogFormVisible = true;
    },
    modifyAuthority() {
      this.dialogLoading = true;
      post('/api/admin/modifyAdminRole', {adminId: this.selectedAdminId, roleIds: this.selectedAuthority}).then(res => {
        if(res.status == "success") {
          this.managerAccounts[this.selectedIndex].roles = res.data;
          this.dialogLoading = false;
          this.dialogFormVisible = false;
          this.$message.success('修改权限成功');
        } else {
          this.dialogLoading = false;
          this.dialogFormVisible = false;
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.dialogLoading = false;
        this.dialogFormVisible = false;
        this.$message.error('网络错误！');
      });
    },
    modifyStatus(index, row) {
      let url;
      let message;
      if(row.status==true){
        url = '/api/admin/disableAccount';
        message = '已禁用该账号'
      } else {
        url = '/api/admin/freeAccount';
        message = '已解禁该账号'
      }
      post(url, {adminId: row.adminId}).then(res => {
        if(res.status == "success") {
          row.status = !row.status;
          this.$message.success(message);
        } else {
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.$message.error('网络错误！');
      });
    }
  },
  created() {
    this.tableLoading = true;
    post('/api/admin/getAccountList', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      if(res.status == "success") {
        this.managerAccounts = res.data.list;
        this.total = res.data.total;
        this.tableLoading = false;
      } else {
        this.tableLoading = false;
        this.$message.error(res.data.errMsg);
      }
    }).catch(err => {
      this.tableLoading = false;
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
