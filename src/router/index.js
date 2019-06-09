import Vue from 'vue'
import Router from 'vue-router'
const Name = () => import('@/components/ChooseName')
const Admin = () => import('@/components/Admin')
const MainPage = () => import('@/components/Mainpage')
const Theme = () => import('@/components/selected_theme')
const SubTheme = () => import('@/components/selected_sub_theme')
const Finish = () => import('@/components/finish')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Name',
      component: Name
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage,
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
          redirect: {name: 'MainPage'}
        }
      ]
    },
    {
      path: '/finish',
      name: 'finish',
      component: Finish
    },
    {
      path: '*',
      redirect: {name: 'MainPage'}
    }
  ]
})
