import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants.ts';
import { Basket } from './components/models/basket.ts';
import { Catalog } from './components/models/catalog.ts';
import { Customer } from './components/models/customer.ts';
import { MainApi } from './services/apiService.ts';
import { HeaderView } from './components/views/HeaderView.ts';
import { ensureElement, cloneTemplate } from './utils/utils.ts';
import { GalleryView } from "./components/views/GalleryView.ts";
import { ModalView } from "./components/views/ModalView.ts";
import { CardBasketView, CardCatalogView, CardPreviewView } from "./components/views/CardView.ts";
import { EventEmitter } from './components/base/Events.ts';
import { BasketView } from "./components/views/BasketView.ts";
import { IProduct } from "./types";


const events = new EventEmitter();
const api = new MainApi(API_URL);
const catalogModel = new Catalog(events);
const basketModel = new Basket(events);

const headerView = new HeaderView(ensureElement<HTMLElement>('.header'), events);
const galleryView = new GalleryView(ensureElement<HTMLElement>('.page__wrapper'));
const modalView = new ModalView(ensureElement<HTMLElement>('.modal'));

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');

const basketView = new BasketView(cloneTemplate(basketTemplate), events);

// Отрисовка каталога при любом его изменении
events.on('catalog:change', () => {
    const cardItems = catalogModel.getProductList().map(product => {
        const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), events);
        return card.render(product);
    })
    galleryView.render({ catalog: cardItems })
})

// Первоначальная загрузка и отрисовка каталога
catalogModel.setProductList((await api.getCatalog()).items);
events.emit('catalog:change');

// При клике на карточку продукта, выбранный продукт становиться текущим
events.on('card:click', (event: {id: string}) => {
    catalogModel.setSelectedProduct(event.id);
});

// Вывод карточки в модальном окне при выборе какой-либо карточки в каталоге в качестве текущей
events.on('product:show', (event: {id: string}) => {
    const product = catalogModel.getProductById(event.id);
    if (!product) {
        return;
    }
    const cardPreview = new CardPreviewView(cloneTemplate(cardPreviewTemplate), events);
    modalView.render({
        content: cardPreview.render(product)
    });
    modalView.open();
});

events.on('basket:product-add', (event: {id: string}) => {
    console.log('basket:product-add=> ', event.id)
    const product = catalogModel.getProductById(event.id);
    if (!product) {
        return;
    }
    basketModel.addProductToBasket(product);
});

events.on('basket:product-delete', (event: {id: string}) => {
    console.log('basket:product-delete=> ', event.id)
    const product = catalogModel.getProductById(event.id);
    if (!product) {
        return;
    }
    basketModel.removeProductFromBasket(product);
});

events.on('basket:update', () => {
    console.log('basket:update');
    const productsInBasketList: IProduct[] = [...basketModel.getProductListFromBasket()];
    const basketListItems = productsInBasketList.map((item, index) => {
        const basketProduct = new CardBasketView(cloneTemplate(cardBasketTemplate), events);
        basketProduct.index = (index + 1).toString();
        basketProduct.title = item.title;
        basketProduct.price = item.price === null ? null : item.price.toString();
        return basketProduct.render(item);
    });
    basketView.basket = basketListItems;
    basketView.totalPrice = basketModel.getFullPriceOfBasket();
    headerView.counter = basketModel.getCountProductInBasket();
});


events.on('product:selected', prod => {
    modalView.render(prod);
    modalView.open();
});


events.on('basket:open', () => {
    const content = basketView.render();
    modalView.render({ content: content});
    modalView.open();
});
