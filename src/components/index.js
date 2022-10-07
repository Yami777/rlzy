// import PageTools from './PageTools/index.vue'
import * as directives from '@/directives'
import * as filters from '@/filters'
// const components = [PageTools]
// export default {
//   install: function(Vue) {
//     components.forEach(item => {
//       // console.log(item)
//       Vue.component(item.name, item)
//     })
//   }
// }

const fn = require.context('./', true, /\.vue$/)
// console.log(fn.keys()) // 路径
// console.log(fn('./Breadcrumb/index.vue'))// 根据路径查找模块
// const components = fn.keys().map(item => fn(item))
const components = fn.keys().map(fn)
// console.log(components)
// console.log(Object.keys(filters))
export default (Vue) => {
  components.forEach(item => {
    // console.log(item.default.name)
    Vue.component(item.default.name, item.default)
  })
  Object.keys(directives).forEach(ele => {
    Vue.directive(ele, directives[ele])
  })
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}

