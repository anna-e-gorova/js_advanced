export default Vue.component('goods-list', {
    props: ['goods', 'getproductscart'],
    template: `
    <div class="goods-list">
      <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :getproductscart="getproductscart" :key="goodEntity.id_product" ></goods-item>
    </div>
    `
});