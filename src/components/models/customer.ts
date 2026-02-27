import {ICustomer, TPayment} from '../../types/index';

export class Customer implements ICustomer {
    payment: TPayment = '';
    address: string = '';
    email: string = '';
    phone: string = '';

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
    validateFields(): Record<string, string> {
        const errors: Record<string, string> = {};
        if (this.payment === '') {
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