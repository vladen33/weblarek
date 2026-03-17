import {Component} from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';


export abstract class CardBaseView extends Component<T>{
    protected titleNode: HTMLElement;
    protected priceNode: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.titleNode = ensureElement<HTMLElement>('.card .card__title');
        this.priceNode = ensureElement<HTMLElement>('.card .card__price');
    }

    set title(titleValue: string) {
        this.titleNode.textContent = titleValue;
    }

    set price(priceValue: string) {
        if (priceValue) {
            this.priceNode.textContent = `${priceValue} синапсов`;
        } else {
            this.priceNode.textContent = 'Бесценно';
        }
    }
}


export class CardBasketView extends CardBaseView{
    protected indexNode: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.indexNode = ensureElement<HTMLElement>('.card .basket__item-index');
    }

    set index(indexValue: string) {
        this.indexNode.textContent = indexValue;
    }
}


export class CardCatalogView extends CardBaseView{
    protected imageNode: HTMLImageElement;
    protected categoryNode: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.imageNode = ensureElement<HTMLImageElement>('.card .card__image');
        this.categoryNode = ensureElement<HTMLElement>('.card .card__category');
    }

    set image(imageName: string) {
        this.imageNode.src = imageName;
    }

    set category(categoryName: string) {
        this.categoryNode.textContent = categoryName;
    }
}

export class CardPreviewView extends CardCatalogView{
    protected textNode: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.textNode = ensureElement<HTMLElement>('.card .card__text');
    }

    set text(textValue: string) {
        this.textNode.textContent = textValue;
    }
}

