const API_URL =
  "http://localhost:3000";


Vue.component('search', {
  props: ['filtergoods'],
  data: function () {
    return {
      searchLine: '',
    }
  },
  template: `
  <div class="search">
    <input type="text" class="goods-search" v-model="searchLine" />
    <button class="search-button" type="button" v-on:click="filtergoods(searchLine)">Искать</button>
  </div>
  `
});

Vue.component('goods-list', {
  props: ['goods', 'getproductscart'],
  template: `
  <div class="goods-list">
    <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :getproductscart="getproductscart" :key="goodEntity.id_product" ></goods-item>
  </div>
  `
});

Vue.component('goods-item', {
  props: ['goodProp', 'getproductscart'],
  methods: {
    async addToCart() {
      await fetch(`${API_URL}/addToCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.goodProp)
      });
      this.getproductscart();
    },
  },
  template: `
  <div :id=goodProp.id_product class="goods-item">
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <button class="add_cart" @click="addToCart">Добавить в корзину</button>
  </div>
  `
});

Vue.component('busket-list', {
  data: function () {
    return {
      isVisibleCart: true,
    }
  },
  props: ['goods', 'getproductscart'],
  template: `
  <div class="busket-list" v-if="isVisibleCart">
    Корзина:
    <busket-item v-for="goodEntity in goods" :goodProp="goodEntity" :getproductscart="getproductscart" :key="goodEntity.id_product"></busket-item>
  </div>
  `
});

Vue.component('busket-item', {
  props: ['goodProp', 'getproductscart'],
  methods: {
    async delFromCart() {
      await fetch(`${API_URL}/delFromCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.goodProp)
      });
      this.getproductscart();
    },

  },

  template: `
  <div :id=goodProp.id_product class="goods-item">
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <p>Количество{{goodProp.quantity}}</p>
    <button class="remove_cart" @click="delFromCart">Удалить из корзины</button>
  </div>
  `
});

Vue.component('connection-error', {
  props: ['connectionerr'],
  template: `
  <div class="connection-error" v-if="connectionerr">
    <p>Ошибка при соединении с сервером</p>
  </div>
  `
});

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
    async addToCart() {
      await fetch(`${API_URL}/addToCart`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(this.basketGoods)
      });
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
