export default Vue.component('busket-list', {
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