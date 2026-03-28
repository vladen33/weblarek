import { Component } from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';
import { CDN_URL } from "../../utils/constants.ts";
import { IEvents } from '../base/Events.ts';


export abstract class CardBaseView extends Component<T>{
    protected titleNode: HTMLElement;
    protected priceNode: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.titleNode = ensureElement<HTMLElement>('.card__title', this.container);
        this.priceNode = ensureElement<HTMLElement>('.card__price', this.container);
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

    constructor(container: HTMLElement, actions) {
        super(container);
        this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.deleteButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        this.deleteButtonElement.addEventListener('click', actions.onDelete
            // (event) => {
            // event.stopPropagation();
            // events.emit('basket:product-delete', {id: this.id})}
        )
    }

    set index(indexValue: string) {
        this.indexElement.textContent = indexValue;
    }
}

export class CardCatalogView extends CardBaseView{
    protected imageNode: HTMLImageElement;
    protected categoryNode: HTMLElement;

    constructor(container: HTMLElement, actions) {
        super(container);
        this.imageNode = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryNode = ensureElement<HTMLElement>('.card__category', this.container);

        this.container.addEventListener('click', actions.onClick)
    }

    set image(imageName: string) {
        this.setImage(this.imageNode, `${CDN_URL}${imageName}`);
    }

    set category(categoryName: string) {
        this.categoryNode.textContent = categoryName;
    }
}

export class CardPreviewView extends CardCatalogView{
    protected textNode: HTMLElement;
    protected buttonNode: HTMLButtonElement;


    constructor(container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this.textNode = ensureElement<HTMLElement>('.card__text', this.container);
        this.buttonNode = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.buttonNode.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('preview:toggle');
        });
    }

    set text(textValue: string) {
        this.textNode.textContent = textValue;
    }

    setButtonCaptionDelete() {
        this.buttonNode.disabled = false;
        this.buttonNode.textContent = 'Удалить из корзины';

    }

    setButtonCaptionBuy() {
        this.buttonNode.disabled = false;
        this.buttonNode.textContent = 'Купить';
    }

    setButtonCaptionNotAvailable() {
        this.buttonNode.disabled = true;
        this.buttonNode.textContent = 'Недоступно';
    }
}

