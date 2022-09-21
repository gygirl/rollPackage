<template>
  <QueryNpm @sendPackagesTree="toShowPackagesTree" @sendLoading="toShowLoading"/>
  <DependTree :message="showPackagesTree" :loading="showLoading" v-show="isShow"/>
</template>

<script>
import QueryNpm from './components/QueryNpm.vue'
import DependTree from './components/DependTree.vue'

export default {
  name: 'App',
  components: {
    QueryNpm,
    DependTree
  },
  data(){
    return {
      showPackagesTree:'',
      showLoading:'',
      isShow:true
    }
  },
  methods:{
  toShowPackagesTree(data){
    if(JSON.stringify(data) === '{}'){
       this.isShow=false;
     }else{
      this.isShow=true;
  }
  console.log("父亲监听到了=="+data);
  this.showPackagesTree =data;
  },
  toShowLoading(data){
  this.isShow=true;
  this.showLoading =data;
  }

  }
}
</script>

<style>
#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
