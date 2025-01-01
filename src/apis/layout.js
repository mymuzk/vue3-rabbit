import instance from "@/utils/http";

// 分类导航
export const getCategoryAPI = () => {
    return instance({
        url: '/home/category/head'
    })
}