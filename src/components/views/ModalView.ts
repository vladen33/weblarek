import { Component } from '../base/Component.ts';
import { IModalData } from '../../types';
import { ensureElement } from '../../utils/utils.ts';

export class ModalView extends Component<IModalData> {
    private modalCloseButtonElement: HTMLButtonElement | null;
    private modalContentElement: HTMLElement | null;

    constructor(protected readonly container: HTMLElement) {
        super(container);
        this.modalCloseButtonElement = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalContentElement = ensureElement<HTMLElement>('.modal__content', this.container);

        this.modalCloseButtonElement.addEventListener('click', () => {
            this.close();
        })
    }

    set content(content: HTMLElement) {
        if (this.modalContentElement) {
            this.modalContentElement.replaceChildren(content);
        }
    }

    render(data?: Partial<IModalData>): HTMLElement {
        return super.render(data);
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}
