import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const Home = {
  path: '/',
  alias: '/home',
  component: () => import('../views/Home/index.vue'),
}
const AutoRoutes = Object.entries(
  import.meta.glob('../views/**/index.vue', {
    eager: true,
    import: 'default',
  }) as Record<string, { route?: RouteRecordRaw }>,
).map(([src, component]) => {
  const route = component.route! || {}
  route.path = route.path || src.replace('../views', '').replace('/index.vue', '').toLowerCase() || ''
  route.name = route.name || route.path.split('/').filter(Boolean).join('-') || 'home'
  route.meta = route.meta || {}
  route.component = component
  return route
})
const ClearCache: RouteRecordRaw = {
  name: '/clear',
  path: '/clear',
  component: {
    async beforeRouteEnter() {
      // 判断是否已经清空缓存，防止进入死循环
      if (window.name !== 'refreshed') {
        // 清空localStorage
        window.localStorage.clear()
        // 清空sessionStorage
        window.sessionStorage.clear()
        // 清空caches
        const caches = await window.caches?.keys()
        await Promise.all(caches?.map((cacheName) => window.caches.delete(cacheName)))
        // 清空cookies
        const cookies = await window.cookieStore?.getAll()
        await Promise.all(cookies?.map(({ name: cookieName }) => window.cookieStore.delete(cookieName)))
        // 清空indexedDB
        const databases = await window.indexedDB?.databases()
        await Promise.all(databases?.map(({ name }) => window.indexedDB.deleteDatabase(name!)))
        // 清空serviceWorker
        await window.serviceWorker?.update()
        // 清空完成设置标志位
        window.name = 'refreshed'
        // 刷新页面
        window.location.reload()
      }
    },
    beforeRouteLeave() {
      window.name = ''
    },
    computed: {
      refreshed: () => window.name === 'refreshed',
    },
    template: `
      <div style="text-align: center;padding-top: 50px;">
        <h1>{{ refreshed ? '缓存清除成功' : '正在清空缓存...' }}</h1>
      </div>
    `,
  },
}
const NotFound: RouteRecordRaw = {
  name: '/404',
  path: '/:pathMatch(.*)*',
  component: {
    template: `
        <div style="text-align: center;padding-top: 50px;">
          <h1>Page Not Found</h1>
          <p>${window.location.href}</p>
        </div>
      `,
  },
}

const router = createRouter({
  routes: [Home, ...AutoRoutes, ClearCache, NotFound],
  history: createWebHashHistory(import.meta.env.BASE_URL),
})

export default router
