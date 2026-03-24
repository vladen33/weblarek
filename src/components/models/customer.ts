import {ICustomer, TPayment} from '../../types/index';
import {IEvents} from "../base/Events.ts";

export class Customer implements ICustomer {
    customerData: ICustomer;

    constructor(protected events: IEvents) {
        this.customerData = {
            paymentType: 'card',
            address: '',
            email: '',
            phone: ''
        }
    }

    set paymentType(paymentType: TPayment) {
        this.customerData.paymentType = paymentType;
    }
    set address(address: string) {
        this.customerData.address = address;
    }
    set email(email: string) {
        this.customerData.email = email;
    }
    set phone(phone: string) {
        this.customerData.phone = phone;
    }
    get paymentType(): TPayment {
        return this.customerData.paymentType;
    }
    get address(): string {
        return this.customerData.address;
    }
    get email(): string {
        return this.customerData.email;
    }
    get phone(): string {
        return this.customerData.phone;
    }
    setAllCustomerData(data: Partial<ICustomer>): void {
        Object.assign(this.customerData, data);
        this.events.emit('customer-model:has-updated');
    }
    getAllCustomerData(): ICustomer {
        return this.customerData;
    }  
    clearAllCustomerData(): void {
        this.paymentType = '';
        this.address = '';
        this.email = '';
        this.phone = '';
    }
    validateCustomerData(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (this.customerData.paymentType === '') {
            errors.payment = 'Не выбран тип платежа';
        }
        if (this.customerData.address === '') {
            errors.address = 'Не указан адрес доставки';
        }
        if (this.customerData.email === '') {
            errors.email = 'Не указан адрес электронной почты';
        }    
        if (this.customerData.phone === '') {
            errors.phone = 'Не указан контактный телефон';
        }    
        return errors;
    }
    checkAddressErrors(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (this.customerData.address === '') {
            errors.address = 'Не указан адрес доставки';
        }
        return errors;
    }
}