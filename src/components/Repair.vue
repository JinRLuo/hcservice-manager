<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addAccountDialogFormVisible = true">添加账号</el-button>
    <el-table
      v-loading="tableLoading"
      ref="table"
      :data="repairList"
      :height="tableHeight"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="报修类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="报修时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status==true?"正常":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        label="图片"
        width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="submitRepairResult(scope.$index, scope.row)">填写维修结果</el-button>
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
    <el-dialog title="修改权限" :visible.sync="modifyAuthorityDialogFormVisible" width="650px">
      <el-transfer v-model="selectedAuthority" :data="allAuthority" v-loading="formLoading" :titles="['未拥有权限', '已拥有权限']"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyAuthorityDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyAuthority">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加账号" :visible.sync="addAccountDialogFormVisible" width="400px">
      <el-form ref="addAccountForm" :model="addAccountForm" :rules="addAccountFormRules" v-loading="dialogLoading" label-position="left" label-width="70px">
        <el-form-item label="账号" prop="adminName">
          <el-input v-model="addAccountForm.adminName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addAccountForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="addAccountForm.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span style="color: red">*初始密码为1234，请在首次登录后及时修改登录密码！</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAccountDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAccount">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Repair",
  data () {
    return {
      repairList: [],
      tableHeight: 1000,
      pageNum: 1,
      pageSize: 10,
      total: 0,
    }
  },
  methods: {
    getRepairListByPage(type) {

    },
    submitRepairResult(index, row){

    }
  }
}
</script>

<style scoped>

</style>
