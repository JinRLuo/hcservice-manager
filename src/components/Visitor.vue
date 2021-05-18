<template>
  <div>
    <el-input v-model="searchVisitor" placeholder="查找访客" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getVisitorListByPage('search')">搜索</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="visitorList"
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        prop="visitorName"
        label="访客姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="peopleCount"
        label="人数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="room"
        label="来访地点"
        width="180">
        <template slot-scope="scope">
          <span>{{scope.row.buildingNum + "幢" + scope.row.roomNum + "房"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="visitingReason"
        label="来访原因">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="visitTime"
        label="访问时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0"
            size="mini"
            @click="confirmed(scope.$index, scope.row)">确认到达</el-button>
          <span v-else>已到达</span>
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
      @current-change="getVisitorListByPage('page')">
    </el-pagination>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Visitor",
  data () {
    return {
      tableHeight: 1000,
      visitorList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      searchVisitor: '',
    }
  },
  methods: {
    getVisitorListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/visit/getRecordAdmin', {search: this.searchVisitor, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.visitorList = res.data.list;
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
    confirmed(index, row) {
      post('/api/visit/confirmed', {visitorId: row.visitorId}).then(res => {
        if(res.status == "success") {
          this.visitorList[index].status = 1;
          this.$message.success('已确认到达');
        } else {
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.$message.error('网络错误！');
      });
    }
  },
  created() {
    this.getVisitorListByPage('search');
  },
  mounted:function(){
    this.$nextTick(function () {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      let self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 100;
      }
    })
  }
}
</script>

<style scoped>

</style>
