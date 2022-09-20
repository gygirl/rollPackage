<template>
  npm包名：<input type="text" v-model="npmValue" required='true'/>&nbsp;&nbsp; 版本号：<input
    type="text"
    v-model="npmVersion"
  />&nbsp;&nbsp;
  <button @click="searchInfo">查询</button>
</template>

<script>
import _ from 'lodash';
export default {
  name: "HelloWorld",  
  data() {
    return {
      npmValue: "",
      npmVersion: "",
    };
  },
  methods: {
    searchInfo() {
      this.$emit('sendLoading',1);
      let name=this.npmValue;
      let version=this.npmVersion?this.npmVersion:'latest';
      let queue = [{name,version}];
      let result = {};
      function iterate(axios,emit){
        let obj = queue.shift();
        console.log(JSON.stringify(queue));
        axios.get('/'+obj.name+'/'+obj.version).then((res)=>{
          if(res.status===200){
             if (res.data.dependencies) {
          let keys = Object.keys(res.data.dependencies);
          keys.forEach(function(key, i) {
            queue.push({
              name: key,
              version: checkVersion(res.data.dependencies[key]),
              path: obj.path ? obj.path + '.' + `children[${i}]` : `children[${i}]`
            })
          });
        }
        if (obj.path) {
          _.set(result, obj.path, obj);
        } else {
          result = obj;
        }
        if (queue.length) {
          iterate(axios,emit);
        }else {
          console.log("最后返回结果=="+JSON.stringify(result));
          //传递数据给DependTree组件用于页面展示
          emit('sendPackagesTree', JSON.stringify(result) ); 
          emit('sendLoading',0);
         }
        }
        }).catch((err) => {
          console.log("错误"+err);
          emit('sendPackagesTree'); 
        });
      }
      iterate(this.axios,this.$emit)
   

    },
  },
};
//版本号判断
function checkVersion(tempVersion){
  var version;
  if(!tempVersion.indexOf('^')||!tempVersion.indexOf('~')){
    version=tempVersion.slice(1)
  }else if(!tempVersion.indexOf('>=')){
   version=tempVersion.slice(2)
  }else if('*'===tempVersion){
   version='';
  }else{
   version=tempVersion
  }
return version;
}
// function changeToTree(data){
//   let result={};
//    if(!Array.isArray(data)){
//      return result;
//    }
//    if(!data.length){
//      return result;
//    }
//    let map={};
//    data.forEach(item=>{
//     map[item.id]=item;
//    });
//    data.forEach(item=>{
//     let parent=map[item.parent];
//     if(parent){
//       (parent.children||(parent.children=[])).push(item);
//     }else{
//       result=item;
//     }
//    });
//    return result;
// }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
