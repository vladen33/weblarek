import { Component } from "../base/Component.ts";
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';
import { TPayment } from '../../types/index.ts';

export class FormOrderView extends Component<T>{
    protected payByCashNode: HTMLButtonElement;
    protected payByCardNode: HTMLButtonElement;
    protected addressNode: HTMLInputElement;
    protected _paymentType: TPayment;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this.payByCardNode = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
        this.payByCashNode = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
        this.addressNode = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
        this.paymentType = "card";

        this.payByCardNode.addEventListener('click', () => {
            this.paymentType = 'card';
            this.events.emit('payment:change', { payment: 'card' });
        });

        this.payByCashNode.addEventListener('click', () => {
            this.paymentType = 'cash';
            this.events.emit('payment:change', {payment: 'cash'});
        });
    }

    set paymentType(value: TPayment) {
        this._paymentType = value;
    }

}