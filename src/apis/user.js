import instance from "@/utils/http";


export const loginAPI = (data) => {
  return instance.post('/login', data)
}

// 猜你喜欢模块
export const getLikeListAPI = ({ limit = 4 }) => {
  return instance({
    url: '/goods/relevant',
    params: {
      limit
    }
  })
}