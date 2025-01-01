import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, deleteCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  // 登录状态
  const userStore = useUserStore()
  const isLogin = computed(() => {
    return userStore.userInfo.token
  })
  // 购物车列表
  const cartList = ref([])
  // 更新购物车列表
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.data.result
  }
  // 添加到购物车
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      // 登录后加入购物车
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const good = cartList.value.find(item => {
        return item.skuId === goods.skuId
      })

      if (good) {
        good.count += goods.count
      } else {
        cartList.value.push(goods)
      }
      console.log('添加', cartList.value)

    }
    // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过

  }
  // 从购物车删除
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 登录后删除购物车
      await deleteCartAPI([skuId])
      updateNewList()
    } else {
      const index = cartList.value.findIndex(item => item.skuId === skuId)
      console.log(index)
      cartList.value.splice(index, 1)
    }

  }
  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }
  // 商品总数
  const allCount = computed(() => {
    return cartList.value.reduce((num, item) => num + item.count, 0)
  })
  // 商品总价格
  const allPrice = computed(() => {
    return (cartList.value.reduce((num, item) => num + item.count * item.price, 0)).toFixed(2)
  })
  // 选中的商品总价格
  const checkedPrice = computed(() => {
    return cartList.value.reduce((num, item) => {
      return num + (item.selected ? item.count * item.price : 0)
    }, 0)
  })
  // 选中商品的总数量
  const checkedCount = computed(() => {
    return cartList.value.reduce((num, item) => {
      return num + (item.selected ? item.count : 0)
    }, 0)
  })
  // 修改单选框状态
  const singleCheck = (selected, skuId) => {
    const good = cartList.value.find(item => item.skuId === skuId)
    good.selected = selected
  }
  // 检测全选状态
  const isCheckedAll = computed(() => {
    return cartList.value.every(item => item.selected === true)
  })
  // 点击全选按钮修改所有商品的状态
  const checkedAll = (checked) => {
    cartList.value.forEach(item => {
      item.selected = checked
    })
  }

  return { cartList, updateNewList, clearCart, addCart, delCart, allCount, allPrice, singleCheck, isCheckedAll, checkedAll, checkedPrice, checkedCount }
}, {
  persist: true
})