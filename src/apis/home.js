import instance from "@/utils/http";


// banner 轮播图
export const getBannerAPI = (str = '1') => {
    return instance({
        url: '/home/banner',
        params: {
            distributionSite: str
        }
    })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const getNewAPI = () => {
    return instance({
        url: '/home/new'
    })
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const getHotAPI = () => {
    return instance({
        url: '/home/hot'
    })
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
    return instance({
        url: '/home/goods'
    })
}