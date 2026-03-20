import { Component } from '../base/Component.ts';
import { IModalContent } from '../../types';
import { ensureElement } from '../../utils/utils.ts';

export class ModalView extends Component<IModalContent> {
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

    set modalContent(content: HTMLElement) {
        if (this.modalContentElement) {
            this.modalContentElement.replaceChildren(content);
        }
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}
