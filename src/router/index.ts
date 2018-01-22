import Vue, { AsyncComponent } from 'vue'
import Router , { RouteConfig, Route } from 'vue-router'

const Home: AsyncComponent = (): any => import(/* webpackChunkName: 'helloworld' */ '@/pages/Home.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: Home }
]

const router: Router = new Router({
  routes
})

router.beforeEach((to: Route, from: Route, next) => {
  // x
  next()
})

export default router
