const route = [
  {
    name: 'admin',
    path: 'admin',
    component: () => import('../layout'),
    children:[
      {
        name: 'admin菜单一',
        path: "hello",
        component: () => import('../view/hello')
      },
      {
        name: 'admin菜单二',
        path: "hello",
        component: () => import('../view/hello'),
        children:[
          {
            name: 'admin菜单二--一',
            path: "hello",
            component: () => import('../view/hello')
          },
        ]
      }
    ]
  }
]

export default route;