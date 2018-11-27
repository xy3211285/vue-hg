<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data(){
    return{}
  },
  computed:{
  },
  mounted(){

  },
  methods:{

  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
ul,li {
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
