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
  props: ['goods', 'addendum'],
  template: `
  <div class="goods-list">
    <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :addendum="addendum" :key="goodEntity.id_product" ></goods-item>
  </div>
  `
});

Vue.component('goods-item', {
  props: ['goodProp', 'addendum'],
  template: `
  <div :id=goodProp.id_product class="goods-item">
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <button class="add_cart" @click="addendum">Добавить в корзину</button>
  </div>
  `
});

Vue.component('busket-list', {
  data: function () {
    return {
      isVisibleCart: true,
    }
  },
  props: ['goods', 'removal'],
  template: `
  <div class="busket-list" v-if="isVisibleCart">
    Корзина:
    <busket-item v-for="goodEntity in goods" :goodProp="goodEntity" :removal="removal" :key="goodEntity.id_product"></busket-item>
  </div>
  `
});

Vue.component('busket-item', {
  props: ['goodProp', 'removal'],
  template: `
  <div :id=goodProp.id_product class="goods-item">
    <h3>{{goodProp.product_name}}</h3>
    <p>{{goodProp.price}}</p>
    <p>Количество{{goodProp.quantity}}</p>
    <button class="remove_cart" @click="removal">Удалить из корзины</button>
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
    async getProductsCart() {
      const responce = await fetch(`${API_URL}/addToCart`);
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
    async addendum(event) {
      let id = +event.target.parentNode.id;
      if (this.basketGoods.find(el => el.id_product === id)) {
        this.basketGoods.find(el => el.id_product === id).quantity++;
      }
      else {
        const activeGood = this.goods.find(el => el.id_product === id);
        const goodItem = { ...activeGood, quantity: 1 };
        this.basketGoods.push(goodItem);
      };
      this.addToCart();
    },

    removal(event) {
      let id = +event.target.parentNode.id;
      if (this.basketGoods.find(el => el.id_product === id).quantity > 1) {
        this.basketGoods.find(el => el.id_product === id).quantity--;
      }
      else {
        this.basketGoods.splice(this.basketGoods.findIndex(el => el.id_product === id), 1);
      };
      this.addToCart();
    },

  },

  async mounted() {
    await this.getProducts()
    await this.getProductsCart()
  }
});
