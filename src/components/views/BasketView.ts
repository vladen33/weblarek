import {Component} from "../base/Component.ts";
import {IBasketData} from "../../types";
import {ensureElement} from "../../utils/utils.ts";
import { IEvents } from '../base/Events.ts';


export class BasketView extends Component<IBasketData> {
    private modalTitleElement: HTMLElement;
    private BasketListElement: HTMLUListElement;
    private BasketButtonElement: HTMLButtonElement;
    private BasketPriceElement: HTMLElement;

    constructor(protected readonly container: HTMLElement, events: IEvents) {
        super(container);
        this.modalTitleElement = ensureElement<HTMLElement>('.modal__title', this.container);
        this.BasketListElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.BasketButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.BasketPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
    }

    set catalog(nodeItems: HTMLElement[]) {
        this.catalogElement.replaceChildren(...nodeItems);
    }
}
