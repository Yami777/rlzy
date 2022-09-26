import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 注册全局组件
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// console.log(req)// 函数
// console.log(req.keys())
// console.log(req('./dashboard.svg'))
// 导出所有模块
const requireAll = requireContext => requireContext.keys().map(requireContext)
// map返回一个新数组，映射
// 数组
// const requireAll = requireContext => requireContext.keys().map((val) => requireContext(val))
requireAll(req)
// console.log(requireAll(req))
