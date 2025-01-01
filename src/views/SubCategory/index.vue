<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import GoodsItem from '../Home/components/GoodsItem.vue'
// 路由参数
const route = useRoute()
// 分类数据
const categoryData = ref([])

// 商品列表
const goodsList = ref([])
// 分类数据
const getCategory = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.data.result

}
const reqDate = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqDate.value)
  goodsList.value = res.data.result.items

}

onMounted(() => {
  // 调用获取分类数据的方法
  getCategory()
  // 调用获取商品列表的方法
  getGoodsList()
})

const changeClick = () => {
  reqDate.value.page = 1
  getGoodsList()
}
// 无限滚动
const disabled = ref(false)
const load = async () => {
  const res = await getSubCategoryAPI(reqDate.value)
  goodsList.value = [...goodsList.value, ...res.data.result.items]
  reqDate.value.page++

  if (res.data.result.page >= res.data.result.pageSize) {
    disabled.value = true
  }

}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{
          path: `/category/${categoryData.parentId}`
        }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqDate.sortField" @tab-change="changeClick">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <GoodsItem v-for="goods in goodsList" :good="goods" :key="goods.id" />
        <!-- <div class="loading" v-loading="!disabled"></div> -->
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>