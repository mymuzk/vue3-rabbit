// 导入 ref和onMounted 函数
import { ref, onMounted } from 'vue'
// 导入获取分类数据的api函数
import { getCategoryAPI } from '@/apis/category'
// 导入获取路由对象的函数
import { useRoute } from 'vue-router'
// 导入路由守卫函数
import { onBeforeRouteUpdate } from 'vue-router'


export function useCategory() {
  // 面包屑导航数据
  const route = useRoute()
  const categoryData = ref({})

  // 发起请求获取分类数据
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.data.result
  }
  // 页面加载时获取分类数据
  onMounted(() => {
    getCategory()
  })
  // 路由参数变化时获取分类数据
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)

  })
  // 提供分类数据
  return {
    categoryData
  }
}