import {Component} from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';
import { API_URL, CDN_URL } from "../../utils/constants.ts";


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
        this.indexNode = ensureElement<HTMLElement>('.basket__item-index', this.container);
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
        this.imageNode = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryNode = ensureElement<HTMLElement>('.card__category', this.container);
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

    constructor(container: HTMLElement) {
        super(container);
        this.textNode = ensureElement<HTMLElement>('.card__text', this.container);
    }

    set text(textValue: string) {
        this.textNode.textContent = textValue;
    }
}

