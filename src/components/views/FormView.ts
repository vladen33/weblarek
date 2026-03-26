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
    protected payByCashButton: HTMLButtonElement;
    protected payByCardButton: HTMLButtonElement;
    protected addressInputNode: HTMLInputElement;
    protected paymentType: TPayment;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.payByCardButton = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
        this.payByCashButton = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
        this.addressInputNode = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
        this.paymentType = "card";

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('basket:open-contacts-form');
        });

        this.payByCardButton.addEventListener('click', () => {
            this.paymentType = 'card';
            this.events.emit('customer-model:update', { paymentType: this.paymentType });
        });

        this.payByCashButton.addEventListener('click', () => {
            this.paymentType = 'cash';
            this.events.emit('customer-model:update', {paymentType: this.paymentType});
        });

        this.addressInputNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { address: this.addressInputNode.value });
        });
    }

    setPaymentType(value: TPayment) {
        if (value === 'card') {
            this.payByCardButton.classList.add('button_alt-active');
            this.payByCashButton.classList.remove('button_alt-active');
        } else {
            this.payByCardButton.classList.remove('button_alt-active');
            this.payByCashButton.classList.add('button_alt-active');
        }
    }

    setAddress(value: string) {
        this.addressInputNode.value = value;
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
    protected emailInputNode: HTMLInputElement;
    protected phoneInputNode: HTMLInputElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.emailInputNode = ensureElement<HTMLInputElement>('.form__input[name="email"]', this.container);
        this.phoneInputNode = ensureElement<HTMLInputElement>('.form__input[name="phone"]', this.container);

        this.container.addEventListener('submit', (event) => {
            event.preventDefault();
            this.events.emit('basket:try-send-order');
        });

        this.emailInputNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { email: this.emailInputNode.value });
        });

        this.phoneInputNode.addEventListener('input', () => {
            this.events.emit('customer-model:update', { phone: this.phoneInputNode.value });
        });
    }

    setEmail(value: string) {
        this.emailInputNode.value = value;
    }
    setPhone(value: string) {
        this.phoneInputNode.value = value;
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

