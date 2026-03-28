import {ICustomer, TCustomerErrors} from '../../types';
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
        this.events.emit('customer-model:has-updated');
    }

    checkErrors(): TCustomerErrors {
        const errors: TCustomerErrors = {};
        if (this.customerData.payment === '') {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (this.customerData.address.trim() === '') {
            errors.address = 'Не указан адрес доставки';
        }
        if (this.customerData.email.trim() === '') {
            errors.email = 'Не указан email-адрес';
        }
        if (this.customerData.phone.trim() === '') {
            errors.phone = 'Не указан номер телефона';
        }
        return errors;
    }
}