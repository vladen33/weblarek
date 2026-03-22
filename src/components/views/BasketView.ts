import {Component} from "../base/Component.ts";
import {IBasketData} from "../../types";
import {ensureElement} from "../../utils/utils.ts";
import { IEvents } from '../base/Events.ts';


export class BasketView extends Component<IBasketData> {
    private modalTitleElement: HTMLElement;
    private basketListElement: HTMLUListElement;
    private basketButtonElement: HTMLButtonElement;
    private basketPriceElement: HTMLElement;

    constructor(protected readonly container: HTMLElement, events: IEvents) {
        super(container);
        this.modalTitleElement = ensureElement<HTMLElement>('.modal__title', this.container);
        this.basketListElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.basketButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);
        this.basket = [];
    }

    set totalPrice(value: number) {
        this.basketPriceElement.textContent = `${value} синапсов`;
    };

    set basket(items: HTMLElement[]) {
        this.basketButtonElement.textContent = 'Оформить';
        if (items.length > 0) {
            this.basketButtonElement.disabled = false;
            this.basketListElement.replaceChildren(...items);
        } else {
            const message = document.createElement('p');
            message.textContent = 'Корзина пуста';
            this.basketButtonElement.disabled = true;
            this.basketListElement.replaceChildren(message);
        }
    };

    render(data?: Partial<IBasketData>): HTMLElement {
        const rendered = super.render(data);
        return rendered;
    }
}
