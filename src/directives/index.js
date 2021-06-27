export const imageerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.onerror = function() {
      // dom可以注册error事件
      dom.src = options.value
    }
  }
}
