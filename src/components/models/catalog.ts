import {IProduct} from '../../types/index';


// class Product implements IProduct {   
//     id: string;
//     description: string;
//     image: string;
//     title: string;
//     category: string;
//     price: number | null;

//     constructor(id: string, description: string, image: string, title: string, category: string, price=null) {
//         this.id = id;
//         this.description = description;
//         this.image = image;
//         this.title = title;
//         this.category = category;
//         this.price = price;
//     }
    
// }

export class ProductList {
    _productList: IProduct[];
    _selectedProduct: IProduct | null;
    constructor() {
        this._productList = [];
        this._selectedProduct = null;
    }
    setProductList(arr: IProduct[]): void {
        this._productList = arr;
    }
    getProductList(): IProduct[] {
        return this._productList;
    }
    getProductById(id: string): IProduct {
        try {
            return this._productList.filter(prod => prod.id === id)[0];
        } catch (e) {
            throw new Error(`При получении продукта из каталога по идентификатору возникла ошибка ${e}`)
        }
    }
    setSelectedProduct(prod: IProduct): void {
        this._selectedProduct = prod;
    }
    getSelectedProduct(): IProduct | null {
        return this._selectedProduct;
    }

}

