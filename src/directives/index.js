export const imgerror = {
  inserted(el, binding, vnode) {
    // el:dom元素
    // banding：与指令有关的相关信息
    // vnode：虚拟节点
    // console.log(el)
    // console.log(binding)
    // console.log(vnode)
    el.onerror = function() {
      el.src = binding.value
    }
  }
}
