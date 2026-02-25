import './scss/styles.scss';
import {ApiPostMethods, IApi} from '../src/types/index';
import { API_URL } from '../src/utils/constants';
import { Cart } from '../src/components/models/cart';
import { Catalog } from '../src/components/models/catalog';
import { Customer } from '../src/components/models/customer';
import { Api } from '../src/components/base/Api';




class App implements IApi {
  async get<T extends object>(uri: string): Promise<T> {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`Ошибка HTTP! Статус: ${response.status}`)
    }
    const data: T = await response.json();
    return data;
  }

  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T> {
    
  }


}


