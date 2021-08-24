"use strict"
const products = [
    { title: 'Shirt', price: 150, img: 'img/Shirt.png' },
    { title: 'Socks', price: 50, img: 'img/Socks.jpg' },
    { title: 'Jacket', price: 350, img: 'img/Jacket.png' },
    { title: 'Shoes', price: 250, img: 'img/Shoes.jpg' },
];





const cart = {
    products,
    idOfProduct: null,
    productListArr: [],
    productList: {},
    el: null,

    init() {
        this.renderProductsList();


    },
    renderProductsItem(product) {
        return `<div class="products-item" id=${product.title}>
        <img src="${product.img}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="add-product" data-id="${product.title}"> Добавить</button>
        </div>`;
    },
    renderProductsList() {

        document.querySelector('.products-list').innerHTML = products.map(item => this.renderProductsItem(item)).join('');
        this.products.forEach((product) => this.eventHandlers(product));

    },
    eventHandlers(product) {
        this.el = document.getElementById(product.title);
        this.el.addEventListener('click', event => this.addToBasket(event));
    },
    addToBasket(event) {//увеличение количества
        console.log('передаем элемент', event.target.dataset.id);
        order.addToBasket(cart.products.find((products) => products.title === event.target.dataset.id));
    },
};



const order = {
    basket: [],
    totalSum: null,
    localSum: null,

    addToBasket(product) {
        const inBascket = this.basket.find((element) => product.title === element.title);
        if (!inBascket) {
            this.basket.push({ ...product, qt: 1 });
        } else {
            inBascket.qt += 1;
        }
        this.init();
    },
    init() {  //Позиционирование на HTML-странице
        this.el = document.querySelector('.mybasket');
        this.basketRender();
        this.eventHandlers();
    },
    textReturn(product) {
        this.localSum = product.qt * product.price;
        return `<div><i><p> ${product.qt} ${product.title} на сумму ${this.localSum}</p></i></div>`;
    },
    totalPriceStr() {
        this.totalSum = null;
        this.basket.forEach((element) =>
            this.totalSum += element.qt * element.price);
        return `<div><i><p> Итого: ${this.totalSum}</p></i></div>`;

    },
    basketRender() {
        this.clrBasketRender();//очистка корзины
        this.el.insertAdjacentHTML('beforeend', `<div><i><h2> В корзине: </h2></i></div>`);
        this.basket.forEach((element) => {
            this.el.insertAdjacentHTML('beforeend', `${this.textReturn(element)}`);
        }
        );
        this.el.insertAdjacentHTML('beforeend', `${this.totalPriceStr()}`);
        this.el.insertAdjacentHTML('beforeend', '<button class="mybuttonCLr" data-title="${product.title}"> Удалить</button>');

    },
    clrBasketRender() {
        this.el.innerHTML = '';
    },
    eventHandlers() {
        this.el.addEventListener('click', event => this.clrBasket(event));
    },
    clrBasket() {
        this.basket = [];
        this.totalSum = null;
        this.clrBasketRender();
    },
}

cart.init();
