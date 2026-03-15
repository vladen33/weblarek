import { Component } from '../base/Component.ts';

export class Header<T> extends Component<T> {
    private basketButtonElement: HTMLButtonElement | null;
    private basketCounterElement: HTMLSpanElement | null;

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

    render(data?: Partial<T>): HTMLElement {
        return super.render(data);
    }
}