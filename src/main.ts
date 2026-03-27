import './scss/styles.scss';
import {API_URL} from './utils/constants.ts';
import {Basket} from './components/models/basket.ts';
import {Catalog} from './components/models/catalog.ts';
import {Customer} from './components/models/customer.ts';
import {MainApi} from './services/apiService.ts';
import {HeaderView} from './components/views/HeaderView.ts';
import {cloneTemplate, ensureElement} from './utils/utils.ts';
import {GalleryView} from "./components/views/GalleryView.ts";
import {ModalView} from "./components/views/ModalView.ts";
import {CardBasketView, CardCatalogView, CardPreviewView} from "./components/views/CardView.ts";
import {EventEmitter} from './components/base/Events.ts';
import {BasketView} from "./components/views/BasketView.ts";
import {ICustomer, IOrderRequest, IProduct} from "./types";
import {FormContactsView, FormOrderView, FormSuccessView} from "./components/views/FormView.ts";

const events = new EventEmitter();
const api = new MainApi(API_URL);
const catalogModel = new Catalog(events);
const basketModel = new Basket(events);
const customerModel = new Customer(events);

const headerView = new HeaderView(ensureElement<HTMLElement>('.header'), events);
const galleryView = new GalleryView(ensureElement<HTMLElement>('.page__wrapper'));
const modalView = new ModalView(ensureElement<HTMLElement>('.modal'));

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const formOrderTemplate = ensureElement<HTMLTemplateElement>('#order');
const formContactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const formSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');


const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const formOrderView = new FormOrderView(cloneTemplate(formOrderTemplate), events);
const formContactsView = new FormContactsView(cloneTemplate(formContactsTemplate), events);
const formSuccessView = new FormSuccessView(cloneTemplate(formSuccessTemplate), events);


// Отрисовка каталога при любом его изменении
events.on('catalog:change', () => {
    const cardItems = catalogModel.getProductList().map(product => {
        const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), events);
        card.product = product;
        return card.render(product);
    })
    galleryView.render({ catalog: cardItems })
});

// Первоначальная загрузка и отрисовка каталога
catalogModel.setProductList((await api.getCatalog()).items);
events.emit('catalog:change');

// Вывод карточки в модальном окне при выборе какой-либо карточки в каталоге в качестве текущей
events.on('product:show', (event: {product: IProduct}) => {
    // const product = catalogModel.getProductById(event.id);
    if (!event.product) {
        return;
    }
    const isProductInBasket = basketModel.isProductInBasket(event.product);
    const cardPreview = new CardPreviewView(cloneTemplate(cardPreviewTemplate), events);
    modalView.render({
        content: cardPreview.render(event.product, isProductInBasket)
    });
    modalView.open();
});

// Добавляет переданный продукт в корзину
events.on('basket:product-add', (event: {id: string}) => {
    const product = catalogModel.getProductById(event.id);
    if (!product) {
        return;
    }
    basketModel.addProductToBasket(product);
});

// Удаляет переданный продукт из корзины
events.on('basket:product-delete', (event: {id: string}) => {
    const product = catalogModel.getProductById(event.id);
    if (!product) {
        return;
    }
    basketModel.removeProductFromBasket(product);
});

events.on('basket:update', () => {
    const productsInBasketList: IProduct[] = [...basketModel.getProductListFromBasket()];
    basketView.basket = productsInBasketList.map((item, index) => {
        const basketProduct = new CardBasketView(cloneTemplate(cardBasketTemplate), events);
        basketProduct.index = (index + 1).toString();
        basketProduct.title = item.title;
        basketProduct.price = item.price === null ? null : item.price.toString();
        return basketProduct.render(item);
    });
    basketView.totalPrice = basketModel.getFullPriceOfBasket();
    headerView.counter = basketModel.getCountProductInBasket();
});

events.on('basket:open', () => {
    const content = basketView.render();
    modalView.render({ content: content});
    modalView.open();
});

events.on('basket:open-order-form', () => {
    const cont = formOrderView.render();
    modalView.render({ content: cont });
    modalView.open();
    events.emit('customer-model:has-updated');
});

events.on('basket:open-contacts-form', () => {
    modalView.close();
    const content = formContactsView.render()
    modalView.render({ content: content });
    modalView.open();
});

events.on('customer-model:update', (data: Partial<ICustomer>) => {
    customerModel.setAllCustomerData(data);
});

events.on('customer-model:has-updated', () => {
    const customerData = customerModel.getAllCustomerData();
    formOrderView.setPayment(customerData?.payment ?? '');
    formOrderView.setAddress(customerData?.address ?? '');
    formOrderView.checkFormErrors(customerModel.checkErrors(['payment', 'address']));
    formContactsView.setEmail(customerData?.email ?? '');
    formContactsView.setPhone(customerData?.phone ?? '');
    formContactsView.checkFormErrors(customerModel.checkErrors(['email', 'phone']));
});


events.on('basket:try-send-order', async () => {
    const customerData: ICustomer = customerModel.getAllCustomerData();
    if (!customerData) {
        return;
    }
    const orderData: IOrderRequest = {
        payment: customerData.payment,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        total: basketModel.getFullPriceOfBasket(),
        items: basketModel .getProductListFromBasket().map(item => item.id)
    };
    try {
        const response = await api.postOrder(orderData);
        events.emit('basket:success', response);
    } catch (err) {
        console.error(err);
    }
});

events.on('basket:success', (response: { total: number }) => {
    formSuccessView.totalPrice = response.total;
    modalView.render({ content: formSuccessView.render() });
    modalView.open();
    basketModel.clearBasket();
    headerView.counter = basketModel.getCountProductInBasket();
    customerModel.clearAllCustomerData();
});

events.on('basket:success-close', () => {
    modalView.close();
});
