import instance from "@/utils/http"

// 生成订单
export const getCheckoutAPI = () => {
  return instance({
    url: '/member/order/pre',
  })
}

// 提交订单
export const submitOrderAPI = (data) => {
  return instance({
    url: '/member/order',
    method: 'POST',
    data
  })
}
