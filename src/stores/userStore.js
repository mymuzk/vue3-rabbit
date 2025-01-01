import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from './cartStore'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore()
  // 获取用户数据
  const getUserInfo = async (obj) => {
    const res = await loginAPI(obj)
    console.log(res.data.result)
    userInfo.value = res.data.result
    // 合并购物车的操作
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    // 获取最新的购物车数据
    cartStore.updateNewList()
  }
  // 清空用户数据
  const clearUserInfo = () => {
    userInfo.value = {}
  }
  return { userInfo, getUserInfo, clearUserInfo }

},
  {
    persist: true
  }
)