<template>
  <div>
    <el-table
      :data="managerAccounts"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="adminName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phoneNum"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roles"
        label="权限"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag v-for="(role, i) in scope.row.roles" :key="i"
            :type="role === '系统管理员' ? 'primary' : 'success'"
                  style="margin: 0px 2px"
            disable-transitions>{{ role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">管理权限</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">封禁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ManagerAccount",
  data () {
    return {
      managerAccounts: [
        {
          adminName: 'admin',
          email: '312314@qq.com',
          phoneNum: '12335980223',
          status: '正常',
          roles: ['系统管理员','小区管理员']
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
