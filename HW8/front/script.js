import API_URL from './api-url.vue'
import connectionError from './connection-error.vue'
import search from './search.vue'
import goodsList from './goods-list.vue'
import goodsItem from './goods-item.vue'
import busketList from './busket-list.vue'
import busketItem from './busket-item.vue'

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    basketGoods: [],
    connectionerr: false,
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        this.connectionError = true;
      }
    },
    async getproductscart() {
      const responce = await fetch(`${API_URL}/cartData`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.basketGoods = catalogItems;
      } else {
        this.connectionError = true;
      }
    },
    filtergoods(searchLine) {
      const regExp = new RegExp(searchLine, 'i');
      this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name));
    },
  },

  async mounted() {
    await this.getProducts()
    await this.getproductscart()
  }
});
