import Vue, { AsyncComponent } from 'vue'
import Router , { RouteConfig, Route } from 'vue-router'

const HelloWorld: AsyncComponent = (): any => import(/* webpackChunkName: 'helloworld' */ '@/components/HelloWorld.vue')

Vue.use(Router)

const routes: RouteConfig[] = [
  { path: '/', name: 'hello-world', component: HelloWorld }
]

const router: Router = new Router({
  routes
})

router.beforeEach((to: Route, from: Route, next) => {
  // x
  next()
})

export default router
