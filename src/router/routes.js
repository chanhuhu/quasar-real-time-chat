
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
      path: '',
      component: () => import('pages/PageUsers.vue')
      },
      {
      path: '/auth',
      component: () => import('pages/PageAuth.vue')
      },
      {
      path: '/chat/:otherUserId',
      component: () => import('pages/PageChat.vue')
      },
      {
      path: '/translate',
      component: () => import('pages/PageTranslate.vue')
      },

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
