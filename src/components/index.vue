<template>
  <div class="index-content">
    <section class="video-wrap">
      <video src="http://www.bo-le.com/assets/bl.mp4" style="width:100%" autoplay="true" loop="loop">
      </video>
      <div class="bg-mask"></div>
    </section>
    <section class="item-wrap">
      <div class="item" style="background: transparent;">
        <div class="col-md-4">
          <span>因为专业&nbsp;&nbsp;&nbsp;&nbsp;所以放心</span><br>
          <span class="hg">----------海伯高斯</span>
        </div>

      </div>
      <div class="item">
            <div class="col-md-2">关于海伯高斯 </div>
            <div class="col-md-8">
              <p>核心团队从2003年开始<br>
                专注于中高端人才搜寻的人力资源咨询服务<br>
                除北京总部外，上海、深圳、美国硅谷均有资深顾问配置<br>
                建立了全球的人才寻访网络<br>
                核心团队专注从事猎头行业多年<br>
                为客户提供最优的高端人才解决方案是我们奋斗的目标<br></p>
              <a class="btn" @click="routerLink('AboutHG',2)">更多关于海伯高斯</a>
            </div>
        </div>
      <div class="item">
        <div class="col-md-2">我们的优势 </div>
        <div class="col-md-8">
          <p>5年金融风控、量化分析、财务 CFO人才储备<br>
            5年 人工智能、大数据领域人才储备<br>
            10年 工业制造人才储备<br>
            10年 互联网平台领域人才储备<br>
            11年智能硬件领域人才深度沉淀<br></p>
          <a class="btn" @click="routerLink('ContactUs',7)">联系我们</a>
        </div>
      </div>
    </section>
    <section class="our-team">
      <div class="bg"></div>
        <p class="title">我们的团队</p>
        <p class="info">海伯高斯管理有限公司是一家专注于中高端人才搜寻的人力资源咨询服务公司</p>
        <p class="info">致力于为客户提供优质的中高端人才搜寻服务</p>
        <div class="content">
          <div v-for="(item,i) in teams" class="item" :key="i">
            <div class="photo">
              <img style="width:120px;" :src="'http://39.98.60.58:8080'+item.imageUrl">
            </div>
            <div class="name">{{item.name}}</div>
            <div class="info">{{item.offer}}</div>
          </div>
        </div>
      <a class="btn" @click="routerLink('OwerTeam',3)">进入团队</a>
    </section>
    <section>
      <Map></Map>
    </section>
    <!--<div class="map">-->
      <!--<div class="bg"></div>-->
    <!--</div>-->
    <section class="case-section">
      <p>他们选择了海伯高斯</p>
      <div class="content">
        <div class="item">
          <img src="../../static/images/dzdp.png" alt="">
        </div>
        <div class="item">
          <img src="../../static/images/lx.jpg" alt="">
        </div>
        <div class="item">
          <img src="../../static/images/mt.jpg" alt="">
        </div>
        <div class="item">
          <img src="../../static/images/sn.jpg" alt="">
        </div>
        <div class="item">
          <img src="../../static/images/sx.jpg" alt="">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import  Map from  './map.vue'
export default {
  name: 'Index',
  components:{
    Map
  },
  data () {
    return {
      teams:[]
    }
  },
  mounted(){
    window.addEventListener('scroll', this.handleScroll);
    this.getUserInfo();
  },
  methods:{
    routerLink(router,index){
      this.$router.push({path: '/' + router});
      this.$store.commit('changeMenuIndex', index);
      window.localStorage.setItem('menuIndex',index);
      if(index==1){
        this.$store.commit('changeHeaderType', 1);
        window.localStorage.setItem('headerType',1);
      }else{
        this.$store.commit('changeHeaderType',2);
        window.localStorage.setItem('headerType',2);
      }
    },
    handleScroll(){
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      if( t == 0 && this.$route.name == 'Index') {
        this.$store.commit('changeHeaderType', '1');
      } else {
        this.$store.commit('changeHeaderType', '2');
      }
    },
    getUserInfo(){
      this.$axios.post('/article/user/getUserInfo').then(res=> {
        this.teams = res.data.data.slice(0,4);

      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .index-content {
    text-align: center;
    .video-wrap {
      position: fixed;
      top:0;left:0;
      width:100%;
      .bg-mask {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.6);
     }
    }
    .item-wrap {
      position: relative;
      min-height:1070px;
      z-index:9;
      padding-top:350px;
      .item {
        display:flex;
        height:auto;
        width:1170px;
        margin:0 auto;
        text-align: left;
        padding: 40px 0px;
        margin-bottom:600px;
        .col-md-4 {
          flex:1;
          text-align: center;
          font-size: 60px;
          color:#fff;
          span {
            display: inline-block;
            padding: 20px;
          }
          .hg {
            font-size: 28px;
            font-weight: 500;
            float: right;
            margin-right: 200px;
            letter-spacing: 4px;
          }
        }
        .col-md-2 {
          flex:1;
          text-align: right;
          font-size: 28px;
          color: #fff;
          line-height: 46px;
        }
        .col-md-8 {
          flex:2;
          padding-left: 50px;
          p {
            height: 300px;
            color: #fff;
            font-size: 28px;
            line-height: 46px;
          }
          .btn {
            display:inline-block;
            border: 0;
            padding: 5px 18px 3px;
            font-size: 16px;
            height:30px;
            line-height: 30px;
            border-radius: 18px;
            color:#fff;
            background-color: #b31c27;
            cursor: pointer;
          }
        }
      }
    }
    .our-team {
      position: relative;
      height:630px;
      color:#fff;
     background: rgba(0,0,0,.6);
      .title {
        font-size: 46px;
        color:#fff;
        margin-bottom:20px;
        padding-top: 60px;
      }
      .info {
        color:rgba(255,255,255,.8);
        line-height: 30px;
      }
      .btn {
        display: inline-block;
        border: 0;
        padding: 5px 18px 3px;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        border-radius: 18px;
        color: #fff;
        background-color: #b31c27;
        cursor: pointer;
      }
      .content {
        width:1200px;
        margin:50px auto;
        display:flex;
        .item {
          flex:1;
          text-align: center;
          .photo {
            display: inline-block;
            width:120px;
            line-height: 120px;
            font-size: 40px;
            height:120px;
            border-radius:60px;
            background: url("../../static/images/feige.jpg");
            background-size: cover;
            margin-bottom: 30px;
            box-shadow: 0 0 10px 0px rgba(255,255,255,.1);
            overflow:hidden;
            img {
              margin-top: -16px;
            }
          }
          .name {
            font-size: 20px;
            font-weight:600;
          }
          .info {
            color:#fff;
          }
        }
      }
    }
    .map{
      height: 675px;
      background: #b31c27;
      font-size: 20px;
      color: rgb( 255, 255, 255 );
      line-height: 35px;
      text-align: right;
      transition: background .7s;
      background-position: -1200px bottom;
      width: 100%;
      overflow-x: hidden;
      position: relative;
      .bg{
        position: absolute;
        height: 100%;
        top:0;
        left: 0;
        z-index: 1;
        width:1200px;
        background: url("http://www.bo-le.com/assets/css/../img/Map_WAW-map.png") 0px top no-repeat;
        background-size: 150%;
      }
    }
    .case-section {
      position: relative;
      height:480px;
      background: #fff;
      >p {
        padding-top:60px;
        font-size:40px;
        line-height: 100px;
      }
      .content {
        display:flex;
        width:1170px;
        margin:0 auto;
        height:200px;
        align-items: center;
        >div {
          flex:1;
          margin:10px;
        }
      }
    }
  }

</style>
