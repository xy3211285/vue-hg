<template>
  <div class="about-content">
     <div class="bg">
         <img src="../../static/images/swbg.jpg"/>
         <div class="mask"></div>
     </div>
    <div class="content">
         <div class="list">
           <span class="ic_time png"></span>
           <ul>
             <li v-for="(item,i) in offers" :key="i" :class="{'left_li':(i+1)%2==0,'right_li':(i+1)%2!=0}">
               <span :class="['ic_events',{'png':(i+1)%2==0}]">
                 <i class="png" v-if="(i+1)%2==0"></i>
               </span>
               <p class="txt_events"><strong>{{item.successPosition}}</strong></p>
             </li>
           </ul>
           <span class="ic_arr png"></span>
         </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessOffer',
  data () {
    return {
      offers:[

      ]
    }
  },
  mounted(){
    this.getSuccessfulCase()
  },
  methods:{
    getSuccessfulCase(){
      this.$axios.post('/article/user/getSuccessfulCase').then(res=> {
        this.offers = res.data.data;
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .about-content{
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      img {
        width:100%;
      }
      .mask {
        top: 0;
        left: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
      }
    }
    .content {
      position: relative;
      min-height: 800px;
      z-index: 9;
      padding-top: 150px;
      .list {
        li {
          position: relative;
          height: 58px;
        }
        .ic_time {
          display: block;
          background: url(../../static/images/ic_events.png) no-repeat -428px -30px;
          width: 38px;
          height: 68px;
          margin: 0 auto;
        }
        .ic_events {
          position: absolute;
          width: 51px;
          height: 58px;
          top: 0;
          overflow: hidden;
        }
        .right_li .ic_events {
          left: -7px;
          background: url(../../static/images/ic_events.png) no-repeat -396px -116px;
        }
        .left_li {
          text-align: right;
          width: 50%;
        }
        .left_li .ic_events {
          right: -7px;
        }
        .left_li .ic_events i {
          position: absolute;
          top: 0;
          right: 0;
          width: 51px;
          height: 98px;
          background: url(../../static/images/ic_events.png) no-repeat -460px -116px;
        }
        .right_li {
          margin-left: 50%;
        }
        .txt_events {
          font-size: 28px;
          line-height: 28px;
          color: #fff;
          position: absolute;
          white-space: nowrap;
        }
        .left_li .txt_events {
          right: 56px;
        }
        .right_li .txt_events {
          left: 56px;
        }
        .ic_arr {
          display: block;
          background: url(../../static/images/ic_events.png) no-repeat -476px -38px;
          width: 38px;
          height: 59px;
          margin: 0 auto;
          position: relative;
          top: -14px;
        }
      }
    }
  }
</style>
