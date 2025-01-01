// 封装倒计时逻辑函数
import { ref, computed } from 'vue'
import dayjs from 'dayjs'


export const useCountDown = () => {
  // 倒计时
  const time = ref(0)
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 2. 开启倒计时的函数
  const start = (currentTime) => {
    time.value = currentTime
    let timer = setInterval(() => {
      time.value--
      if (time.value <= 0) clearInterval(timer)
    }, 1000)
  }

  return {
    formatTime,
    start
  }
}