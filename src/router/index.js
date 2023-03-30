import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ModelView from '../views/3DModels/View.vue'
import ModelCreate from '../views/3DModels/Create.vue'
import ModelEdit from '../views/3DModels/Edit.vue'
import RegisterView from '../views/UserRegister/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/register/',
      name: 'userregister',
      component: RegisterView
    },
    {
      path: '/models',
      name: 'models',
      component: ModelView
    },
    {
      path: '/model/create',
      name: 'modelcreate',
      component: ModelCreate
    },
    {
      path: '/model/:id/edit',
      name: 'modeledit',
      component: ModelEdit
    },
    {
      path:'/model/:id/view',
      name:'modelview',
      component: () => import('../views/ModelView.vue')
    }
   
  ]
})

export default router
