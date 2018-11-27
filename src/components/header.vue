<template>
  <div class="header-content header-fixed" v-if="headerType==2">
    <header class="main-header">
          <div class="pull-left">
            <div class="logo">
               <a @click="routerLink('Index',1)"><img src="../../static/images/logo.png"/></a>
            </div>
          </div>
          <div class="pull-right">
            <ul class="navigation">
              <li :class="{'current':menuIndex==1}"><a @click="routerLink('Index',1)">首页</a></li>
              <li :class="{'current':menuIndex==2}"><a @click="routerLink('AboutHG',2)">关于海伯高斯</a></li>
              <li :class="{'current':menuIndex==3}"><a @click="routerLink('OwerTeam',3)">我们的团队</a></li>
              <li :class="{'current':menuIndex==4}"><a @click="routerLink('OwerWork',4)">我们的专注领域</a></li>
              <li :class="{'current':menuIndex==5}"><a @click="routerLink('SuccessOffer',5)">我们的成功职位</a></li>
              <!--<li :class="{'current':menuIndex==6}"><a @click="routerLink('JoinUs',6)">加入海伯高斯</a></li>-->
              <li :class="{'current':menuIndex==7}"><a @click="routerLink('ContactUs',7)">联系我们</a></li>
            </ul>
          </div>
    </header>
  </div>
  <div class="header-content" v-else>
    <header class="main-header" >
      <div class="pull-left">
        <div class="logo">
          <a @click="routerLink('Index',1)"><img src="../../static/images/logo_wite.png"/></a>
        </div>
      </div>
      <div class="pull-right">
        <ul class="navigation">
          <li :class="{'current':menuIndex==1}"><a @click="routerLink('Index',1)">首页</a></li>
          <li :class="{'current':menuIndex==2}"><a @click="routerLink('AboutHG',2)">关于海伯高斯</a></li>
          <li :class="{'current':menuIndex==3}"><a @click="routerLink('OwerTeam',3)">我们的团队</a></li>
          <li :class="{'current':menuIndex==4}"><a @click="routerLink('OwerWork',4)">我们的工作流程</a></li>
          <li :class="{'current':menuIndex==5}"><a @click="routerLink('SuccessOffer',5)">我们的成功职位</a></li>
          <!--<li :class="{'current':menuIndex==6}"><a @click="routerLink('JoinUs',6)">加入海伯高斯</a></li>-->
          <li :class="{'current':menuIndex==7}"><a @click="routerLink('ContactUs',7)">联系我们</a></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed:{
    headerType(){
      return this.$store.state.headerType;
    },
    menuIndex(){
      return this.$store.state.menuIndex;
    }
  },
  mounted(){
    let headerType =  window.localStorage.getItem('headerType');
    let menuIndex = window.localStorage.getItem('menuIndex');
    if(!!headerType){
      this.$store.commit('changeHeaderType', headerType);
      this.$store.commit('changeMenuIndex', menuIndex);
    }
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .header-content {
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 99;
    width:100%;
    .main-header {
      transition: all 500ms ease;
      display:flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
      .pull-right {
          ul {
            li {
              position: relative;
              float: left;
              margin-left: 28px;
              a {
                position:relative;
                display:block;
                font-size:16px;
                color:#fff;
                line-height:30px;
                font-weight:500;
                opacity: 1;
                text-transform:capitalize;
                padding:15px 0px;
                transition:all 500ms ease;
                text-decoration: none;
                outline: none;
                cursor: pointer;
              }
              a:hover {
                opacity: 0.6;
              }
              a:after {
                position: absolute;
                content: '';
                left: 0px;
                bottom: 6px;
                width: 100%;
                height: 2px;
                opacity: 0;
                background-color: #910000;
                transition: all 500ms ease;
              }
            }
            li.current,li:hover {
              a:after{
                opacity:1;
              }
            }
          }
       }
    }
  }
  .header-fixed{
    position: fixed;
    background: #fff;
    .main-header {
      .pull-right {
        ul {
          li {
            a {
              color:#434343;
            }
          }
        }
      }
    }
  }
</style>
