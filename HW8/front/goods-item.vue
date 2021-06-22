import API_URL from './api-url.vue';

export default Vue.component('goods-item', {
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