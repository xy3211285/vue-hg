<template>
  <div class="about-content">
    <div style="height:240px;padding-top:100px;overflow:hidden;">
      <img src="../../static/images/4.jpg"/>
    </div>
    <section class="map-section" v-for="(item,i) in personInfo">
      <div class="info">
        <div class="photo">
         <!-- <img src="../../static/images/beijing.jpg"/>-->
          <img :src="'http://39.98.60.58:8080'+item.imageUrl"/>
        </div>
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
        <p> {{item.offer}}</p>
      </div>
      <div class="map">
        <el-input
          type="textarea"
          disabled
          autosize
          resize="none"
          style="width:94%;"
          v-model="item.info">
        </el-input>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OwerTeam',
  data () {
    return {
      personInfo:[]
    }
  },
  created(){
  },
  mounted(){
     this.getUserInfo();
  },
  methods:{
    getUserInfo(){
      let that = this;
      this.$axios.post('/article/user/getUserInfo').then(res=> {
        that.personInfo = res.data.data;
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
        flex:1;
        padding:20px;
        .photo img{
          width:100%;
        }
        p {
          font-size: 18px;
          line-height:30px;
          text-align: center;

        }
      }
      .map {
        flex:3;
        padding:20px;
        p {
          text-indent: 2em;
        }
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
