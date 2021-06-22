/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var API_URL =
  "http://localhost:3000";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (API_URL);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('connection-error', {
    props: ['connectionerr'],
    template: `
    <div class="connection-error" v-if="connectionerr">
      <p>Ошибка при соединении с сервером</p>
    </div>
    `
}));

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('search', {
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
}));

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('goods-list', {
    props: ['goods', 'getproductscart'],
    template: `
    <div class="goods-list">
      <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :getproductscart="getproductscart" :key="goodEntity.id_product" ></goods-item>
    </div>
    `
}));

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_url_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('goods-item', {
    props: ['goodProp', 'getproductscart'],
    methods: {
        async addToCart() {
            await fetch(`${_api_url_vue__WEBPACK_IMPORTED_MODULE_0__.default}/addToCart`, {
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
}));

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('busket-list', {
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
}));

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _api_url_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue.component('busket-item', {
    props: ['goodProp', 'getproductscart'],
    methods: {
        async delFromCart() {
            await fetch(`${_api_url_vue__WEBPACK_IMPORTED_MODULE_0__.default}/delFromCart`, {
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
}));

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_url_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _connection_error_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _search_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _goods_list_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _goods_item_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _busket_list_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _busket_item_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7);








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
      const responce = await fetch(`${_api_url_vue__WEBPACK_IMPORTED_MODULE_0__.default}/catalogData`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        this.connectionError = true;
      }
    },
    async getproductscart() {
      const responce = await fetch(`${_api_url_vue__WEBPACK_IMPORTED_MODULE_0__.default}/cartData`);
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

})();

/******/ })()
;