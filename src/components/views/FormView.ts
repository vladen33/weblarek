import { Component } from "../base/Component.ts";
import { IEvents } from '../base/Events.ts';
import { ensureElement } from '../../utils/utils.ts';

export class FormOrderView extends Component<T>{
    protected payByCashNode: HTMLButtonElement;
    protected payByCardNode: HTMLButtonElement;
    protected addressNode: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.payByCardNode = ensureElement<HTMLButtonElement>('.button[name="card"]', this.container);
        this.payByCashNode = ensureElement<HTMLButtonElement>('.button[name="cash"]', this.container);
        this.addressNode = ensureElement<HTMLInputElement>('.form__input[name="address"]', this.container);
    }

}