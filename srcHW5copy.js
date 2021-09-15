const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '', /* поисковый запрос */
        showCart: false, /* флаг видимости корзины */
        catalogUrl: '/catalogData.json', /* источник товаров */
        cartUrl: '/getBasket.json', /* файл выгрузки товаров корзины */
        cartItems: [], /* содержимое корзины */
        filtered: [], /* результат поиска по списку товаров */
        imgCart: 'img/noimage.png', /* заглушка фото товара в корзине */
        products: [], /* список товаров */
        imgProduct: 'img/noimg.jpg' /* заглушка фото товара */
    },
    methods: {
        getJson(url) { /* чтение списка товаров из JSON */
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`) /* чтение списка товаров корзины из JSON*/
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`) /* чтение списка товаров в массивы products и filtered */
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        /* чтение списка товаров в массивы products из локального файла JSON*/
        /*  this.getJson(`getProducts.json`)
              .then(data => {
                  for(let item of data){
                      this.products.push(item);
                      this.filtered.push(item);
                  }
              })  */
    }

});




