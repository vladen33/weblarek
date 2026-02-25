import './scss/styles.scss';
import {IApi, IOrderRequest, IOrderResponse, IProduct, ApiPostMethods} from '../src/types/index';
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


class MainApi extends Api {
  constructor(baseApi: string) {
    super(baseApi);
  }
  getCatalog(): Promise<IProduct[]> {
    return this.get('/product/')
  }
  postOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    const res = this.post('/order/', orderData, 'POST');
    console.log('RES = ', res);
    return res;
  }
}

const app = new MainApi(API_URL);

console.log('Запрос и вывод каталога с сервера:');
const products = await app.getCatalog().then((elem) => {return elem.items})
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
