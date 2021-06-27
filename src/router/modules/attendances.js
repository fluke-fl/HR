// 动态路由
import Layout from '@/layout'
export default {
  path: '/attendances',
  name: 'attendances',
  // 需要layout的布局 所以组件为layout
  component: Layout,
  children: [
    {
      // 二级路由不写路径则默认为一级路由的路径
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: '考勤', icon: 'skill' }
    }
  ]
}
