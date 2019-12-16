import * as lodash from 'lodash'
import Vue from 'vue'
import VueRouter, {Route} from 'vue-router';

declare module '*.vue' {
  export default Vue
  import Vue from "vue"
}

// 全局变量设置
declare global {
  const _: typeof lodash
}

// iview 全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any
    $Modal: any
    $router: VueRouter // 这表示this下有这个东西
    $route: Route
  }
}
