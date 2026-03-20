import {IProduct} from '../../types/index';

export class Basket {
    protected prodList: IProduct[] = [];

    getProdListFromBasket(): IProduct[] {
        return this.prodList;
    }
    addProdToBasket(prod: IProduct): void {
        this.prodList.push(prod);
    }
    removeProdFromBasket(prod: IProduct): void {
        this.prodList = this.prodList.filter(item => item.id !== prod.id);
    }
    clearBasket(): void {
        this.prodList = [];
    }
    getFullPriceOfBasket(): number {
        return this.prodList.reduce((acc, item) => acc + (item.price ?? 0), 0);
    }
    getCountProdInBasket(): number {
        return this.prodList.length;
    }
    isProdInBasket(prod: IProduct): boolean {
        return this.prodList.some(item => item.id === prod.id);
    }
}