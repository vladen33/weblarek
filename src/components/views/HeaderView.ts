import { Component } from '../base/Component.ts';
import { IBasketData } from '../../types';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

export class HeaderView extends Component<IBasketData> {
    private basketCounterNode: HTMLElement;
    private basketButton: HTMLButtonElement;

    constructor(protected readonly container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketCounterNode = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this.basketButton.addEventListener('click', () => {
            this.events.emit('basket:open');
        })
    }

    set counter(productCount: number) {
        if (this.basketCounterNode) {
            this.basketCounterNode.textContent = productCount.toString();
        }
    }
}