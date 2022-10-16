
import Layout from '@/layout'
export default {
  path: '/employees',

  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      path: '/employees/detail/:id',
      name: 'detail',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    },

    {
      path: '/employees/print/:id',
      name: 'print',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
