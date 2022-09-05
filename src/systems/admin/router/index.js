const route = [
  {
    name: 'admin',
    path: 'admin',
    component: () => import('../layout'),
    children:[
      {
        name: 'Hello',
        path: "hello",
        component: () => import('../view/hello')
      }
    ]
  }
]

export default route;