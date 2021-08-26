/* Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы
понадобятся для работы с этими сущностями. */

"use strict"

class Products {
    constructor() {
        this.products = [
            { title: 'Shirt', price: 150, img: 'img/Shirt.png' },
            { title: 'Socks', price: 50, img: 'img/Socks.jpg' },
            { title: 'Jacket', price: 350, img: 'img/Jacket.png' },
            { title: 'Shoes', price: 250, img: 'img/Shoes.jpg' },
        ];

    }

    renderProductsList() {
        this.products.forEach(element => {
            const product = new ProductsItem(element.title, element.price, element.img);
            product.init();
        })
    }


}
class ProductsItem {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id;
        this.text;
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
        this.id.addEventListener('click', event => this.addToBasket(event.target.dataset.id));

    }
    addToBasket(id) {//увеличение количества
        let orderList = new OrderItem(this.title, this.price);
        orderList.addToBasket();
    }
}
class OrderItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.qt = 0;
        this.text;
        this.subSum;
    }
    addToBasket() {
        const inBascket = Order.basket.find((element) => this.title === element.title);
        if (!inBascket) {
            Order.basket.push({ ...product, qt: 1 });
        } else {
            inBascket.qt += 1;
        }
        this.init();
    },
    init() {
        let target = document.querySelector('.mybasket');
        this.text = document.createElement('p');
        this.renderProductsItem();
        target.insertAdjacentElement('beforeend', this.text);
    }

    renderProductsItem() {
        this.text.innerHTML = `<div class="products-item">
        <p><i>${this.qt}${this.title} по цене: ${this.price} Подитог: ${this.subSum}</i></p>
        </div>`;
    }


}



class Order {
    constructor() {
        this.basket = [];
        this.order = '';
    }
    clrBasketRender() {
        this.order = '';
    }
    addToBasket(title, price) {
        ;
        if (!this.basket.title) {
            this.basket.title = new OrderItem(title, price);
        } else {
            inBascket.qt += 1;
        }
    }
    textOrder() {
        return `<div class="orderList">
        <div><i><h2> В корзине: </h2></i></div>
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="add-product" data-id="${this.title}"> Добавить</button>
        </div>`;
    }
    renderOrder() {
        this.clrRenderOrder();//очистка корзины
        this.order.insertAdjacentHTML('beforeend', `<div><i><h2> В корзине: </h2></i></div>`);
        this.basket.forEach((element) => {
            this.el.insertAdjacentHTML('beforeend', `${this.textReturn(element)}`);
        }
        );
        this.el.insertAdjacentHTML('beforeend', `${this.totalPriceStr()}`);
        this.el.insertAdjacentHTML('beforeend', '<button class="mybuttonCLr" data-title="${product.title}"> Удалить</button>');

    }

}
let pl = new Products();
pl.renderProductsList();





