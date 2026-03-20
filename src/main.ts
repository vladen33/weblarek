import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants.ts';
import { Basket } from './components/models/basket.ts';
import { Catalog } from './components/models/catalog.ts';
import { Customer } from './components/models/customer.ts';
import { MainApi } from './services/apiService.ts';
import { HeaderView } from './components/views/HeaderView.ts';
import { ensureElement } from './utils/utils.ts';
import { GalleryView } from "./components/views/GalleryView.ts";
import { ModalView } from "./components/views/ModalView.ts";
import {CardBasketView, CardCatalogView} from "./components/views/CardView.ts";
import { EventEmitter } from './components/base/Events.ts';
import {BasketView} from "./components/views/BasketView.ts";
import {IProduct} from "./types";


const events = new EventEmitter();
const api = new MainApi(API_URL);
const catalogModel = new Catalog(events);
const basketModel = new Basket(events);
const customerModel = new Customer();

const headerView = new HeaderView(ensureElement<HTMLElement>('.header'), events);
const galleryView = new GalleryView(ensureElement<HTMLElement>('.page__wrapper'));
const modalView = new ModalView(ensureElement<HTMLElement>('.modal'));


const basketContent = ensureElement<HTMLTemplateElement>('#basket').content;
const basketElement: HTMLElement = basketContent.cloneNode(true) as HTMLElement;
const basketView = new BasketView(basketElement, events);

catalogModel.setProductList((await api.getCatalog()).items);
const catalog: HTMLElement[] = catalogModel.getProductList().map(data => {
    const cardCatalogContent = ensureElement<HTMLTemplateElement>('#card-catalog').content;
    const cardCatalogElement: HTMLElement = cardCatalogContent.cloneNode(true) as HTMLElement;
    const prodElem: CardCatalogView = new CardCatalogView(cardCatalogElement, events);
    return prodElem.render(data);
});
galleryView.catalog = catalog;





const prodList = catalogModel.getProductList();
const prodId1 = prodList[0].id;
const prodId2 = prodList[1].id;
const prod1 = catalogModel.getProductById(prodId1);
const prod2 = catalogModel.getProductById(prodId2);
if (prod1) basketModel.addProductToBasket(prod1);
if (prod2) basketModel.addProductToBasket(prod2);



events.on('basket:update', () => {
    const productsInBasketList: IProduct[] = [...basketModel.getProductListFromBasket()];
    const basketListItems = productsInBasketList.map((item, index) => {
        const cardBasketContent = ensureElement<HTMLTemplateElement>('#card-basket').content;
        const cardBasketElement: HTMLElement = cardBasketContent.cloneNode(true) as HTMLElement;
        const basketProduct = new CardBasketView(cardBasketElement, events);

        basketProduct.index = (index + 1).toString();
        basketProduct.title = item.title;
        basketProduct.price = item.price === null ? null : item.price.toString();

        return basketProduct.render(item);
    });

    basketView.basket = basketListItems;
    basketView.totalPrice = basketModel.getFullPriceOfBasket();
    headerView.counter = basketModel.getCountProductInBasket();
});

events.emit('basket:update');

events.on('product:selected', prod => {
    modalView.render(prod);
    modalView.open();
});


events.on('basket:open', () => {
    modalView.render({ content: basketView.render()});
    modalView.open();
});

//
// if (false) {
//     // Проверка работы класса Catalog
//     console.log('1). Проверка класса Catalog');
//     console.log('-');
//     console.log('Объект Catalog ', catalogModel);
//     catalogModel.setProductList(apiProducts.items);
//     const prodList = catalogModel.getProductList();
//     console.log('Сохраненный список товаров', prodList);
//     const prodId1 = prodList[0].id;
//     const prodId2 = prodList[1].id;
//     console.log('id первого товара в списке', prodId1);
//     console.log('id второго товара в списке', prodId2);
//     const prod1 = catalogModel.getProductById(prodId1);
//     const prod2 = catalogModel.getProductById(prodId2);
//     console.log('Товар, найденный в сиске по id', prod1);
//     if (prod1) catalogModel.setSelectedProduct(prod1);
//     const selected = catalogModel.getSelectedProduct();
//     console.log('Выбранный товар', selected);
//
//     // Проверка работы класса Cart
//     console.log('-');
//     console.log('2). Проверка класса Cart');
//     console.log('-');
//     console.log('Объект Cart ', cartModel);
//     if (prod1) cartModel.addProdToCart(prod1);
//     if (prod2) cartModel.addProdToCart(prod2);
//     console.log('Список товаров в корзине: ', cartModel.getProdListFromCart());
//     console.log('Количество товаров в корзине: ', cartModel.getCountProdInCart());
//     console.log('Стоимость товаров в корзине: ', cartModel.getFullPriceOfCart());
//     if (prod1) console.log(`Товар "${prod1.title}" в корзине? `, cartModel.isProdInCart(prod1));
//     if (prod1) cartModel.removeProdFromCart(prod1);
//     if (prod1) console.log(`Товар "${prod1.title}" удален из корзины`);
//     if (prod1) console.log(`Товар "${prod1.title}" в корзине? `, cartModel.isProdInCart(prod1));
//     cartModel.clearCart();
//     console.log(`Корзина очищена`);
//     console.log('Количество товаров в корзине: ', cartModel.getCountProdInCart());
//
//     // Проверка работы класса Customer
//     console.log('-');
//     console.log('3). Проверка класса Customer');
//     console.log('-');
//     console.log('Пустой объект Customer', customerModel);
//     customerModel.setPayment('cash');
//     customerModel.setEmail('ivanov@mail.ru');
//     console.log('Объект с валидацией', customerModel.validateFields());
//     customerModel.setAddress('Москва,...');
//     customerModel.setPhone('+79001234567');
//     console.log('Заполненный класс Customer', customerModel);
//     console.log('Вывод всех полей:');
//     console.log(customerModel.getPayment());
//     console.log(customerModel.getEmail());
//     console.log(customerModel.getAddress());
//     console.log(customerModel.getPhone());
//     console.log('Вывод объекта:');
//     console.log(customerModel.getAllFields())
//     customerModel.clearAllFields();
//     console.log('Вывод очищенного объекта:');
//     console.log(customerModel.getAllFields())
//
//     console.log('-');
//     console.log('4). Проверка связи с сервером');
//     console.log('-');
//     console.log('Запрос и вывод каталога с сервера:');
//     const products = (await app.getCatalog()).items;
//     console.log(products);
//
//     console.log('Отправка заказа на сервер:');
//
//     const requestBody = {
//         "payment": "online",
//         "email": "test@test.ru",
//         "phone": "+71234567890",
//         "address": "Spb Vosstania 1",
//         "total": 2200,
//         "items": [
//             "854cef69-976d-4c2a-a18c-2aa45046c390",
//             "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
//         ]
//     }
//
//     const response = await app.postOrder(requestBody);
//     console.log('Ответ от сервера:');
//     console.log(response);
// }