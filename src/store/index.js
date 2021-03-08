import { createStore } from 'vuex'

const setLocal = (state) => {
  const { cartList } = state
  const cartes = JSON.stringify(cartList)
  window.localStorage.cart = cartes
}

const getLocal = () => {
  {
    // 一级是商店id
    // cartShopID: {
    // 二层是商品id
    //   itemID: {
    //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //     name: "番茄 250g / 份",
    //     oldPrice: 39.6,
    //     price: 33.6,
    //     sales: 10,
    //     _id: "1",
    //     counter: 1,
    //     checked:true
    //   }
    // }
  }
  return JSON.parse(window.localStorage.cart) || {}
}
export default createStore({
  state: {
    // 整个购物车
    cartList: getLocal()
  },
  mutations: {
    // 添加商品
    addProduct(state, paylod) {
      const { shopId, productID, productInfo } = paylod;
      // 商店
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = {} }
      // 商品
      let producItem = shopInfo[productID]
      if (!producItem) {
        producItem = productInfo
        producItem.count = 0
        producItem.checked = true
      }
      producItem.count += 1
      shopInfo[productID] = producItem
      state.cartList[shopId] = shopInfo
      setLocal(state)
    },
    // 减少商品
    subProduct(state, paylod) {
      const { shopId, productID } = paylod;
      // 商店
      let shopInfo = state.cartList[shopId]
      // 商品
      let producItem = shopInfo[productID]
      if (producItem.count < 0) return
      producItem.count -= 1
      shopInfo[productID] = producItem
      state.cartList[shopId] = shopInfo
      setLocal(state)

    },
    // 改变商品状态
    changeCheck(state, paylod) {
      const { shopId, productID } = paylod;
      const shopInfo = state.cartList[shopId][productID]
      shopInfo.checked = !shopInfo.checked
      state.cartList[shopId][productID] = shopInfo
      setLocal(state)

    },
    // 全选
    checkedAll(state, paylod) {
      const { shopId } = paylod;
      const productId = state.cartList[shopId]
      for (let k in productId) {
        productId[k].checked = true
      }
      state.cartList[shopId] = productId
      setLocal(state)

    }
    ,
    // 清空购物车
    clearCart(state, shopId) {
      state.cartList[shopId] = {}
      setLocal(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
