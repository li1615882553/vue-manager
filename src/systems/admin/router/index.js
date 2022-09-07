const route = [
  {
    name: 'admin',
    path: 'admin',
    component: () => import('../layout'),
    children:[
      {
        name: 'admin菜单一',
        path: "admin-1",
        component: () => import('../view/hello'),
        meta:{
          title: "admin菜单一"
        }
      },
      {
        name: 'admin菜单二',
        path: "admin-2",
        component: () => import('../view/hello'),
        children:[
          {
            name: 'admin菜单二--一',
            path: "admin-2-1",
            component: () => import('../view/hello'),
            meta:{
              title: "admin菜单二--一"
            }
          },
        ]
      }
    ]
  }
]

export default route;