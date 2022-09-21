<template>
  <div id="LBChart" style="width: auto;height: 400px" ></div>
</template>
<script>
import * as echarts from 'echarts';
let myChart;
export default {
     props: ['message','loading'],
     name: "DependTree",
     data(){return {};},
     watch:{
         message(data){
            console.log("我收到了="+data);
            if(JSON.stringify(data) === '{}'){
            alert('未查询到结果');
            }else{
            this.drawLine(data);
            }
         },
         loading(data){
           if(data){
           myChart.showLoading();
           }
           else{
           myChart.hideLoading();
           }
         }
     },
     mounted(){
         myChart = echarts.init(document.getElementById("LBChart"));
     },
     methods:{
         drawLine(ownchildmsg){
        // 基于准备好的dom，初始化echarts实例
         myChart.setOption({
         tooltip: {
         trigger: 'item',
         triggerOn: 'mousemove'
      },
         series: [
         {
            type: 'tree',
            data: [JSON.parse(ownchildmsg)],
             top: '1%',
             left: '7%',
             bottom: '1%',
             right: '20%',
             symbolSize: 7,
            label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 15
            },
            leaves: {
                label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                }
            },
            emphasis: {
                focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
         }
    ]
})
}
      }
     }

</script>
<style scoped>

</style>