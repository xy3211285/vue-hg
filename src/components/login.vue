<template>
  <div class="login-content">
    <header class="header">
      <div class="opacity-bg"></div>
    </header>
    <section class="content">
      <div>
        <p class="title">Holle,  Welcom  To  HG</p>
        <p class="center-title">海伯高斯后台管理中心</p>
        <div class="login-wrap">
          <el-form :model="userForm" :rules="rules" ref="userForm" label-width="50px" class="demo-ruleForm">
            <el-form-item label="账号" prop="userName">
              <el-input v-model.trim="userForm.userName" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model.trim="userForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:362px" @click="login()">登   录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <footer>
         海伯高斯管理咨询有限公司版权所有
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'));
      } else {
        if (value !== 'admin') {
          callback(new Error('账号不存在'));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
        if (value !== 'admin') {
          callback(new Error('密码有误'));
        }
      }
    };
    return {
      userForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    }
  },
  mounted(){
     $('.header-content,.footer-content').hide();
  },
  methods:{
    login() {
      if(!!this.userForm.userName&&this.userForm.userName=='admin'
        &&!!this.userForm.password&&this.userForm.password=='admin'){
        this.$router.push({path: '/Admin'});
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .login-content{
    min-height: 960px;
    background: #eeeeee;
     .header {
       position: relative;
       height:560px;
       background: url("../../static/images/header-bg.png") no-repeat;
       background-size: cover;
       .opacity-bg {
         height:100%;
         background:#46a4fd;
         opacity: .6;
       }
     }
    .content{
      position: absolute;
      width:100%;
      top: 0;
      color: #fff;
      >div {
        width:800px;
        margin:0 auto;
        text-align: center;
        .title {
          font-size: 60px;
          margin-top:190px;
        }
        .center-title {
          font-size: 30px;
          margin-top: 100px;
        }
        .login-wrap {
          width:412px;
          height:152px;
          margin:30px auto;
          background: rgba(255,255,255,.6);
          border-radius: 6px;
          padding:40px;
        }
      }
    }
    footer {
      width:100%;
      position: fixed;
      bottom:40px;
      text-align: center;
      color:#294e70;
    }
  }
</style>
