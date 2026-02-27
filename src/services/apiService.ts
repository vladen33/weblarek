import { Api } from '../components/base/Api';
import { ICatalogResponse, IOrderRequest, IOrderResponse} from '../types/index';


export class MainApi extends Api {
  getCatalog(): Promise<ICatalogResponse> {
    return this.get('/product/')
  }
  postOrder(orderData: IOrderRequest): Promise<IOrderResponse> {
    return this.post('/order/', orderData);
  }
}