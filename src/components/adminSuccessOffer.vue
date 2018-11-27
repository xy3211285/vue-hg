<template>
  <div>
  <header style="text-align: left;margin-bottom: 20px">
    <el-button type="primary" style="width:120px" @click="dialogVisibleOffer = true">添    加</el-button>
    <el-button type="primary" style="width:120px" @click="deleteSuccessfulCase()">批量删除</el-button>
  </header>
  <el-table
    :data="tableDataOffer"
    style="width: 100%"
    height="730px"
    @select-all="selectAllCase"
    @select="selectCase">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="owner"
      label="负责人"
      width="300">
    </el-table-column>
    <el-table-column
      prop="successPosition"
      label="成功职位">
    </el-table-column>
    <el-table-column
      label="操作"
      width="180">
      <template slot-scope="scope">
        <div class="formate">
          <span style="color:#0177d5;cursor:pointer;" @click="deleteSuccessfulCase(scope.row.id)">删除</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
    <!--添加成功职位弹窗-->
    <el-dialog
      title="添加成功职位"
      :visible.sync="dialogVisibleOffer"
      width="50%">
      <div>
        <el-form :model="offerForm" ref="offerForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="负责人" prop="owner">
            <el-input type="text" style="width:756px" v-model.trim="offerForm.owner" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="成功职位" prop="successPosition">
            <el-input style="width:756px;" type="text" v-model.trim="offerForm.successPosition"  placeholder="请输入成功职位"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleOffer = false">取 消</el-button>
        <el-button type="primary" @click="saveSuccessfulCase()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'adminSuccessOffer',
  data () {
    return {
      pageSize:10,
      totalSize:0,
      dialogVisibleOffer:false,
      tableDataOffer:[

      ],
      offerForm:{
        owner:"",
        successPosition:''
      },
      ids:[]
    }
  },
  mounted(){
     this.getSuccessfulCase();
  },
  methods:{
    selectAllCase(selection){
      this.ids = selection.map(x=>x.id);
    },
    selectCase(selection){
      this.ids = selection.map(x=>x.id);
    },
    saveSuccessfulCase(){
      this.$axios.post('/article/user/saveSuccessfulCase',this.offerForm).then(res=> {
        if(res.data.result=='failed'){
          this.$message({
            message: '添加失败,服务异常！',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.getSuccessfulCase();
        }
        this.dialogVisibleOffer = false;
      });
    },
    getSuccessfulCase(){
      this.$axios.post('/article/user/getSuccessfulCase').then(res=> {
        this.tableDataOffer = res.data.data;
      });
    },
    deleteSuccessfulCase(id){
      let ids = [];
      if(id){
        ids.push(id)
      }else{
        ids = this.ids;
      }
      this.$axios.post('/article/user/deleteSuccessfulCaseByIds?ids='+ids).then(res=> {
        if(res.data.result=='failed'){
          this.$message({
            message: '删除职位失败,服务异常！',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '删除职位成功！',
            type: 'success'
          });
          this.getSuccessfulCase();
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .about-content{
    height:854px;
    background: url("../../static/images/HG.png") no-repeat;
    background-size: cover;
  }
</style>
