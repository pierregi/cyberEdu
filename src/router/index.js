import Vue from 'vue'
import Router from 'vue-router'
const HomePage = () => import('@/components/HomePage')
const AdminPage = () => import('@/components/AdminPage')
const GamePage = () => import('@/components/GamePage')
const Theme = () => import('@/components/selected_theme')
const SubTheme = () => import('@/components/selected_sub_theme')
const FinishPage = () => import('@/components/FinishPage')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage
    },
    {
      path: '/game',
      name: 'GamePage',
      component: GamePage,
      children: [
        {
          path: 'caesar',
          name: 'caesar',
          component: Theme,
          props: {name: 'caesar'},
          children: [
            {
              path: 'caesar_cipher',
              name: 'caesar_cipher',
              component: SubTheme,
              props: {name: 'caesar_cipher'}
            },
            {
              path: 'caesar_decipher',
              name: 'caesar_decipher',
              component: SubTheme,
              props: {name: 'caesar_decipher'}
            },
            {
              path: 'caesar_decrypt',
              name: 'caesar_decrypt',
              component: SubTheme,
              props: {name: 'caesar_decrypt'}
            }
          ]
        },
        {
          path: 'vigenere',
          name: 'vigenere',
          component: Theme,
          props: {name: 'vigenere'},
          children: [
            {
              path: 'vigenere_cipher',
              name: 'vigenere_cipher',
              component: SubTheme,
              props: {name: 'vigenere_cipher'}
            },
            {
              path: 'vigenere_decipher',
              name: 'vigenere_decipher',
              component: SubTheme,
              props: {name: 'vigenere_decipher'}
            },
            {
              path: 'vigenere_decrypt',
              name: 'vigenere_decrypt',
              component: SubTheme,
              props: {name: 'vigenere_decrypt'}
            }
          ]
        },
        {
          path: 'sql',
          name: 'sql',
          component: Theme,
          props: {name: 'sql'},
          children: [
            {
              path: 'sql_injection',
              name: 'sql_injection',
              component: SubTheme,
              props: {name: 'sql_injection'}
            }
          ]
        },
        {
          path: 'js',
          name: 'js',
          component: Theme,
          props: {name: 'js'},
          children: [
            {
              path: 'xss_exercise',
              name: 'xss_exercise',
              component: SubTheme,
              props: {name: 'xss_exercise'}
            }
          ]
        },
        {
          path: '*',
          redirect: {name: 'GamePage'}
        }
      ]
    },
    {
      path: '/finish',
      name: 'finish',
      component: FinishPage
    },
    {
      path: '*',
      redirect: {name: 'Home'}
    }
  ]
})
