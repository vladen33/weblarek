import {ICustomer, TPayment} from '../../types/index';
import {IEvents} from "../base/Events.ts";

export class Customer implements ICustomer {
    paymentType: TPayment = '';
    address: string = '';
    email: string = '';
    phone: string = '';

    constructor(protected events: IEvents) {
        this.paymentType = 'card';
        this.address = '';
        this.email = '';
        this.phone = '';
    }

    setPayment(paymentType: TPayment): void {
        this.paymentType = paymentType;
    }
    setAddress(address: string): void {
        this.address = address;
    }
    setEmail(email: string): void {
        this.email = email;
    }
    setPhone(phone: string): void {
        this.phone = phone;
    }
    getPayment(): TPayment {
        return this.paymentType;
    }
    getAddress(): string {
        return this.address;
    }
    getEmail(): string {
        return this.email;
    }
    getPhone(): string {
        return this.phone;
    }
    setAllFields(data: Partial<ICustomer>): void {
        Object.assign(this.getAllFields(), data);
        this.events.emit('customer-model:has-updated');
    }
    getAllFields(): ICustomer {
        return {
            paymentType: this.getPayment(),
            address: this.getAddress(),
            email: this.getEmail(),
            phone: this.getPhone()
        }
    }  
    clearAllFields(): void {
        this.setPayment('');
        this.setAddress('');
        this.setEmail('');
        this.setPhone('');
    }
    validateFields(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (this.paymentType === '') {
            errors.payment = 'Не выбран тип платежа';
        }
        if (this.address === '') {
            errors.address = 'Не указан адрес доставки';
        }
        if (this.email === '') {
            errors.email = 'Не указан адрес электронной почты';
        }    
        if (this.phone === '') {
            errors.phone = 'Не указан контактный телефон';
        }    
        return errors;
    }    
}