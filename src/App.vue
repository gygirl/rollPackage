<template>
  <HelloWorld @sendPackagesTree="toShowPackagesTree" @sendLoading="toShowLoading"/>
  <DependTree :message="showPackagesTree" :loading="showLoading"/>
</template>

<script>
import HelloWorld from './components/SelectNpm.vue'
import DependTree from './components/DependTree.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    DependTree
  },
  data(){
    return {
      showPackagesTree:'',
      showLoading:''
    }
  },
  methods:{
  toShowPackagesTree(data){
  console.log("父亲监听到了=="+data);
  this.showPackagesTree =data;
  },
  toShowLoading(data){
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
