const configWebpackContext = require.context('../systems', true, /config\.js$/);
const sysConfig = configWebpackContext.keys().reduce((sysConfig, item) => {
  const endPosition = item.indexOf('/config');
  const sysName = item.slice(2, endPosition);
  sysConfig[sysName] = configWebpackContext(item).default;
  return sysConfig;
}, {})

export default {
  sysConfig
}