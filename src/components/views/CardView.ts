import { Component } from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';
import { API_URL, CDN_URL } from "../../utils/constants.ts";
import { IEvents } from '../base/Events.ts';
import { IProduct } from '../../types';



export abstract class CardBaseView extends Component<T>{
    protected titleNode: HTMLElement;
    protected priceNode: HTMLElement;
    protected id: string;

    protected constructor(container: HTMLElement) {
        super(container);
        this.titleNode = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceNode = ensureElement<HTMLElement>('.card__price', this.container);
        this.id = '';
    }

    set title(titleValue: string) {
        this.titleNode.textContent = titleValue;
    }

    set price(priceValue: string | null) {
        if (priceValue) {
            this.priceNode.textContent = `${priceValue} синапсов`;
        } else {
            this.priceNode.textContent = 'Бесценно';
        }
    }
}


export class CardBasketView extends CardBaseView{
    protected indexElement: HTMLElement;
    protected deleteButtonElement: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButtonElement.addEventListener('click', (event) => {
            event.stopPropagation();
            events.emit('basket:product-delete', {id: this.id})
        })
    }

    set index(indexValue: string) {
        this.indexElement.textContent = indexValue;
    }
}

export class CardCatalogView extends CardBaseView{
    protected imageNode: HTMLImageElement;
    protected categoryNode: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.imageNode = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryNode = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener('click', () => {
            this.events.emit('product:show', { id: this.id });
        });
    }

    set image(imageName: string) {
        this.setImage(this.imageNode, `${CDN_URL}${imageName}`);
    }

    set category(categoryName: string) {
        this.categoryNode.textContent = categoryName;
    }

    render(data?: Partial<T>): HTMLElement {
        this.id = data.id;
        return super.render(data);
    }
}

export class CardPreviewView extends CardCatalogView{
    protected textNode: HTMLElement;
    protected buttonNode: HTMLButtonElement;
    protected inBasket: boolean = false;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this.textNode = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonNode = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buttonNode.addEventListener('click', (event) => {
            event.stopPropagation();
            this.inBasket = !this.inBasket;
            this.buttonNode.textContent = this.inBasket ? 'Удалить из корзины' : 'Купить';
            if (this.inBasket) {
                this.events.emit('basket:product-add', {id: this.id});
            } else {
                this.events.emit('basket:product-delete', {id: this.id});
            }
        });
    }

    set text(textValue: string) {
        this.textNode.textContent = textValue;
    }

    render(data: IProduct, inBasket = false): HTMLElement {
        console.log('product:show dataprice => ', data.price)
        this.id = data.id;
        this.image = data.image;
        this.category = data.category;
        this.title = data.title;
        this.text = data.description;
        this.price = data.price;
        this.inBasket = inBasket;

        console.log('data.price', data.price);
        console.log('this.category', this.category);
        console.log('this.title', this.title);
        console.log('this.text', this.text);

        if (data.price === null) {
            this.buttonNode.disabled = true;
            this.buttonNode.textContent = 'Недоступно';
        } else {
            this.buttonNode.disabled = false;
            this.buttonNode.textContent = this.inBasket ? 'Удалить из корзины' : 'Купить';
        }

        return super.render(data);
    }
}

