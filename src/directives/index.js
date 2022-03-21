import print from 'vue3-print-nb'
import permission from './permissions'
export default (app) => {
  app.use(print)
  app.directive('permission', permission)
}
