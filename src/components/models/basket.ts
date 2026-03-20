import { IProduct } from '../../types';
import { IEvents } from '../base/Events';


export class Basket {
    protected productList: IProduct[] = [];
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    getProductListFromBasket(): IProduct[] {
        return this.productList;
    }
    addProductToBasket(product: IProduct): void {
        this.productList.push(product);
        this.events.emit('basket:update');
    }
    removeProductFromBasket(prod: IProduct): void {
        this.productList = this.productList.filter(item => item.id !== prod.id);
        this.events.emit('basket:update');
    }
    clearBasket(): void {
        this.productList = [];
        this.events.emit('basket:update');
    }
    getFullPriceOfBasket(): number {
        return this.productList.reduce((acc, item) => acc + (item.price ?? 0), 0);
    }
    getCountProductInBasket(): number {
        return this.productList.length;
    }
    isProductInBasket(prod: IProduct): boolean {
        return this.productList.some(item => item.id === prod.id);
    }
}