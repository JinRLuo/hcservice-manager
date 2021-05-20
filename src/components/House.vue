<template>
  <div>
    <el-select v-model="buildingNum" clearable placeholder="请选择楼幢数" style="margin: 0 0 20px 0; width: 150px">
      <el-option
        v-for="item in buildings"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="roomNum" placeholder="请输入房间号" style="width: 150px" clearable></el-input>
    <el-button type="primary" icon="el-icon-search" @click="getRoomListByPage('search')">搜索</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="roomList"
      :height="tableHeight"
      style="width: 100%">
      <el-table-column
        prop="roomNum"
        label="房产">
        <template slot-scope="scope">
          <span>{{scope.row.buildingNum + "幢" + scope.row.roomNum + "房"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="area"
        label="面积">
        <template slot-scope="scope">
          <span>{{scope.row.area + '平方米'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="业主姓名">
      </el-table-column>
      <el-table-column
        prop="credentialType"
        label="证件类型">
      </el-table-column>
      <el-table-column
        prop="credentialNum"
        label="证件号">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status==0?"未绑定":"已绑定"}}</span>
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
      @current-change="getRoomListByPage('page')">
    </el-pagination>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "House",
  data() {
    return {
      tableHeight: 1000,
      tableLoading: false,
      buildingNum: null,
      roomNum: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      roomList: [],
      buildings: [
        {value: 1, label: '1幢'},
        {value: 2, label: '2幢'},
        {value: 3, label: '3幢'},
        {value: 4, label: '4幢'},
        {value: 5, label: '5幢'},
        {value: 6, label: '6幢'},
        {value: 7, label: '7幢'},
        {value: 8, label: '8幢'},
        {value: 9, label: '9幢'},
        {value: 10, label: '10幢'}
      ],
    }
  },
  methods: {
    getRoomListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/homeOwner/getRoomListAdmin', {buildingNum: this.buildingNum, roomNum: this.roomNum, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.roomList = res.data.list;
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
    this.getRoomListByPage('search');
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
