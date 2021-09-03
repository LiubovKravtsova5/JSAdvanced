/* Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы
понадобятся для работы с этими сущностями. */

"use strict"
//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class Products {
    constructor() {
        /*  this.products = [
             { title: 'Shirt', price: 150, img: 'img/Shirt.png' },
             { title: 'Socks', price: 50, img: 'img/Socks.jpg' },
             { title: 'Jacket', price: 350, img: 'img/Jacket.png' },
             { title: 'Shoes', price: 250, img: 'img/Shoes.jpg' },
         ]; */
        this.products = [];
        this._getProducts()
            .then(data => {
                this.products = [...data];
                console.log(this.products);
                this.renderProductsList();
            });

        /* this.products.forEach(element => {
            element.push({ img: 'img/noimg.jpg' })
        }); */
    }
    _getProducts() {

        return fetch(`${'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    renderProductsList() {
        this.products.forEach(element => {
            const product = new ProductsItem(element);
            product.init();
        })
    }


}
class ProductsItem {
    constructor(product, img = "img/noimg.jpg") {
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
        this.id;
        this.text;
        this.totalSum = null;
    }
    init() {
        let target = document.querySelector('.solution2-1');
        this.text = document.createElement('p');
        this.renderProductsItem();
        target.insertAdjacentElement('beforeend', this.text);
        this.eventHandlers();
    }

    renderProductsItem() {
        this.text.innerHTML = `<div class="products-item" id=${this.title}>
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="add-product" data-id="${this.title}"> Добавить</button>
        </div>`;
    }
    eventHandlers() {
        this.id = document.getElementById(this.title);
        this.id.addEventListener('click', event => newBasket.addToBasket(event.target.dataset.id));
    }

}


class Order {
    constructor() {
        this.basket = [];
        this.text = '';
        this.target;
        this.textB;
        this.idB;
        this.total = null;
    }
    clrBusket() {
        this.clrRenderOrder();
        this.basket = [];
        this.total = null;
    };
    clrRenderOrder() {
        this.target = document.querySelector('.mybasket');
        this.target.innerHTML = '';
    }
    addToBasket(id) {//увеличение количеств
        const inBascket = newBasket.basket.find((element) => id === element.product_name);
        if (!inBascket) {
            const pushProduct = pl.products.find((element) => id === element.product_name);
            newBasket.basket.push({ ...pushProduct, qt: 1, subSum: pushProduct.price });
        } else {
            const plusQt = newBasket.basket.findIndex((element) => id === element.product_name);
            newBasket.basket[plusQt]["qt"] += 1;
            newBasket.basket[plusQt]["subSum"] = newBasket.basket[plusQt]["qt"] * newBasket.basket[plusQt]["price"];
        }
        this.init();
    }
    clrButton() {
        this.textB = document.createElement('p');
        this.textB.innerHTML = '<button class="add - product" id="clrButton">Очистить корзину</button>';
        this.target.insertAdjacentElement('beforeend', this.textB);
    }
    eventHandlers() {
        this.idB = document.getElementById("clrButton");
        this.idB.addEventListener('click', event => this.clrBusket());
    }
    init() {
        this.clrRenderOrder();
        this.basket.forEach((item) => {
            this.text = document.createElement('p');
            this.renderOrderItem(item);
            this.target.insertAdjacentElement('beforeend', this.text);
        });
        this.totalSum();
        this.clrButton();
        this.eventHandlers();
    }
    totalSum() {
        this.total = null;
        this.basket.forEach((item) => {
            this.total += item.subSum;
        });
        this.totalSumPlace = document.createElement('p');
        this.totalSumPlace.innerHTML = `<div class="products-item">
            <p><i><h3>Всего в корзине товаров на ${this.total}<h3></i></p>
            </div>`;
        this.target.insertAdjacentElement('beforeend', this.totalSumPlace);

    }
    renderOrderItem(item) {
        this.text.innerHTML = `<div class="products-item">
        <p><i>${item.qt}${item.product_name} по цене: ${item.price} Подитог: ${item.subSum}</i></p>
        </div>`;
    }



}

let pl = new Products();
let newBasket = new Order();
pl.renderProductsList();





