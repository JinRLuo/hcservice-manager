<template>
  <div>
    <el-input v-model="search" placeholder="查找账号" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getCarListByPage('search')">搜索</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="carList"
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        prop="plateNum"
        label="车牌号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="到期时间">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">
            外出中
          </span>
          <span v-else>
            停车中
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0"
            size="mini"
            type="primary"
            @click="modifyStatus(scope.$index, scope.row, 1)">进场</el-button>
          <el-button v-else
            size="mini"
            type="primary"
            @click="modifyStatus(scope.$index, scope.row, 0)">出场</el-button>
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
      @current-change="getCarListByPage('page')">
    </el-pagination>
  </div>
</template>

<script>
import {post} from "../utils/request";
import * as dayjs from "dayjs";

export default {
  name: "Car",
  data () {
    return {
      tableHeight: 1000,
      search: '',
      carList: [],
      tableLoading: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    getCarListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/car/getCarInfoAdmin', {search: this.search, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.carList = res.data.list;
          for(let i=0;i<this.carList.length;i++){
            let endTime = dayjs(this.carList[i].endTime);
            let now =  new Date();
            if (now > endTime){
              this.carList[i].endTime = '已过期';
            }
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
    modifyStatus(index, row, status) {
      post('/api/car/modifyCarStatus', {carId: row.carId, status: status}).then(res => {
        if(res.status == "success") {
          this.carList[index].status = status;
          this.$message.success('修改状态成功');
        } else {
          this.$message.error(res.data.errMsg);
        }
      }).catch(err => {
        this.$message.error('网络错误！');
      });
    }
  },
  created() {
    this.getCarListByPage('search');
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
