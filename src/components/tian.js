import axios from 'axios';
import * as echarts from 'echarts';
import { onMounted, ref, reactive } from 'vue';
import _ from 'lodash';
// import rls from '../utils/ls.js';
// npm 包的方式
// `${register}/${pkg}/${version}` https://registry.npmjs.org/koa/0.0.2
let container = ref(null);
let pkg = ref('');
onMounted(function () {

    var myChart = echarts.init(container.value);
  //   axios.get('/examples/data/asset/data/flare.json').then(function ({data}) {
  //     myChart.hideLoading();
  //     data.children.forEach(function (datum, index) {
  //       index % 2 === 0 && (datum.collapsed = true);
  //     });
  //     myChart.setOption(
  //       (option = {
  //         tooltip: {
  //           trigger: 'item',
  //           triggerOn: 'mousemove'
  //         },
  //         series: [
  //           {
  //             type: 'tree',
  //             data: [data],
  //             top: '1%',
  //             left: '7%',
  //             bottom: '1%',
  //             right: '20%',
  //             symbolSize: 7,
  //             label: {
  //               position: 'left',
  //               verticalAlign: 'middle',
  //               align: 'right',
  //               fontSize: 9
  //             },
  //             leaves: {
  //               label: {
  //                 position: 'right',
  //                 verticalAlign: 'middle',
  //                 align: 'left'
  //               }
  //             },
  //             emphasis: {
  //               focus: 'descendant'
  //             },
  //             expandAndCollapse: true,
  //             animationDuration: 550,
  //             animationDurationUpdate: 750
  //           }
  //         ]
  //       })
  //     );
  // });
})

function search() {
  let name = pkg.value;
  let queue = [{name}];
  let result = {};
  function iterate() {
    let obj = queue.shift();
    console.log(JSON.stringify(queue));
    axios.get(`https://registry.npmjs.org/${obj.name}/latest`).then(({data, status}) => {
      if(status === 200) {
        if (data.dependencies) {
          let keys = Object.keys(data.dependencies);
          keys.forEach(function(key, i) {
            queue.push({
              name: key,
              version: data.dependencies[key],
              path: obj.path ? obj.path + '.' + `${obj.name}.children[${i}]` : `${obj.name}.children[${i}]`
            })
          });
        }
        _.set(result, obj.path ? obj.path : `${obj.name}.children[${0}]`, obj);
        if (queue.length) {
          iterate();
        } else {
          console.log(JSON.stringify(result));
        }
      }
    })
  }

  iterate();
}