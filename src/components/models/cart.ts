import {IProduct} from '../../types/index';

export class Cart {
    protected prodList: IProduct[] = [];

    getProdListFromCart(): IProduct[] {
        return this.prodList;
    }
    addProdToCart(prod: IProduct): void {
        this.prodList.push(prod);
    }
    removeProdFromCart(prod: IProduct): void {
        this.prodList = this.prodList.filter(item => item.id !== prod.id);
    }
    clearCart(): void {
        this.prodList = [];
    }
    getFullPriceOfCart(): number {
        return this.prodList.reduce((acc, item) => acc + (item.price ?? 0), 0);
    }
    getCountProdInCart(): number {
        return this.prodList.length;
    }
    isProdInCart(prod: IProduct): boolean {
        return this.prodList.some(item => item.id === prod.id);
    }
}