import './scss/styles.scss';
import {ApiPostMethods, IApi} from '../src/types/index';
import { API_URL } from '../src/utils/constants';
import { Cart } from '../src/components/models/cart';
import { Catalog } from '../src/components/models/catalog';
import { Customer } from '../src/components/models/customer';
import { Api } from '../src/components/base/Api';
import {apiProducts} from '../src/utils/data';


const catalog = new Catalog();
const cart = new Cart();
const customer = new Customer();

console.log('Объект Catalog ', catalog);
console.log('Объект Cart ', cart);
console.log('Объект Customer ', customer);

// Проверка работы класса Catalog
catalog.setProductList(apiProducts.items);
const prodList = catalog.getProductList();
console.log('Сохраненный список товаров', prodList);
const prodId1 = prodList[0].id;
const prodId2 = prodList[1].id;
console.log('id первого товара в списке', prodId1);
console.log('id второго товара в списке', prodId1);
const prod1 = catalog.getProductById(prodId1);
const prod2 = catalog.getProductById(prodId2);
console.log('Товар, найденный в сиске по id', prod1);
catalog.setSelectedProduct(prod1);
const selected = catalog.getSelectedProduct();
console.log('Выбранный товар', selected);

// Проверка работы класса Cart
cart.addProdToCart(prod1);
cart.addProdToCart(prod2);
console.log('Список товаров в корзине: ', cart.getProdListFromCart());
console.log('Количество товаров в корзине: ', cart.getCountProdInCart());
console.log('Стоимость товаров в корзине: ', cart.getFullPriceOfCart());
console.log(`Товар "${prod1.title}" в корзине? `, cart.isProdInCart(prod1));
cart.removeProdFromCart(prod1);
console.log(`Товар "${prod1.title}" удален из корзины`);
console.log(`Товар "${prod1.title}" в корзине? `, cart.isProdInCart(prod1));
cart.clearCart();
console.log(`Корзина очищена`);
console.log('Количество товаров в корзине: ', cart.getCountProdInCart());

// Проверка работы класса Customer
console.log('Пустой класс Customer', customer);
customer.setPayment('cash');
customer.setEmail('ivanov@mail.ru');
console.log('Объект с валидацией', customer.validateFields());
customer.setAddress('Москва,...');
customer.setPhone('+79001234567');
console.log('Заполненный класс Customer', customer);

console.log('Вывод всех полей:');
console.log(customer.getPayment());
console.log(customer.getEmail());
console.log(customer.getAddress());
console.log(customer.getPhone());
console.log('Вывод объекта:');
console.log(customer.getAllFields())
customer.clearAllFields();
console.log('Вывод очищенного объекта:');
console.log(customer.getAllFields())


class AppApi extends Api {
  api: IApi;
  constructor(api: IApi) {
    super(API_URL);
    this.api = api;
  }
}


