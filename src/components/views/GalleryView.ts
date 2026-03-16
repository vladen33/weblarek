import { Component } from '../base/Component.ts';
import { IGalleryData } from '../../types/index.ts';


export class GalleryView extends Component<IGalleryData> {
  private catalogElement: HTMLElement | null;
  
  constructor(protected readonly container: HTMLElement) {
    super(container);
    this.catalogElement = container.querySelector('.gallery');
  }

  set catalog(items: HTMLElement[]) {

  }

}