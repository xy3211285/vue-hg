<template>
  <div class="contact-content">
    <div style="height:240px;padding-top:100px;overflow:hidden;">
      <img src="../../static/images/4.jpg"/>
    </div>
    <section class="map-section">
      <div class="info">
        <div class="photo">
          <img src="../../static/images/beijing.jpg"/>
        </div>
        <p>电话：0086-010-56071755</p>
        <p>邮箱：hr@hyper-g.com.cn</p>
        <p>北京地址：朝阳区光华路7号汉威大厦B座1618</p>
      </div>
      <div class="map">
        <div id="allmapBj" style="height:600px"></div>
      </div>
    </section>
    <section class="map-section">
      <div class="info">
        <div class="photo">
          <img src="../../static/images/shanghai.jpg"/>
        </div>
        <p>电话：0086-021-61993651</p>
        <p>邮箱：hr@hyper-g.com.cn</p>
        <p>上海地址： 浦东新区浦东南路999号新梅联合广场一期15A </p>
      </div>
      <div class="map">
      <div id="allmapSh" style="height:600px"></div>
      </div>
    </section>
    <section class="map-section" >
      <div class="info">
        <div class="photo">
          <img src="../../static/images/shenzheng.jpg"/>
        </div>
        <p>电话：0086-0755-33209962</p>
        <p>邮箱：hr@hyper-g.com.cn</p>
        <p>深圳地址： 南山区桃园路田厦国际中心A座805B</p>
      </div>
      <div class="map">
      <div id="allmapSz" style="height:600px"></div>
      </div>
    </section>

  </div>
</template>

<script>
  import BMap from 'BMap';
export default {
  name: 'ContactUs',
  components: { BMap },
  data () {
    return {}
  },
  mounted(){
    window.map = null;
    this.map_init('allmapBj',116.461258,39.919743);
    this.map_init('allmapSh',121.522762,31.235387);
    this.map_init('allmapSz',113.932661,22.538709);
  },
  methods: {
    map_init(id, lng, lat) {
      map = new BMap.Map(id);
      // 第1步：设置地图中心点，当前城市
      var point = new BMap.Point(lng, lat);
      // 第2步：初始化地图,设置中心点坐标和地图级别。
      map.centerAndZoom(point, 16);
      // 第3步：启用滚轮放大缩小
      map.enableScrollWheelZoom(true);
      // 第4步：向地图中添加缩放控件
      var ctrlNav = new window.BMap.NavigationControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
      });
      map.addControl(ctrlNav);
      // 第5步：向地图中添加缩略图控件
      var ctrlOve = new window.BMap.OverviewMapControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        isOpen: 1
      });
      map.addControl(ctrlOve);
      // 第6步：向地图中添加比例尺控件
      var ctrlSca = new window.BMap.ScaleControl({
        anchor: BMAP_ANCHOR_BOTTOM_LEFT
      });
      map.addControl(ctrlSca);
      var marker = new BMap.Marker(point); //将点转化成标注点
      map.addOverlay(marker);  //将标注点添加到地图上
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .contact-content {
    min-height:854px;
    background: #eee;
    text-align: center;
    .map-section {
      width:80%;
      display:flex;
      margin: 20px auto;
      .info {
        flex:1.5;
        background: #fff;
        margin-right: 20px;
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
        background: #fff;
        padding:20px;
      }
    }
  }
</style>
