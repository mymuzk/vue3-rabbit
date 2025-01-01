// 引入vueuse useIntersectionObserver 视口插件
import { useIntersectionObserver } from '@vueuse/core'


// 定义懒加载插件
export const lazyPlugin = {
  install(app) {
    // 定义img-lazy全局指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(
          el,
          ([entry]) => {
            // console.log(entry.isIntersecting)
            // 判断el是否进入视口区域
            if (entry.isIntersecting) {
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}