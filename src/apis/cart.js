import instance from "@/utils/http"

// 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
  return instance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取购物车列表
export const findNewCartListAPI = () => {
  return instance({
    url: '/member/cart'
  })
}
// 删除购物车商品
export const deleteCartAPI = (ids) => {
  return instance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return instance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}

