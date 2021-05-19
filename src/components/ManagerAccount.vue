<template>
  <div>
    <el-input v-model="searchAccountName" placeholder="查找账号" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getAccountListByPage('search')">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="addAccountDialogFormVisible = true">添加账号</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="managerAccounts"
      :height="tableHeight"
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
      @current-change="getAccountListByPage('page')">
    </el-pagination>
    <el-dialog title="修改权限" :visible.sync="modifyAuthorityDialogFormVisible" width="650px">
      <el-transfer v-model="selectedAuthority" :data="allAuthority" v-loading="formLoading" :titles="['未拥有权限', '已拥有权限']"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyAuthorityDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyAuthority">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加账号" :visible.sync="addAccountDialogFormVisible" width="400px">
      <el-form ref="addAccountForm" :model="addAccountForm" :rules="addAccountFormRules" v-loading="dialogLoading" label-position="left" label-width="70px">
        <el-form-item label="账号" prop="adminName">
          <el-input v-model="addAccountForm.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addAccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="addAccountForm.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span style="color: red">*初始密码为1234，请在首次登录后及时修改登录密码！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAccountDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
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
      addAccountForm: {
        adminName: '',
        email: '',
        phoneNum: ''
      },
      pageNum: 1,
      pageSize: 10,
      tableHeight: 1000,
      total: 0,
      modifyAuthorityDialogFormVisible: false,
      addAccountDialogFormVisible: false,
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
      addAccountFormRules: {
        adminName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20', trigger: 'blur' },
          { pattern: /^[_a-zA-Z0-9]{5,20}$/, message: '只能为字母、数字和下划线', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '必须为有效邮箱', trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/, message: '必须为有效手机号', trigger: 'blur' }
        ]
      },
      selectedAuthority: [],
      selectedAdminId: 0,
      selectedIndex: 0,
      dialogLoading: false,
      tableLoading: false,
      formLoading: false,
      searchAccountName: ''
    }
  },
  methods: {
    getAccountListByPage (type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/admin/getAdminInfoList', {searchAccount: this.searchAccountName, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
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
      this.modifyAuthorityDialogFormVisible = true;
    },
    modifyAuthority() {
      this.dialogLoading = true;
      post('/api/admin/modifyAdminRole', {adminId: this.selectedAdminId, roleIds: this.selectedAuthority}).then(res => {
        if(res.status == "success") {
          this.managerAccounts[this.selectedIndex].roles = res.data;
          this.dialogLoading = false;
          this.modifyAuthorityDialogFormVisible = false;
          this.$message.success('修改权限成功');
        } else {
          this.dialogLoading = false;
          this.modifyAuthorityDialogFormVisible = false;
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.dialogLoading = false;
        this.modifyAuthorityDialogFormVisible = false;
        this.$message.error('网络错误！');
      });
    },
    modifyStatus(index, row) {
      let url;
      let message;
      if(row.status==true){
        url = '/api/admin/disableAdminAccount';
        message = '已禁用该账号'
      } else {
        url = '/api/admin/freeAdminAccount';
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
    },
    addAccount() {
      this.$refs['addAccountForm'].validate((valid) => {
        if (valid) {
          this.formLoading = true;
          post('/api/admin/register', {
            account: this.addAccountForm.adminName,
            email: this.addAccountForm.email,
            phoneNum: this.addAccountForm.phoneNum
          }).then(res => {
            if (res.status == "success") {
              this.formLoading = false;
              this.addAccountDialogFormVisible = false;
              this.$message.success('账号添加成功');
            } else {
              this.formLoading = false;
              this.addAccountDialogFormVisible = false;
              this.$message.error(res.data.errMsg);
            }
          }).catch(err => {
            this.formLoading = false;
            this.addAccountDialogFormVisible = false;
            this.$message.error('网络错误！');
          });
        }
      });
    }
  },
  created() {
    this.tableLoading = true;
    post('/api/admin/getAdminInfoList', {searchAccount: this.searchAccountName, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
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
