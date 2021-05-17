<template>
  <div>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="repairList"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form v-if="props.row.status==1" label-position="left" inline class="demo-table-expand">
              <el-form-item label="处理管理员">
                <span>{{ props.row.adminName }}</span>
              </el-form-item>
              <el-form-item label="维修反馈">
                <span>{{ props.row.feedBack }}</span>
              </el-form-item>
          </el-form>
          <div v-else>
            <span>未处理</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="报修类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="报修时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="图片">
        <template slot-scope="scope">
          <el-image v-for="(url, i) in scope.row.imgUrl" :key="i"
            style="width: 100px; height: 100px"
            :src="url"
            :preview-src-list="scope.row.imgUrl">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
            <el-button v-if="scope.row.status==0"
              size="mini"
              @click="openDialog(scope.$index, scope.row)">填写维修反馈</el-button>
            <span v-else>已反馈</span>
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
      @current-change="getRepairListByPage('page')">
    </el-pagination>
    <el-dialog title="维修结果" :visible.sync="repairResultDialogFormVisible" width="400px">
      <el-form ref="addAccountForm" :model="repairResultForm" :rules="repairResultFormRules" v-loading="dialogLoading" label-position="left" label-width="70px">
        <el-form-item label="维修反馈" prop="repairResult">
          <el-input v-model="repairResultForm.repairResult" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="repairResultDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRepairResult">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Repair",
  data () {
    return {
      repairList: [],
      tableHeight: 1000,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      repairResultForm: {
        repairResult: ''
      },
      repairResultFormRules: {
        repairResult: [
          { required: true, message: '请输入维修结果', trigger: 'blur' }
        ]
      },
      tableLoading: false,
      dialogLoading: false,
      repairResultDialogFormVisible: false,
      repairId: 0
    }
  },
  methods: {
    getRepairListByPage(type) {
      this.tableLoading = true;
      post('/api/repairInfo/getRepairRecord', {flag: 2, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.repairList = res.data.list;
          for (let i = 0; i < this.repairList.length; i++) {
            let url = this.repairList[i].imgUrl.split("|");
            for (let j = 0; j < url.length; j++) {
              url[j] = 'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/' + url[j];
            }
            this.repairList[i].imgUrl = url;
          }
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
    submitRepairResult(){
      post('/api/repairInfo/submitFeedback', {repairId: this.repairId, feedback: this.repairResultForm.repairResult}).then(res => {
        if(res.status == "success") {
          this.repairResultDialogFormVisible = false;
          this.getRepairListByPage('page');
          this.$message.success('反馈成功');
        } else {
          this.repairResultDialogFormVisible = false;
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.repairResultDialogFormVisible = false;
        this.$message.error('网络错误！');
      });
    },
    openDialog(index, row) {
      this.repairResultDialogFormVisible = true;
      this.repairId = row.repairId;
    },
  },
  created() {
    this.tableLoading = true;
    post('/api/repairInfo/getRepairRecord', {flag: 2, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      if(res.status == "success") {
        this.repairList = res.data.list;
        for (let i = 0; i < this.repairList.length; i++) {
          let url = this.repairList[i].imgUrl.split("|");
          for (let j = 0; j < url.length; j++) {
            url[j] = 'https://hcservice-image-1256980503.cos.ap-guangzhou.myqcloud.com/' + url[j];
          }
          this.repairList[i].imgUrl = url;
        }
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
