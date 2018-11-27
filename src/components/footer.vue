<template>
  <div class="footer-content">
    <section class="foot">
      <ul>
        <li><a @click="routerLink('AboutHG',2)">关于海伯高斯</a></li>
        <li><a @click="routerLink('OwerTeam',3)">我们的团队</a></li>
        <li><a @click="routerLink('OwerWork',4)">我们的专注领域</a></li>
        <li><a @click="routerLink('SuccessOffer',5)">我们的成功职位</a></li>
        <!--<li><a @click="routerLink('JoinUs',6)">加入海伯高斯</a></li>-->
        <li><a @click="routerLink('ContactUs',7)">联系我们</a></li>
      </ul>
      Copyright © 2014  海伯高斯管理咨询（北京）有限公司   版权所有京ICP备13033918号-1
    </section>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
    }
  },
  computed:{
  },
  methods:{
    routerLink(router,index){
      this.$router.push({path: '/' + router});
      this.$store.commit('changeMenuIndex', index);
      if(index==1){
        this.$store.commit('changeHeaderType', 1);
      }else{
        this.$store.commit('changeHeaderType',2);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .footer-content {
    position: relative;
    .foot {
      width: 100%;
      height: 95px;
      background: #191919;
      line-height: 35px;
      color: #FFFFFF;
      text-align: center;
      padding-top: 20px;
      position: relative;
    }
    .foot li {
      display:inline-block;
      margin-right: 20px;
    }

    .foot a {
      color: #FFFFFF;
    }

    .foot span {
      margin-left: 15px;
      margin-right: 15px;
    }

  }
</style>
