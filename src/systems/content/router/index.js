const route = [
  {
    name: 'content',
    path: 'content',
    component: () => import('../layout'),
    children: [
      {
        name: 'Hello1',
        path: "hello",
        component: () => import('../view/hello/index.vue')
      }, {
        name: 'Creation',
        path: "creationPage",
        component: () => import('../view/PoetsZoom/creationPage.vue')
      }, {
        name: 'Zoom',
        path: "zoomPage",
        component: () => import('../view/PoetsZoom/Zoom.vue')
      },
      {
        name: 'gxffCard',
        path: "gxffcard",
        component: () => import('../view/igix/gxffcard.vue')
      },
      {
        name: 'listcard',
        path: "listcard",
        component: () => import('../view/igix/listcard.vue')
      }
    ]
  }
]

export default route;