import {ICustomer, TCustomerErrors} from '../../types/index';
import {IEvents} from "../base/Events.ts";


export class Customer {
    protected customerData: ICustomer;

    constructor(protected events: IEvents) {
        this.customerData = {
            payment: '',
            address: '',
            email: '',
            phone: ''
        }
    }

    setAllCustomerData(data: Partial<ICustomer>): void {
        Object.assign(this.customerData, data);
        this.events.emit('customer-model:has-updated');
    }
    getAllCustomerData(): ICustomer {
        return this.customerData;
    }  
    clearAllCustomerData(): void {
        this.customerData = {
            payment: '',
            address: '',
            email: '',
            phone: ''
        }
    }

    checkAddressErrors(): TCustomerErrors {
        const errors: TCustomerErrors = {};
        if (this.customerData.payment === '') {
            errors.payment = 'Не указан способ оплаты';
        }
        if (this.customerData.address === '') {
            errors.address = 'Не указан адрес доставки';
        }
        return errors;
    }

    checkContactsErrors(): TCustomerErrors {
        const errors: TCustomerErrors = {};
        const email = this.customerData.email.trim();
        if (email === '') {
            errors.email = 'Укажите email-адрес';
        }
        if (this.customerData.phone === '') {
            errors.phone = 'Укажите номер телефона';
        }
        return errors;
    }
}