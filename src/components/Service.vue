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
    <el-button type="primary" icon="el-icon-search" @click="getServiceCostListByPage('search')">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="addServiceCostDialogFormVisible = true">添加账单</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="ServiceCostList"
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
        prop="month"
        label="计费时间">
        <template slot-scope="scope">
          <span>{{scope.row.year + "年" + scope.row.month + "月"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="业主姓名">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="cost"
        label="账单费用">
        <template slot-scope="scope">
          <span>{{scope.row.cost/100 + "元"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status==0?"未缴费":"已缴费"}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0"
            size="mini"
            type="danger"
            @click="deleteServiceCostRecord(scope.$index, scope.row)">删除</el-button>
          <el-button v-else
             size="mini"
             type="danger"
             disabled
             @click="deleteServiceCostRecord(scope.$index, scope.row)">删除</el-button>
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
      @current-change="getServiceCostListByPage('page')">
    </el-pagination>
    <el-dialog title="添加账单" :visible.sync="addServiceCostDialogFormVisible" width="350px">
      <el-form ref="addAccountForm" :model="addServiceCostForm" :rules="addServiceCostFormRules" v-loading="dialogLoading" label-position="left" label-width="70px">
        <el-form-item label="楼幢号" prop="buildingNum">
          <el-select v-model="addServiceCostForm.buildingNum" clearable placeholder="请选择楼幢数" style="width: 200px">
            <el-option
              v-for="item in buildings"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNum">
          <el-input v-model="addServiceCostForm.roomNum" autocomplete="off" style="width: 200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="addServiceCostForm.time"
            type="month"
            value-format="yyyy-MM"
            placeholder="点击选择"
            style="width: 200px">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addServiceCostDialogFormVisible = false;this.addServiceCostForm = {};this.dialogLoading = false;">取 消</el-button>
        <el-button type="primary" @click="addServiceCostRecord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {post} from "../utils/request";

export default {
  name: "Service",
  data () {
    return {
      tableHeight: 1000,
      ServiceCostList: [],
      addServiceCostForm: {},
      tableLoading: false,
      dialogLoading: false,
      addServiceCostDialogFormVisible: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      buildingNum: null,
      roomNum: null,
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
      addServiceCostFormRules: {
        buildingNum: [
          { required: true, message: '请选择楼幢号', trigger: 'blur' }
        ],
        roomNum: [
          { required: true, message: '请输入房间号', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getServiceCostListByPage(type) {
      this.tableLoading = true;
      if(type == 'search'){
        this.pageNum = 1;
      }
      post('/api/serviceCost/getServiceCostRecordAdmin', {buildingNum: this.buildingNum, roomNum: this.roomNum, pageNum: this.pageNum, pageSize: this.pageSize}).then(res => {
        if(res.status == "success") {
          this.ServiceCostList = res.data.list;
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
    deleteServiceCostRecord(index, row) {
      this.$confirm('请确认是否要删除此条账单？（删除操作不可恢复）', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        post('/api/serviceCost/deleteServiceCostRecord', {costId: row.costId}).then(res => {
          if (res.status == "success") {
            this.ServiceCostList.splice(index, 1);
            this.$message.success('删除成功');
          } else {
            this.$message.error(res.data.errMsg);
          }
        }).catch(err => {
          this.$message.error('网络错误！');
        });
      });
    },
    addServiceCostRecord() {
      this.$refs['addAccountForm'].validate((valid) => {
        if (valid) {
          this.dialogLoading = true;
          let arr = this.addServiceCostForm.time.split("-");
          let year = arr[0];
          let month = arr[1];
          post('/api/serviceCost/addServiceCostRecord', {
            year: year,
            month: month,
            buildingNum: this.addServiceCostForm.buildingNum,
            roomNum: this.addServiceCostForm.roomNum
          }).then(res => {
            if (res.status == "success") {
              this.addServiceCostDialogFormVisible = false;
              this.getServiceCostListByPage('search');
              this.$message.success('添加成功');
            } else {
              this.addServiceCostDialogFormVisible = false;
              this.$message.error(res.data.errMsg);
            }
          }).catch(err => {
            this.addServiceCostDialogFormVisible = false;
            this.$message.error('网络错误！');
          });
          this.dialogLoading = false;
          this.addServiceCostForm = {};
        }
      });
    }
  },
  created() {
    this.getServiceCostListByPage('search');
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
