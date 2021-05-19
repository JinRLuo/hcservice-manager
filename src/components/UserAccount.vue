<template>
  <div>
    <el-input v-model="searchPhoneNum" placeholder="查找手机号" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getAccountListByPage('search')">搜索</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="userInfo"
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
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
            @click="homeOwnerInfo(scope.$index, scope.row)">查看房产信息</el-button>
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
    <el-dialog title="房产信息" :visible.sync="homeOwnerInfoDialogFormVisible" width="1000px">
      <el-table
        :data="homeOwnerList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="户主姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="credentialType"
          label="证件类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="credentialNum"
          label="证件号">
        </el-table-column>
        <el-table-column
          prop="phoneNum"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="roomNum"
          label="房产">
          <template slot-scope="scope">
            <span>{{scope.row.buildingNum + "幢" + scope.row.roomNum + "房"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="area"
          label="面积（平方米）">
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="homeOwnerInfoDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "UserAccount",
  data () {
    return {
      searchPhoneNum: '',
      tableLoading: false,
      userInfo: [],
      tableHeight: 1000,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      homeOwnerInfoDialogFormVisible: false,
      homeOwnerList: []
    }
  },
  methods: {
    getAccountListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/admin/getUserInfoList', {searchPhoneNum: this.searchPhoneNum, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.userInfo = res.data.list;
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
    modifyStatus(index, row) {
      let url;
      let message;
      if(row.status==true){
        url = '/api/admin/disableUserAccount';
        message = '已禁用该账号'
      } else {
        url = '/api/admin/freeUserAccount';
        message = '已解禁该账号'
      }
      post(url, {userId: row.userId}).then(res => {
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
    homeOwnerInfo(index, row) {
      this.homeOwnerInfoDialogFormVisible = true;
      this.homeOwnerList = row.homeOwners;
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
  },
  created() {
    this.tableLoading = true;
    post('/api/admin/getUserInfoList', {searchPhoneNum: this.searchPhoneNum, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      if(res.status == "success") {
        this.userInfo = res.data.list;
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
  }
}
</script>

<style scoped>

</style>
