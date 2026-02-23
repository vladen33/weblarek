import {ICustomer, IProduct} from '../../types/index';


class Product implements IProduct {   
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;

    constructor(id: string, description: string, image: string, title: string, category: string, price=null) {
        this.id = id;
        this.description = description;
        this.image = image;
        this.title = title;
        this.category = category;
        this.price = price;
    }
    
}

class ProductList {
    _productList: Product[];
    _selectedProduct: Product | null;
    constructor() {
        this._productList = [];
        this._selectedProduct = null;
    }
    setProductList(arr: Product[]): void {
        this._productList = arr;
    }
    getProductList(): Product[] {
        return this._productList;
    }
    getProductById(id: string): Product {
        try {
            return this._productList.filter(prod => prod.id === id)[0];
        } catch (e) {
            throw new Error(`При получении протукта из каталога по идентификатору возникла ошибка ${e}`)
        }
    }
    setSelectedProduct(prod: Product): void {
        this._selectedProduct = prod;
    }
    getSelectedProduct(): Product | null {
        return this._selectedProduct;
    }

}

