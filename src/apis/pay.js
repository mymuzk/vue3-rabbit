import instance from "@/utils/http"
// 订单详情
export const getOrderAPI = (id) => {
  return instance.get(`/member/order/${id}`)
}