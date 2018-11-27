<template>
  <div>
    <header style="text-align: left;margin-bottom: 20px">
      <el-button type="primary" style="width:120px" @click="addFocusArea()">添    加</el-button>
      <el-button type="primary" style="width:120px" @click="deleteFieldInfo()">批量删除</el-button>
    </header>
    <el-table
      :data="tableDataArea"
      style="width: 100%"
      height="700px"
      @select-all="selectAllField"
      @select="selectField">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="imagePath"
        label="图片"
        width="160">
        <template slot-scope="scope">
          <div>
            <img style="width:60px;height:60px;" :src="'http://39.98.60.58:8080'+scope.row.imagePath"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="field"
        label="专注领域"
        width="300">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="具体信息">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <div class="formate">
            <span style="color:#0177d5;cursor:pointer;"  @click="updateField(scope.row)">修改</span>
            <span style="color:#0177d5;cursor:pointer;" @click="deleteFieldInfo(scope.row.id)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--添加领域弹窗-->
    <el-dialog
      title="添加专注领域"
      :visible.sync="dialogVisibleArea"
      width="50%">
      <div>
        <el-form :model="areaForm" ref="areaForm" label-width="70px" class="demo-ruleForm">
          <el-form-item label="图片" style="display: block">
            <input type="file" id="img01" @change ="uploadFile01('img01')"/>
          </el-form-item>
          <el-form-item label="领域" prop="field">
            <el-input type="text" style="width:808px" v-model.trim="areaForm.field" placeholder="请输入领域"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="detail">
            <el-input style="width:808px;min-height: 200px" type="textarea" v-model.trim="areaForm.detail" autosize resize="none" placeholder="请输入简介"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleArea = false">取 消</el-button>
        <el-button type="primary" @click="saveFieldInfo()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改专注领域"
      :visible.sync="dialogVisibleAreaChange"
      width="50%">
      <div>
        <el-form :model="changeFieldInfo" ref="changeFieldInfo" label-width="70px" class="demo-ruleForm">
          <el-form-item label="图片" style="display: block">
            <input type="file" id="img02" @change ="uploadFile02('img02')"/>
          </el-form-item>
          <el-form-item label="领域" prop="field">
            <el-input type="text" style="width:808px" v-model.trim="changeFieldInfo.field" placeholder="请输入领域"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="detail">
            <el-input style="width:808px;min-height: 200px" type="textarea" v-model.trim="changeFieldInfo.detail" autosize resize="none" placeholder="请输入简介"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAreaChange = false">取 消</el-button>
        <el-button type="primary" @click="updateFieldInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AdminField',
  data () {
    return {
      dialogVisibleArea:false,
      tableDataArea:[

      ],
      areaForm:{
        field:"",
        detail:'',
        imagePath:null,
      },
      changeFieldInfo:{},
      dialogVisibleAreaChange:false,
      ids:[]
    }
  },
  mounted(){
     this.getFieldInfo();
  },
  methods:{
    selectAllField(selection){
      this.ids = selection.map(x=>x.id);
    },
    selectField(selection){
      this.ids = selection.map(x=>x.id);
    },
    uploadFile01(id){
      var formData = new FormData();
      formData.append("img", $("#"+id)[0].files[0]);
      this.$axios.post('/article/user/uploadImg',formData).then(res=> {
        this.areaForm.imagePath= res.data.path;
      });
    },
    uploadFile02(id){
      var formData = new FormData();
      formData.append("img", $("#"+id)[0].files[0]);
      this.$axios.post('/article/user/uploadImg',formData).then(res=> {
        this.changeFieldInfo.imagePath= res.data.path;
      });
    },
    //添加领域
    addFocusArea(){
      this.dialogVisibleArea=true;
    },
    saveFieldInfo(){
      this.$axios.post('/article/user/saveFieldInfo',this.areaForm).then(res=> {
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
          this.getFieldInfo();
        }
        this.dialogVisibleArea=false;
      });
    },
    getFieldInfo(){
      this.$axios.post('/article/user/getFieldInfo').then(res=> {
        this.tableDataArea = res.data.data;
      });
    },
    deleteFieldInfo(id){
      let ids = [];
      if(id){
        ids.push(id)
      }else{
        ids = this.ids;
      }
      this.$axios.post('/article/user/deleteFieldInfo?ids='+ids).then(res=> {
        if(res.data.result=='failed'){
          this.$message({
            message: '删除专注领域信息失败,服务异常！',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '删除专注领域信息成功！',
            type: 'success'
          });
          this.getFieldInfo();
        }
      });
    },
    updateField(item){
      this.dialogVisibleAreaChange = true;
      this.changeFieldInfo = item;
    },
    updateFieldInfo(){
      this.$axios.post('/article/user/updateFieldInfo',this.changeFieldInfo).then(res=> {
        if(res.data.result=='failed'){
          this.$message({
            message: '修改失败,服务异常！',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.getFieldInfo();
        }
        this.dialogVisibleAreaChange = false;
      });
    },
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
