<template>
  <div class="admin-content">
    <header class="main-header">
      <div class="pull-left">
        <div class="logo" title="点击回到首页">
          <a @click="routerLink('Index',1)"><img src="../../static/images/logo_wite.png"></a>
        </div>
      </div>
      <div class="pull-right">
        Hi，欢迎您进入海伯高斯后台管理中心！！！
      </div>
    </header>
    <section>
      <div class="left-aide">
        <p>编辑列表</p>
        <ul class="menu">
          <li :class="{'active':activeIndex==1}" @click="changeTab(1)">公司简介</li>
          <li :class="{'active':activeIndex==2}" @click="changeTab(2)">公司团队</li>
          <li :class="{'active':activeIndex==3}" @click="changeTab(3)">专注领域</li>
          <li :class="{'active':activeIndex==4}" @click="changeTab(4)">成功职位</li>
          <li :class="{'active':activeIndex==5}" @click="changeTab(5)">合作品牌</li>
        </ul>

      </div>
      <div class="right-aide">
        <div class="activeIndex1" v-if="activeIndex==1">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入公司简介"
            v-model="companyIntroduction">
          </el-input>
          <footer>
            <el-button type="primary" style="width:120px" @click="saveCompanyInfo()">保   存</el-button>
          </footer>
        </div>
        <div class="activeIndex2" v-else-if="activeIndex==2">
          <header style="text-align: left;margin-bottom: 20px">
            <el-button type="primary" style="width:120px" @click="addUser()">添    加</el-button>
            <el-button type="primary" style="width:120px" @click="deleteUser()">批量删除</el-button>
          </header>
          <el-table
            :data="tableData"
            style="width: 100%"
            height="730px"
            @select-all="selectAllUser"
            @select="selectUser"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="imageUrl"
              label="头像"
              width="160">
              <template slot-scope="scope">
                <div>
                  <img style="width:60px;height:60px;" :src="'http://39.98.60.58:8080'+scope.row.imageUrl"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="level"
              label="级别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="dept"
              label="部门"
              width="120">
            </el-table-column>
            <el-table-column
              prop="offer"
              label="职位"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="100">
            </el-table-column>
            <el-table-column
              prop="tel"
              label="邮箱"
              width="280">
            </el-table-column>
            <el-table-column
              prop="info"
              label="简介">
            </el-table-column>
            <el-table-column
              label="操作"
              width="100">
              <template slot-scope="scope">
                <div class="formate">
                  <span @click="updateUser(scope.row)">修改</span>
                  <span @click="deleteUser(scope.row.id)">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else-if="activeIndex==3">
            <AdminField></AdminField>
        </div>
        <div v-else-if="activeIndex==4">
             <AdminSuccessOffer></AdminSuccessOffer>
        </div>
        <div v-else>
             开发中。。。。。。。
        </div>

      </div>
    </section>
    <!--添加用户弹窗-->
    <el-dialog
    title="添加团队成员"
    :visible.sync="dialogVisible"
    width="50%">
    <div>
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="70px" class="demo-ruleForm demo-form-inline">
        <el-form-item label="头像" style="display: block">
          <input type="file" id="img" @change ="uploadFile('img')"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name" style="display:inline-block;width: 48%">
          <el-input type="text" v-model.trim="userForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="offer" style="display:inline-block;width: 48%">
          <el-input type="text" v-model.trim="userForm.offer" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="级别" prop="level" style="display:inline-block;width: 48%">
          <el-select style="width:202px" v-model="userForm.level" placeholder="请选择">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="dept" style="display:inline-block;width: 48%">
          <el-input type="text" v-model.trim="userForm.dept" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="tel" style="display:inline-block;width: 48%">
          <el-input type="text" v-model.trim="userForm.tel" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="address" style="display:inline-block;width: 48%">
          <el-input type="text" v-model.trim="userForm.address" placeholder="请输入地点"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="info">
          <el-input style="width:808px;min-height: 200px" type="textarea" v-model.trim="userForm.info" autosize resize="none" placeholder="请输入成员简介"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserConform()">确 定</el-button>
      </span>
  </el-dialog>
    <!--更改用户弹窗-->
    <el-dialog
      title="更改成员信息"
      :visible.sync="dialogVisibleChange"
      width="50%">
      <div>
        <el-form :model="userFormChange" :rules="rules" ref="userFormChange" label-width="70px" class="demo-ruleForm demo-form-inline">
          <el-form-item label="头像" style="display: block">
            <input type="file" id="img03" @change ="uploadFile01('img03')"/>
          </el-form-item>
          <el-form-item label="姓名" prop="name" style="display:inline-block;width: 48%">
            <el-input type="text" v-model.trim="userFormChange.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="offer" style="display:inline-block;width: 48%">
            <el-input type="text" v-model.trim="userFormChange.offer" placeholder="请输入职位"></el-input>
          </el-form-item>
          <el-form-item label="级别" prop="level" style="display:inline-block;width: 48%">
            <el-select style="width:202px" v-model="userFormChange.level" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" prop="dept" style="display:inline-block;width: 48%">
            <el-input type="text" v-model.trim="userFormChange.dept" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="tel" style="display:inline-block;width: 48%">
            <el-input type="text" v-model.trim="userFormChange.tel" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="地点" prop="address" style="display:inline-block;width: 48%">
            <el-input type="text" v-model.trim="userFormChange.address" placeholder="请输入地点"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="info">
            <el-input style="width:808px;min-height: 200px" type="textarea" v-model.trim="userFormChange.info" autosize resize="none" placeholder="请输入成员简介"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import AdminSuccessOffer from './adminSuccessOffer';
  import AdminField from './adminField';
export default {
  name: 'Admin',
  components:{
    AdminSuccessOffer,
    AdminField
  },
  data () {
    return {
      companyIntroduction:"",
      dialogVisible:false,
      activeIndex:1,
      companyInfo:"",
      pageSize:10,
      totalSize:0,
      tableData:[],
      fileList:[],
      userForm:{
        userId:"",
        name:"",
        level:"",
        dept:"",
        offer:"",
        address:'',
        tel:'',
        info:'',
        imageUrl:null,
        imageSrc:null
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
      },
      ids:[],
      dialogVisibleChange:false,
      userFormChange:{}
    }
  },
  mounted(){
    $('.header-content,.footer-content').hide();
    this.getCompanyInfo();
    this.getUserInfo();
  },
  destroyed(){
    $('.header-content,.footer-content').show();
  },
  methods:{
    routerLink(router,index){
      this.$router.push({path: '/' + router});
      this.$store.commit('changeMenuIndex', index);
    },
    changeTab(index){
      this.activeIndex = index;
    },
    //保存公司信息
    saveCompanyInfo(){
      this.$axios.post('/article/user/saveCompanyInfo',{
        companyIntroduction:this.companyIntroduction,
        name:'hg',
        companyNumber:'01',
      },{
        emulateJSON: true
      }).then(res=> {
        if(res.data.result=='success'){
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
        }else{
          this.$message({
            message: '保存失败，服务异常！',
            type: 'warning'
          });
        }
      });
    },
    //获取公司信息
    getCompanyInfo(){
      this.$axios.post('/article/user/getCompanyInfo?number=01').then(res=> {
        if(res.data.result=='success'){
          this.companyIntroduction = !!res.data.data.companyIntroduction?res.data.data.companyIntroduction:"";
        }else{
          this.$message({
            message: '查询公司信息失败，服务异常！',
            type: 'warning'
          });
        }

      });
    },
    //添加团队成员
    addUser(){
      this.dialogVisible=true;
    },
    addUserConform(){
      let userForm = this.userForm;
      if(!userForm.name){
        return;
      }
      this.$axios.post('/article/user/insertUserInfo',userForm,{
        emulateJSON: true
      }).then(res=> {
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
          this.getUserInfo();
        }
          this.dialogVisible=false;
      });
    },
    getUserInfo(){
      this.$axios.post('/article/user/getUserInfo').then(res=> {
          this.tableData = res.data.data;
      });
    },
    //删除团队成员
    deleteUser(id){
        let ids = [];
        if(id){
          ids.push(id)
        }else{
          ids = this.ids;
        }
      this.$axios.post('/article/user/deleteUserInfo?ids='+ids).then(res=> {
        if(res.data.result=='failed'){
          this.$message({
            message: '删除团队成员失败,服务异常！',
            type: 'warning'
          });
        }else{
          this.$message({
            message: '删除团队成员成功！',
            type: 'success'
          });
          this.getUserInfo();
        }
      });
    },
    selectAllUser(selection){
      this.ids = selection.map(x=>x.id);
    },
    selectUser(selection){
      this.ids = selection.map(x=>x.id);
    },
    uploadFile(id){
      var formData = new FormData();
      formData.append("img", $("#"+id)[0].files[0]);
      this.$axios.post('/article/user/uploadImg',formData).then(res=> {
        this.userForm.imageUrl= res.data.path;
      });
    },
    uploadFile01(id){
      var formData = new FormData();
      formData.append("img", $("#"+id)[0].files[0]);
      this.$axios.post('/article/user/uploadImg',formData).then(res=> {
        this.userFormChange.imageUrl= res.data.path;
      });
    },
    updateUser(item){
      this.dialogVisibleChange = true;
      this.userFormChange = item;
    },
    updateUserInfo(){
      let userForm = this.userFormChange;
      if(!userForm.name){
        return;
      }
      this.$axios.post('/article/user/updateUserInfo',userForm).then(res=> {
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
          this.getUserInfo();
        }
        this.dialogVisibleChange=false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .admin-content{
    background: #eeeeee;
    min-height:960px;
    .main-header {
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      height:50px;
      background: #0177d5;
      .pull-left {
        a {
          cursor:pointer;
          img {
            width:360px;
          }
        }
      }
      .pull-right {
        color:#fff;
      }
    }
    section {
      display:flex;
      .left-aide {
        width:200px;
        background: #282b33;
        margin:20px 0px;
        p {
          color:#999;
          font-size: 14px;
          line-height: 60px;
          text-align: left;
          border-bottom: solid 1px #666;
          padding-left: 14px;
        }
        .menu {
          padding-top:20px;
          li {
            height:40px;
            line-height: 40px;
            color:#fff;
            font-size: 14px;
            text-align: left;
            padding-left: 20px;
            cursor: pointer;
          }
          li.active {
            background: #393d49;
            border-left:solid 2px #0177d5;
          }
        }
      }
      .right-aide {
        width:100%;
        margin:20px;
        background: #fff;
        min-height:780px;
        max-height:830px;
        padding:20px;
        .el-table th {
          background: #eee;
        }
        .el-pagination {
          text-align: left;
          margin-top: 20px;
        }
        .activeIndex1 .el-textarea__inner {
          height: 600px !important;
        }
        .activeIndex2 {
          .formate {
            span {
              margin-right: 10px;
              color:#0177d5;
              cursor:pointer;
            }
          }
        }
        footer {
          margin-top: 40px;
        }
      }
    }
    .el-textarea__inner {
      min-height: 202px!important;
    }
  }
  .el-select {
    width:100% !important;
  }
  .el-select .el-input__inner {
    width:367px;
  }
</style>
