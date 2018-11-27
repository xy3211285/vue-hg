<template>
  <div class="about-content">
    <div style="height:240px;padding-top:100px;overflow:hidden;">
      <img src="../../static/images/4.jpg"/>
    </div>
    <section class="map-section">
      <div class="info">
        <div class="photo">
          <img src="../../static/images/beijing.jpg"/>
        </div>
      </div>
      <div class="map">
        <el-input
          type="textarea"
          disabled
          autosize
          resize="none"
          style="width:94%;"
          v-model="companyIntroduction">
        </el-input>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutHG',
  data () {
    return {
      companyIntroduction:""
    }
  },
  mounted(){
     this.getCompanyInfo()
  },
  methods:{
    getCompanyInfo(){
      this.$axios.post('/article/user/getCompanyInfo?number=01').then(res=> {
        //var reg = new RegExp( '<br/>' , "g" );
        //let content = res.data.data.companyIntroduction.replace(reg, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        this.companyIntroduction = res.data.data.companyIntroduction;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .about-content{
    min-height:834px;
    background: #eee;
    .map-section {
      width:80%;
      display:flex;
      margin: 20px auto;
      background: #fff;
      font-size: 18px;
      line-height: 36px;
      color:#333;
      text-align: left;
      .info {
        flex:1.5;
        padding:20px;
        .photo img{
          width:100%;
        }
        p {
          font-size: 18px;
          margin-top:30px;
        }
      }
      .map {
        flex:3;
        padding:20px;
        text-indent: 2em;
      }
    }
  }
</style>
<style>
  .el-textarea.is-disabled .el-textarea__inner {
    border: none!important;
    font-size: 22px!important;
    line-height: 34px!important;
    color:#333!important;
    background: #fff!important;
    cursor: inherit!important;
  }
</style>
