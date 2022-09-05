let sysMenus = {};

const filterMenus = ({name,path}) => ({name, path})
function getMenusFromRoute(routers) {
    const menus = [];
    routers.forEach(route => {
        let menu = filterMenus(route);
        if(Array.isArray(route.children)){
            menu.children = getMenusFromRoute(route.children);
        } 
        menus.push(menu);
    })
    return menus;
}

const subSysRouterWebpackContext = require.context('../src/systems', true, /router\/index\.js$/);
subSysRouterWebpackContext.keys().forEach(path => {
    const key = path.split('/')[1];
    const value = subSysRouterWebpackContext(path);  // 返回引入的信息
    sysMenus[key] = getMenusFromRoute(value.default)
})

export default sysMenus