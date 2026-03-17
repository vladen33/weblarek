import {Component} from "../base/Component.ts";
import { ensureElement } from '../../utils/utils.ts';

export abstract class CardView extends Component<T>{
    //protected id: string;
    protected titleNode: HTMLElement;
    protected priceNode: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.titleNode = ensureElement<HTMLElement>('.card .card__title');
        this.priceNode = ensureElement<HTMLElement>('.card .card__price');
    }

    set title(title:string) {
        this.titleNode.textContent = title;
    }

    set price(price:string) {
        if (price) {
            this.priceNode.textContent = `${price} синапсов`;
        } else {
            this.priceNode.textContent = 'Бесценно';
        }
    }
}

export class CardCatalogView extends CardView{

}

export class CardPreviewView {

}

export class CardBasketView {

}