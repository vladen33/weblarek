import { Component } from "../base/Component.ts";
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';
import { TPayment } from '../../types';

export class FormOrderView extends Component<T>{
    protected payByCashNode: HTMLButtonElement;
    protected payByCardNode: HTMLButtonElement;
    protected addressNode: HTMLInputElement;
    protected submitButton: HTMLButtonElement;
    protected errorsMessageNode: HTMLElement;
    protected paymentType: TPayment;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.payByCardNode = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
        this.payByCashNode = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
        this.addressNode = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.order__button', this.container);
        this.errorsMessageNode = ensureElement<HTMLElement>('.form__errors', this.container);
        this.paymentType = "card";

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('basket:open-contacts-form');
        });

        this.payByCardNode.addEventListener('click', () => {
            this.paymentType = 'card';
            this.events.emit('customer-model:update', { paymentType: this.paymentType });
        });

        this.payByCashNode.addEventListener('click', () => {
            this.paymentType = 'cash';
            this.events.emit('customer-model:update', {paymentType: this.paymentType});
        });

        this.addressNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { address: this.addressNode.value });
        });
    }

    setPaymentType(value: TPayment) {
        if (value === 'card') {
            this.payByCardNode.classList.add('button_alt-active');
            this.payByCashNode.classList.remove('button_alt-active');
        } else {
            this.payByCardNode.classList.remove('button_alt-active');
            this.payByCashNode.classList.add('button_alt-active');
        }
    }

    setAddress(value: string) {
        this.addressNode.value = value;
    }

    disableSubmitButton() {
        this.submitButton.disabled = true;
    }

    enableSubmitButton() {
        this.submitButton.disabled = false;
    }

    outputErrorMessage(message: string) {
        this.errorsMessageNode.innerText = message;
    };

    clearErrorMessage() {
        this.errorsMessageNode.innerText = '';
    }

    checkAddress(errors: Record<string, string>) {
        const errorList: string[] = Object.values(errors);
        if (errorList.length > 0) {
            this.outputErrorMessage(errorList.join(', '));
            this.disableSubmitButton();
        } else {
            this.clearErrorMessage();
            this.enableSubmitButton();
        }
    }
}



export class FormContactsView extends Component<T>{
    protected emailNode: HTMLInputElement;
    protected phoneNode: HTMLInputElement;
    protected submitButton: HTMLButtonElement;
    protected errorsMessageNode: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.emailNode = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this.phoneNode = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button', this.container);
        this.errorsMessageNode = ensureElement<HTMLElement>('.form__errors', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('basket:make-order');
        });

        this.emailNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { email: this.emailNode.value });
        });

        this.phoneNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { phone: this.phoneNode.value });
        });
    }

    setEmail(value: string) {
        this.emailNode.value = value;
    }
    setPhone(value: string) {
        this.phoneNode.value = value;
    }

    disableSubmitButton() {
        this.submitButton.disabled = true;
    }

    enableSubmitButton() {
        this.submitButton.disabled = false;
    }

    outputErrorMessage(message: string) {
        this.errorsMessageNode.innerText = message;
    };

    clearErrorMessage() {
        this.errorsMessageNode.innerText = '';
    }

    checkContacts(errors: Record<string, string>) {
        const errorList: string[] = Object.values(errors);
        if (errorList.length > 0) {
            const mess = errorList.join(', ')
            this.outputErrorMessage(mess);
            this.disableSubmitButton();
        } else {
            this.clearErrorMessage();
            this.enableSubmitButton();
        }
    }
}


export class FormSuccessView extends Component<T>{
    protected successDescriptionNode: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.successDescriptionNode = ensureElement<HTMLElement>('.order-success__description', this.container);
    }
}