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
    getProductById(id: string): IProduct | undefined {
        return this.productList.find(prod => prod.id === id);
    }
    setSelectedProduct(prod: IProduct): void {
        this.selectedProduct = prod;
    }
    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}

