import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/apis/home'



export function useBanner() {
  //  轮播图数据

  const bannerList = ref([])

  const getBanner = async () => {
    const res = await getBannerAPI(2)
    bannerList.value = res.data.result
  }
  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}