<template>
  <div>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="complaintList"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="adminName"
        label="投诉类型">
      </el-table-column>
      <el-table-column
        prop="email"
        label="投诉内容">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="投诉时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="手机号">
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 10px 0;text-align: center"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      @current-change="getComplaintListByPage('page')">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Complaint",
  data () {
    return {
      complaintList: '',
      tableHeight: 1000,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false
    }
  },
  methods: {
    getComplaintListByPage(type) {

    }
  },
  created() {

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
}
</script>

<style scoped>

</style>
