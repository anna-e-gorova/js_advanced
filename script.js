const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
]

const renderGoodsItem = (title = 'Empty', price = 0) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>` 

const renderGoodsList = (list = goods) => list.map(item => document.querySelector('.goods-list').insertAdjacentHTML('beforeend', renderGoodsItem(item.title, item.price)));

const init = () => {
  renderGoodsList(goods);
} 

window.onload = init
 
/*
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
Ответ: значения по умолчанию доюавлены. Чтобы упростить запись можно убрать фигурные скобки и команду return:
3. Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
Ответ: в результате list.map создается массив с запятыми, чтобы этого избежать на каждом шаге добавляем разметку.
*/
