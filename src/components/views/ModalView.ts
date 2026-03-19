import { Component } from '../base/Component.ts';
import { IModalContent } from '../../types';

export class ModalView extends Component<IModalContent> {
    private modalButtonElement: HTMLButtonElement | null;
    private modalContentElement: HTMLElement | null;

    constructor(protected readonly container: HTMLElement) {
        super(container);
        this.modalButtonElement = container.querySelector('.modal__close');
        this.modalContentElement = container.querySelector('.modal__content');
    }

    set modalContent(content: HTMLElement) {
        if (this.modalContentElement) {
            this.modalContentElement.replaceChildren(content);
        }
    }
}
