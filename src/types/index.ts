export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export type TPayment = 'card' | 'cash' | '';

export type TCustomerErrors = Partial<Record<keyof ICustomer, string>>

export interface ICustomer {
    payment: TPayment;
    address: string;
    email: string;
    phone: string;
}

export interface IOrderRequest extends ICustomer{
    total: number,
    items: string[]
}

export interface IOrderResponse {
    id: string,
    total: number
}

export interface ICatalogResponse {
    total: number;
    items: IProduct[];
}

export interface IBasketData {
    counter: number;
}

export interface IGalleryData {
    catalog: HTMLElement[];
}

export interface IModalData {
    content: HTMLElement;
}

export interface IBasketData {
    products: HTMLElement[];
    totalPrice: number;
}

export interface ICardData extends Partial<IProduct> {
    index?: number;
}

export interface ISuccessData {
    totalPrice: number;
}

