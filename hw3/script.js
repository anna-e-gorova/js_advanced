const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";


class GoodsItem {
  constructor(product_name, price, id_product) {
    this.product_name = product_name;
    this.price = price;
    this.id_product = id_product;
  }
  render() {
    return `<div class="goods-item" id=${this.id_product}><h3>${this.product_name}</h3><p>${this.price}</p><button class="add_cart">Добавить в корзину</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }

  summ() {
    let listSumm = 0;
    this.goods.forEach((good) => {
      listSumm += good.price;
    });
    return listSumm;
  }
}

class BasketItem extends GoodsItem {
  constructor(product_name, price, id_product){
    super(product_name, price, id_product);
    this.quantity = 1;
  }

  render() {
    return `<div class="goods-item" id=${this.id_product}><h3>${this.product_name}</h3><p>Цена ${this.price}</p><p>Количество ${this.quantity}</p><button class="remove_cart">Удалить из корзины</button></div>`;
  }

  increase() {
    this.quantity++;
  }
  decrease(){
    if (this.quantity > 1){
      this.quantity--;
    }
  }
}

class Basket extends GoodsList {
  constructor() {
    super();
    this.basketGoods = [];
  }

  addendum() {
    document.querySelectorAll('.add_cart').forEach(element => {
      element.addEventListener('click', event => {
        let id = +event.target.parentNode.id;
        if (this.basketGoods.find(el => el.id_product === id)) {
          this.basketGoods.find(el => el.id_product === id).quantity++;
          this.render();
        }
        else{
          const activeGood = this.goods.find(el => el.id_product === id);
          const goodItem = new BasketItem(activeGood.product_name, activeGood.price, activeGood.id_product);
          this.basketGoods.push(goodItem);
          this.render();  
        } 
      })
    });
  
  }

  render(key) {
    if (this.basketGoods.length < 1 && key ===3) {
      document.querySelector(".basket").innerHTML = '';
      return 0;
    }
    if (this.basketGoods.length < 1){
      document.querySelector(".basket").innerHTML = '<div>Корзина пуста</div>';
      return 0;
    }
    else {
      let listHtml = "";
    this.basketGoods.forEach((good) => {
      listHtml += good.render();
    });
    document.querySelector(".basket").innerHTML = listHtml;
    this.removal();
    }
    
  }

  removal() {
    document.querySelectorAll('.remove_cart').forEach(element => {
      element.addEventListener('click', event => {
        let id = +event.target.parentNode.id;
        if (this.basketGoods.find(el => el.id_product === id).quantity > 1) {
          this.basketGoods.find(el => el.id_product === id).quantity--;
          this.render();
        }
        else{
          this.basketGoods.splice(this.basketGoods.findIndex(el => el.id_product === id),1);
          this.render(3);
        } 
      })
    });
    
  }
  getlist() {}

}

const init = async () => {
    const list = new GoodsList();
    await list.fetchGoods();
    list.render();  


    const cart = new Basket();
    await cart.fetchGoods();
    cart.addendum();

    document.querySelector('.cart-button').addEventListener('click', function() {
      cart.render();
    })
};

window.onload = init;
