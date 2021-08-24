"use strict"
const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];





const cart = {
    products,
    idOfProduct: null,
    productListArr: [],
    productList: {},
    el: null,

    init() {
        this.renderProductsList();
        this.eventHandlers();

    },

    renderProductsItem(product) {
        return `<div class="products-item">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="add-product" data-id="${product.title}"> Добавить</button>
        </div>`;
    },

    renderProductsList() {
        document.querySelector('.products-list').innerHTML = products.map(item => this.renderProductsItem(item)).join('');
        this.el = document.querySelector('.add-product');
    },
    eventHandlers() {
        //document.querySelector('.add-product').addEventListener('click', event => this.addToBasket(event));
        console.log('ifeventHandlers');
        this.el.addEventListener('click', event => this.addToBasket(event));
    },

    addToBasket(event) {//увеличение количества
        console.log('передаем элемент', event.target.dataset);
        order.addToBasket(this.products.find((products) => products.title === event.target.dataset.id))
    },

};

const totalPriceStr = {
    textReturn(product) {
        return `<div><i><p> ${product.qt} ${product.id}</p></i></div>`;
    }

};

const order = {
    basket: [],

    addToBasket(product) {
        const inBascket = this.basket.find((element) => product.id === element.id);
        if (!inBascket) {
            this.basket.push({ ...product, qt: 1 });
        } else {
            inBascket.qt += 1;
        }

        this.init();

    },

    init() {  //Позиционирование на HTML-странице
        this.el = document.querySelector('.mybasket');
        console.log('инициализируем bascket ', this.basket);
        this.basketRender();
        this.eventHandlers();
    },

    basketRender() {
        console.log('сейчас корзина такая:', this.basket);
        this.clrBasketRender();//очистка корзины
        this.el.insertAdjacentHTML('beforeend', `<div><i><h2> В корзине: </h2></i></div>`);
        this.basket.forEach((element) => {
            this.el.insertAdjacentHTML('beforeend', `${totalPriceStr.textReturn(element)}`);
        }
        );
        this.el.insertAdjacentHTML('beforeend', '<button class="mybuttonCLr" data-id="${product.id}"> Удалить</button>');

    },
    clrBasketRender() {
        this.el.innerHTML = '';
    },
    eventHandlers() {
        this.el.addEventListener('click', event => this.clrBasket(event));
    },
    clrBasket() {
        this.basket = [];
        this.clrBasketRender();
    },


}

cart.init();
