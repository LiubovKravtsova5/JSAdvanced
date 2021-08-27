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
        this.id.addEventListener('click', event => newBasket.addToBasket(event.target.dataset.id));

    }

}


class Order {
    constructor() {
        this.basket = [];
        this.text = '';
        this.target;
    }

    clrRenderOrder() {
        this.text = '';
    }
    addToBasket(id) {//увеличение количеств
        const inBascket = newBasket.basket.find((element) => id === element.title);
        if (!inBascket) {
            const pushProduct = pl.products.find((element) => id === element.title);
            newBasket.basket.push({ ...pushProduct, qt: 1 });
        } else {
            const plusQt = newBasket.basket.findIndex((element) => id === element.title);
            newBasket.basket[plusQt]["qt"] += 1;

        }

        this.init();
    }

    init() {
        this.target = document.querySelector('.mybasket');
        this.target.innerHTML = '';
        console.log(this.basket);
        this.basket.forEach((item) => {
            console.log(item);


            this.text = document.createElement('p');
            this.renderOrderItem(item);
            this.target.insertAdjacentElement('beforeend', this.text);
        });
    }

    renderOrderItem(item) {

        this.text.innerHTML = `<div class="products-item">
        <p><i>${item.qt}${item.title} по цене: ${item.price} Подитог: ${item.subSum}</i></p>
        </div>`;
    }


}
let newBasket = new Order();
let pl = new Products();
pl.renderProductsList();





