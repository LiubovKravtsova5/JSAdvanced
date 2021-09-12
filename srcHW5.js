
"use strict"
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class Products {
    constructor() {
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
    _getProducts() { //Извлечение файлов из JSON

        return fetch(`${API}/catalogData.json`)
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
class ProductsItem {    //Товары
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


class Order {       //Корзина
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
    };
    addToBasket(id) {//увеличение количества
        if (id === undefined) {
            return;
        } else {
            const inBascket = newBasket.basket.find((element) => id === element.product_name);
            if (!inBascket) {
                const pushProduct = pl.products.find((element) => id === element.product_name);
                newBasket.basket.push({ ...pushProduct, qt: 1, subSum: pushProduct.price, img: "img/noimg.jpg" });
            } else {
                const plusQt = newBasket.basket.findIndex((element) => id === element.product_name);
                newBasket.basket[plusQt]["qt"]++;
                newBasket.basket[plusQt]["subSum"] = newBasket.basket[plusQt]["qt"] * newBasket.basket[plusQt]["price"];
            }
            this.init();
        }

    };
    reduceProd(id) {//уменьшение количествв
        const minusQt = newBasket.basket.findIndex((element) => id === element.product_name);
        if (newBasket.basket[minusQt]["qt"] == 1) {
            newBasket.basket.splice(minusQt, 1);
        } else {
            newBasket.basket[minusQt]["qt"]--;
            newBasket.basket[minusQt]["subSum"] = newBasket.basket[minusQt]["qt"] * newBasket.basket[minusQt]["price"];
        }

        this.init();
    }

    eventHandlers(item) {
        console.log(item.product_name);
        this.idB = document.getElementById(item.product_name);
        this.idB.addEventListener('click', event => this.reduceProd(item.product_name));
    }
    init() {
        this.clrRenderOrder();
        this.basket.forEach((item) => {
            this.text = document.createElement('p');
            this.renderOrderItem(item);
            this.target.insertAdjacentElement('beforeend', this.text);
            this.eventHandlers(item);
        });
        this.totalSum();
        // this.eventHandlers();
    }
    totalSum() {
        this.total = null;
        this.basket.forEach((item) => {
            this.total += item.subSum;
        });
        this.totalSumPlace = document.createElement('p');
        this.totalSumPlace.innerHTML = `<div class="order-item">
            <p><i><h3>Всего в корзине товаров на ${this.total}<h3></i></p>
            </div>`;
    }
    renderOrderItem(item) {
        this.text.innerHTML = `<div class="order-item" id='${item.product_name}'>
        <img src="img/noimage.png" class="noimg-tobasket"></img>
        <div class="div-container">
        <p class="order-item-text"><i>${item.product_name} ${item.qt} шт. </p>
        <p class="order-item-text"> по цене: ${item.price} </p>
        <p class="order-item-text"> Подитог: ${item.subSum}</i></p>
        </div>        
        <button class="reduce-product" data-id="${item.product_name}"> X</button>
        </div>`;
    }
}


let pl = new Products();
let newBasket = new Order();
pl.renderProductsList();





