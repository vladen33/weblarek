import {IProduct} from '../../types/index';

export class Catalog {
    protected productList: IProduct[] = [];
    protected selectedProduct: IProduct | null = null;

    setProductList(arr: IProduct[]): void {
        this.productList = arr;
    }
    getProductList(): IProduct[] {
        return this.productList;
    }
    getProductById(id: string): IProduct {
        try {
            return this.productList.filter(prod => prod.id === id)[0];
        } catch (e) {
            throw new Error(`При получении продукта из каталога по идентификатору возникла ошибка ${e}`)
        }
    }
    setSelectedProduct(prod: IProduct): void {
        this.selectedProduct = prod;
    }
    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}

