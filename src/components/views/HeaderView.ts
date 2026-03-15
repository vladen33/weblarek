import { Component } from '../base/Component.ts';
import { ICartCounter } from '../../types/index.ts';

export class HeaderView extends Component<ICartCounter> {
    private basketButtonElement: HTMLButtonElement | null;
    private basketCounterElement: HTMLElement | null;

    constructor(protected readonly container: HTMLElement) {
        super(container);
        this.basketButtonElement = container.querySelector('.header__basket');
        this.basketCounterElement = container.querySelector('.header__basket-counter');

    }

    setCounter(productCount: number) {
        if (this.basketCounterElement) {
            this.basketCounterElement.textContent = productCount.toString();
        }
    }


}