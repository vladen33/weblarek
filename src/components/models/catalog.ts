import { IProduct } from '../../types';
import { IEvents } from '../base/Events.ts';

export class Catalog {
    protected productList: IProduct[] = [];
    protected selectedProduct: IProduct | null = null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProductList(arr: IProduct[]): void {
        this.productList = arr;
        this.events.emit('catalog:changed');
    }
    getProductList(): IProduct[] {
        return this.productList;
    }
    getProductById(id: string): IProduct | undefined {
        return this.productList.find(prod => prod.id === id);
    }
    setSelectedProduct(id: string): void {
        const product = this.getProductById(id);
        this.selectedProduct = product ?? null;
        this.events.emit('product:show', { id });
    }
    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}

