export default Vue.component('search', {
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