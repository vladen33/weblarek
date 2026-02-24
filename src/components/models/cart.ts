import {IProduct} from '../../types/index';

export class Cart {
    prodList: IProduct[];
    constructor(prodList: IProduct[] = []) {
        this.prodList = prodList;
    }
    getProdList(): IProduct[] {
        return this.prodList;
    }
    addProd(prod: IProduct) {
        this.prodList.push(prod);
    }
    removeProd(prod: IProduct) {
        this.prodList = this.prodList.filter(item => item.id !== prod.id);
    }
    clearCart() {
        this.prodList = [];
    }
    getFullPrice() {
        return this.prodList.map(item => item.price).filter(price => price !== null).reduce((acc, price) => acc + price, 0);
    }
    getCountProd() {
        return this.prodList.length;
    }
    isProdInCart(prod: IProduct) {
        return this.prodList.filter(item => item.id === prod.id).length > 0;
    }
}