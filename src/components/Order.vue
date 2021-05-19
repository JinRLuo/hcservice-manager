<template>
<div>
  <el-input v-model="search" placeholder="查找订单号" clearable style="width: 200px;margin: 0 0 20px 0"></el-input>
  <el-button type="primary" icon="el-icon-search" @click="getOrderListByPage('search')">搜索</el-button>
  <el-table
    v-loading="tableLoading"
    ref="table"
    :data="orderList"
    :height="tableHeight"
    style="width: 100%">
    <el-table-column
      prop="orderId"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="type"
      label="订单类型"
      width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.type=='park'">停车费</span>
        <span v-else>物业费</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="chargeName"
      label="缴费类型"
      width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.chargeName=='month-park'">月卡</span>
        <span v-else-if="scope.row.chargeName=='half-year-park'">半年卡</span>
        <span v-else-if="scope.row.chargeName=='year-park'">年卡</span>
        <span v-else>物业费</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="orderPrice"
      label="订单金额"
      width="180">
      <template slot-scope="scope">
        <span>{{scope.row.orderPrice/100 + "元"}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建时间">
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
      label="订单状态"
      width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.status==0">未支付</span>
        <span v-else>支付成功</span>
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
    @current-change="getOrderListByPage('page')">
  </el-pagination>
</div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Order",
  data() {
    return {
      tableHeight: 1000,
      orderList: [],
      tableLoading: false,
      search: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,

    }
  },
  methods: {
    getOrderListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/order/getOrderList', {search: this.search, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.orderList = res.data.list;
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
  },
  created() {
    this.getOrderListByPage('search');
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
