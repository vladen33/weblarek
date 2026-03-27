import {Component} from "../base/Component.ts";
import {IBasketData} from "../../types";
import {ensureElement} from "../../utils/utils.ts";
import {IEvents} from '../base/Events.ts';


export class BasketView extends Component<IBasketData> {
    private basketListNode: HTMLUListElement;
    private basketButton: HTMLButtonElement;
    private basketPriceNode: HTMLElement;

    constructor(protected readonly container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketListNode = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketPriceNode = ensureElement<HTMLElement>('.basket__price', this.container);
        this.basket = [];

        this.basketButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.events.emit('basket:open-order-form');
            this.events.emit('customer-model:has-updated');
        })
    }

    set totalPrice(value: number) {
        this.basketPriceNode.textContent = `${value} синапсов`;
    }

    set basket(items: HTMLElement[]) {
        this.basketButton.textContent = 'Оформить';
        if (items.length > 0) {
            this.basketButton.disabled = false;
            this.basketListNode.replaceChildren(...items);
        } else {
            this.basketButton.disabled = true;
            this.basketListNode.replaceChildren();
        }
    }
}
