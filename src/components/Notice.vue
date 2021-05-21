<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addNoticeDialogFormVisible = true" style="margin: 0 0 20px 0">添加公告</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="noticeList"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="title"
        label="公告标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="公告内容">
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adminName"
        label="创建者"
        width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteNotice(scope.$index, scope.row)">删除</el-button>
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
      @current-change="getNoticeListByPage('page')">
    </el-pagination>
    <el-dialog title="添加账号" :visible.sync="addNoticeDialogFormVisible" width="400px">
      <el-form ref="addNoticeForm" :model="addNoticeForm" :rules="addNoticeFormRules" v-loading="dialogLoading" label-position="left" label-width="70px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addNoticeForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="addNoticeForm.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addNoticeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNotice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Notice",
  data () {
    return {
      noticeList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      dialogLoading: false,
      tableHeight: 1000,
      addNoticeDialogFormVisible: false,
      addNoticeForm: {
        title: '',
        content: ''
      },
      addNoticeFormRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, message: '字数不小于5个字', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getNoticeListByPage(type) {
      this.tableLoading = true;
      post('/api/homeOwner/getNotice', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.noticeList = res.data.list;
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
    addNotice() {
      this.$refs['addNoticeForm'].validate((valid) => {
        if (valid) {
          post('/api/homeOwner/addNotice', {
            title: this.addNoticeForm.title,
            content: this.addNoticeForm.content
          }).then(res => {
            if (res.status == "success") {
              this.dialogLoading = false;
              this.getNoticeListByPage('page');
              this.addNoticeDialogFormVisible = false;
              this.$message.success('添加通知成功');
            } else {
              this.dialogLoading = false;
              this.addNoticeDialogFormVisible = false;
              this.$message.error(res.data.errMsg);
            }
          }).catch(err => {
            this.dialogLoading = false;
            this.addNoticeDialogFormVisible = false;
            this.$message.error('网络错误！');
          });
        }
      });
    },
    deleteNotice(index, row) {
      this.$confirm('请确认是否要删除此公告？（删除操作不可恢复）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        post('/api/homeOwner/deleteNotice', {noticeId: row.noticeId}).then(res => {
          if(res.status == "success") {
            this.tableLoading = false;
            this.noticeList.splice(index, 1);
            this.$message.success('删除成功');
          } else {
            this.tableLoading = false;
            this.$message.error(res.data.errMsg);
          }
        }).catch(err => {
          this.tableLoading = false;
          this.$message.error('网络错误！');
        });
      });
    }
  },
  created() {
    this.tableLoading = true;
    post('/api/homeOwner/getNotice', {pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
      if(res.status == "success") {
        this.noticeList = res.data.list;
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
