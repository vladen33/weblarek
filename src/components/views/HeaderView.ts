import { Component } from '../base/Component.ts';
import { ICartCounter } from '../../types';
import { ensureElement } from '../../utils/utils.ts';
import { IEvents } from '../base/Events.ts';

export class HeaderView extends Component<ICartCounter> {
    private basketCounterElement: HTMLElement;
    private basketButtonElement: HTMLButtonElement;

    constructor(protected readonly container: HTMLElement, protected events: IEvents) {
        super(container);
        this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketButtonElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);

        this.basketButtonElement.addEventListener('click', () => {
            this.events.emit('cart:open');
        })
    }

    set counter(productCount: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = productCount.toString();
        }
    }


}