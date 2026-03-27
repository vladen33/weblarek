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

    checkErrors(checkFields: string[]): TCustomerErrors {
        const errors: TCustomerErrors = {};
        if (this.customerData.payment === '' && checkFields.includes('payment')) {
            errors.payment = 'Не выбран способ оплаты';
        }
        if (this.customerData.address.trim() === '' && checkFields.includes('address')) {
            errors.address = 'Не указан адрес доставки';
        }
        if (this.customerData.email.trim() === '' && checkFields.includes('email')) {
            errors.email = 'Не указан email-адрес';
        }
        if (this.customerData.phone.trim() === '' && checkFields.includes('phone')) {
            errors.phone = 'Не указан номер телефона';
        }
        return errors;
    }
}