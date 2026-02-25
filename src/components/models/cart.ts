import {IProduct} from '../../types/index';

export class Cart {
    prodList: IProduct[] = [];

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
        return this.prodList.map(item => item.price).filter(price => price !== null).reduce((acc, price) => acc + price, 0);
    }
    getCountProdInCart(): number {
        return this.prodList.length;
    }
    isProdInCart(prod: IProduct): boolean {
        return this.prodList.filter(item => item.id === prod.id).length > 0;
    }
}