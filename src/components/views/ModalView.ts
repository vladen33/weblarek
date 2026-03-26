import { Component } from '../base/Component.ts';
import { IModalData } from '../../types';
import { ensureElement } from '../../utils/utils.ts';

export class ModalView extends Component<IModalData> {
    private modalCloseButton: HTMLButtonElement | null;
    private modalContentNode: HTMLElement | null;

    constructor(protected readonly container: HTMLElement) {
        super(container);
        this.modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalContentNode = ensureElement<HTMLElement>('.modal__content', this.container);

        this.modalCloseButton.addEventListener('click', () => {
            this.close();
        });
        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            }
        });
    }

    set content(content: HTMLElement) {
        if (this.modalContentNode) {
            this.modalContentNode.replaceChildren(content);
        }
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }
}
