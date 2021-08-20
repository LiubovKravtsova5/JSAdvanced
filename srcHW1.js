"use strict"
const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderProductItem = (title, price) => {
    return `<div class="product-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <button class="mybutton" data-id="${title}"> Добавить</button>
    </div>`;
};

const renderProductsList = (list) => {
    let productListArr = list.map(item => renderProductItem(item.title, item.price));
    let productList = productListArr.join("");
    document.querySelector('.product-list').innerHTML = productList;
}

renderProductsList(products);
