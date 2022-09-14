<template>
  npm包名：<input type="text" v-model="npmValue">&nbsp;&nbsp;   
  版本号：<input type="text" v-model="npmVersion">&nbsp;&nbsp;
  <button @click="searchInfo">查询</button>
</template>

<script>

export default {
  name: "HelloWorld",
  data: () => {
    return {
      npmValue:"vue",
      npmVersion:"1.0.0"
    };
  },
  methods: {
    searchInfo() {
      
      
    },
  },
};
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
