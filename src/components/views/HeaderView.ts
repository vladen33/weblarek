import { Component } from '../base/Component.ts';
import { ICartCounter } from '../../types';
import { ensureElement } from '../../utils/utils.ts';

export class HeaderView extends Component<ICartCounter> {
    private basketCounterElement: HTMLElement;
    private basketButtonElement: HTMLButtonElement;

    constructor(protected readonly container: HTMLElement) {
        super(container);
        this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketButtonElement = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    }

    set counter(productCount: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = productCount.toString();
        }
    }


}