import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants.ts';
import { Cart } from './components/models/cart.ts';
import { Catalog } from './components/models/catalog.ts';
import { Customer } from './components/models/customer.ts';
import { MainApi } from './services/apiService.ts';
import { apiProducts } from './utils/data.ts';
import { HeaderView } from './components/views/HeaderView.ts';
import { ensureElement } from './utils/utils.ts';
import {GalleryView} from "./components/views/GalleryView.ts";
import {ModalView} from "./components/views/ModalView.ts";
import {CardCatalogView} from "./components/views/CardView.ts";


const catalogModel = new Catalog();
catalogModel.setProductList(apiProducts.items); //TODO заменить потом на нормальный API
const cartModel = new Cart();
const customerModel = new Customer();
const app = new MainApi(API_URL);
console.log('API_URL', API_URL);

const rootElement: HTMLElement = ensureElement<HTMLElement>('body');
const headerView = new HeaderView(rootElement);
const galleryView = new GalleryView(rootElement);

const catalog = catalogModel.getProductList().map(data => {
    const cardCatalogContent = ensureElement<HTMLTemplateElement>('#card-catalog').content;
    const cardCatalogElement: HTMLElement = cardCatalogContent.cloneNode(true);
    const prodElem = new CardCatalogView(cardCatalogElement);

    // console.log('prodElem', prodElem);
    console.log('prodElem.render(data)', prodElem.render(data));
    // return prodElem.render(data);
    // return document.createElement('p');
    return cardCatalogElement;
});


console.log("catalog", catalog);
galleryView.catalog = catalog;



//
// const modalView = new ModalView(rootElement);
//
// const headerElement: HTMLElement = ensureElement<HTMLElement>('.header', rootElement);
// const galleryElement: HTMLElement = ensureElement<HTMLElement>('.gallery', rootElement);
// const modalElement: HTMLElement = ensureElement<HTMLElement>('.modal', document);

// const res = catalogModel.getProductList()

if (false) {

    // Проверка работы класса Catalog
    console.log('1). Проверка класса Catalog');
    console.log('-');
    console.log('Объект Catalog ', catalogModel);
    catalogModel.setProductList(apiProducts.items);
    const prodList = catalogModel.getProductList();
    console.log('Сохраненный список товаров', prodList);
    const prodId1 = prodList[0].id;
    const prodId2 = prodList[1].id;
    console.log('id первого товара в списке', prodId1);
    console.log('id второго товара в списке', prodId2);
    const prod1 = catalogModel.getProductById(prodId1);
    const prod2 = catalogModel.getProductById(prodId2);
    console.log('Товар, найденный в сиске по id', prod1);
    if (prod1) catalogModel.setSelectedProduct(prod1);
    const selected = catalogModel.getSelectedProduct();
    console.log('Выбранный товар', selected);

    // Проверка работы класса Cart
    console.log('-');
    console.log('2). Проверка класса Cart');
    console.log('-');
    console.log('Объект Cart ', cartModel);
    if (prod1) cartModel.addProdToCart(prod1);
    if (prod2) cartModel.addProdToCart(prod2);
    console.log('Список товаров в корзине: ', cartModel.getProdListFromCart());
    console.log('Количество товаров в корзине: ', cartModel.getCountProdInCart());
    console.log('Стоимость товаров в корзине: ', cartModel.getFullPriceOfCart());
    if (prod1) console.log(`Товар "${prod1.title}" в корзине? `, cartModel.isProdInCart(prod1));
    if (prod1) cartModel.removeProdFromCart(prod1);
    if (prod1) console.log(`Товар "${prod1.title}" удален из корзины`);
    if (prod1) console.log(`Товар "${prod1.title}" в корзине? `, cartModel.isProdInCart(prod1));
    cartModel.clearCart();
    console.log(`Корзина очищена`);
    console.log('Количество товаров в корзине: ', cartModel.getCountProdInCart());

    // Проверка работы класса Customer
    console.log('-');
    console.log('3). Проверка класса Customer');
    console.log('-');
    console.log('Пустой объект Customer', customerModel);
    customerModel.setPayment('cash');
    customerModel.setEmail('ivanov@mail.ru');
    console.log('Объект с валидацией', customerModel.validateFields());
    customerModel.setAddress('Москва,...');
    customerModel.setPhone('+79001234567');
    console.log('Заполненный класс Customer', customerModel);
    console.log('Вывод всех полей:');
    console.log(customerModel.getPayment());
    console.log(customerModel.getEmail());
    console.log(customerModel.getAddress());
    console.log(customerModel.getPhone());
    console.log('Вывод объекта:');
    console.log(customerModel.getAllFields())
    customerModel.clearAllFields();
    console.log('Вывод очищенного объекта:');
    console.log(customerModel.getAllFields())

    console.log('-');
    console.log('4). Проверка связи с сервером');
    console.log('-');
    console.log('Запрос и вывод каталога с сервера:');
    const products = (await app.getCatalog()).items;
    console.log(products);

    console.log('Отправка заказа на сервер:');

    const requestBody = {
        "payment": "online",
        "email": "test@test.ru",
        "phone": "+71234567890",
        "address": "Spb Vosstania 1",
        "total": 2200,
        "items": [
            "854cef69-976d-4c2a-a18c-2aa45046c390",
            "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
        ]
    }

    const response = await app.postOrder(requestBody);
    console.log('Ответ от сервера:');
    console.log(response);
}

headerView.counter = 55;
// const cardCatalogTemplate: HTMLTemplateElement = ensureElement<HTMLTemplateElement>('#card-catalog');
// const cardCatalogElement: HTMLElement = cardCatalogTemplate.cloneNode(true).firstChild;

// const cardCatalogContent = ensureElement<HTMLTemplateElement>('#card-catalog').content;
// const cardCatalogElement: HTMLElement = cardCatalogContent.cloneNode(true);
// const productElements: HTMLElement[] = (await app.getCatalog()).items.map(item => {
//     // const elem = new CardCatalogView(cardCatalogElement);
//     // console.log(elem.render(item));
//     // return elem.render(item);
//     return item;
// });
// console.log('cardCatalogContent', cardCatalogContent);
// console.log('cardCatalogElement', cardCatalogElement);
// console.log('products', products);
// galleryView(products);
//
//
// const productList = catalogModel.getProductList().map((item) => {
//     const card = new CardCatalogView()
// })
