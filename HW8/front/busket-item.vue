import API_URL from './api-url.vue';

export default Vue.component('busket-item', {
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