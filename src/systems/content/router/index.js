const route = [
  {
    name: 'content',
    path: 'content',
    component: () => import('../layout'),
    children: [
      {
        name: 'Hello1',
        path: "hello",
        component: () => import('../view/hello/index.vue'),
        meta:{
          title: "hello"
        }
      }, {
        name: 'Creation',
        path: "creationPage",
        component: () => import('../view/PoetsZoom/creationPage.vue'),
        meta:{
          title: "Creation"
        }
      }, {
        name: 'Zoom',
        path: "zoomPage",
        component: () => import('../view/PoetsZoom/Zoom.vue'),
        meta:{
          title: "Zoom"
        }
      },
      {
        name: 'gxffCard',
        path: "gxffcard",
        component: () => import('../view/igix/gxffcard.vue'),
        meta:{
          title: "gxffcard"
        }
      },
      {
        name: 'listcard',
        path: "listcard",
        component: () => import('../view/igix/listcard.vue'),
        meta:{
          title: "listcard"
        }
      }
    ]
  }
]

export default route;