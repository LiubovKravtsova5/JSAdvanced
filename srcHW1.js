"use strict"
const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];





const cart = {
    products,
    total: null,
    list: null,
    idOfProduct: null,
    productListArr: [],
    productList: {},


    renderProductsItem(product) {
        return `<div class="products-item">
        <h3>${product.title}</h3>
        <p>${product.price}</p></div>`;
    },

    renderProductsList() {
        document.querySelector('.products-list').innerHTML = products.map(item => this.renderProductsItem(item)).join('');
    },

};

cart.renderProductsList(products);
