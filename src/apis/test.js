import instance from "@/utils/http"
// test

export function getCategoryAPI() {
    return instance({
        url: '/home/category/head'
    })
}