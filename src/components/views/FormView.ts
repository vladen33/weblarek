import { Component } from "../base/Component.ts";
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';
import { ISuccessData, TPayment } from '../../types';


abstract class FormView extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsMessageNode: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
        this.errorsMessageNode = ensureElement<HTMLElement>('.form__errors', this.container);
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
}


export class FormOrderView extends FormView{
    protected payByCashNode: HTMLButtonElement;
    protected payByCardNode: HTMLButtonElement;
    protected addressNode: HTMLInputElement;
    protected paymentType: TPayment;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.payByCardNode = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
        this.payByCashNode = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
        this.addressNode = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
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


export class FormContactsView extends FormView{
    protected emailNode: HTMLInputElement;
    protected phoneNode: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.emailNode = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this.phoneNode = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('basket:try-send-order');
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


export class FormSuccessView extends Component<ISuccessData>{
    protected successDescriptionNode: HTMLElement;
    protected closeButton: HTMLButtonElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.successDescriptionNode = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.closeButton.addEventListener('click', () => {
            events.emit('basket:success-close');
        });
    };

    set totalPrice(value: number) {
        this.successDescriptionNode.textContent = `Списано ${value} синапсов`;
    };
}

