export const imageerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    //   图片异常的逻辑
    dom.src = dom.src || options.value

    //  监听img标签的错误事件  因为图片加载失败 会触发  onerror事件
    dom.onerror = function() {
      // 图片失败  赋值一个默认的图片
      dom.src = options.value
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
