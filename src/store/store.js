/**
 * Created by 陈星 on 2018/11/6.
 */
import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex);
const store = new vuex.Store({
  state:{
    headerType:1,
    menuIndex:1
  },
  mutations:{
    changeHeaderType(state,data){
      state.headerType=data;
    },
    changeMenuIndex(state,data){
      state.menuIndex=data;
    }
  },
  action:{
    commitHeaderType:({commit},headerType)=>commit('changeHeaderType',headerType)
  }
})
export default store;
