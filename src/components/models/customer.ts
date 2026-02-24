import {ICustomer, TPayment} from '../../types/index';

export class Customer implements ICustomer {
    payment: '' | 'card' | 'cash' = '';
    address: string = '';
    email: string = '';
    phone: string = '';
    constructor(payment: TPayment = '', address: string = '', email: string = '', phone: string = '') {
        this.setPayment(payment);
        this.setAddress(address);
        this.setEmail(email);
        this.setPhone(phone);
    }
    setPayment(payment: TPayment): void {
        this.payment = payment;
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
        return this.payment;
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
    getAllFields(): ICustomer {
        return {
            payment: this.getPayment(),
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
    validateFields() {
        const errors: Record<string, string> = {};
        for (const key in this) {
            if (!Object.prototype.hasOwnProperty.call(this, key)) continue;
            const value = this[key as keyof this];
            if (value === '') {
                errors[key] = `Свойство "${key}" имеет пустое значение`;
            }
        }
        return errors;
    }
    
}