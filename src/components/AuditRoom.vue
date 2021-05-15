<template>
  <div>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="bindRequest"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="credentialType"
        label="证件类型"
        width="180">
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
        label="申请绑定房产">
        <template slot-scope="scope">
          <span>{{scope.row.buildingNum + "幢" + scope.row.roomNum + "房"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="申请时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="audit(scope.$index, scope.row, true)">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="audit(scope.$index, scope.row, false)">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "AuditRoom",
  data () {
    return {
      tableHeight: 1000,
      bindRequest: []
    }
  },
  methods: {
    audit(index, row, type) {
      let status,message;
      if(type) {
        status = 1;
        message = '已通过';
      }else {
        status = 2;
        message = '已驳回';
      }
      post('/api/homeOwner/auditBindRequest', {ownerId: row.ownerId, status: status}).then(res => {
        if(res.status == "success") {
          this.bindRequest.splice(index, 1);
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
    post('/api/homeOwner/getBindRequest', {}).then(res => {
      if(res.status == "success") {
        this.bindRequest = res.data;
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
