import { Component } from '../base/Component.ts';
import { IGalleryData } from '../../types/index.ts';
import { ensureElement } from '../../utils/utils.ts';


export class GalleryView extends Component<IGalleryData> {
  private catalogElement: HTMLElement | null;
  
  constructor(protected readonly container: HTMLElement) {
    super(container);
    this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(items: HTMLElement[]) {


  }

}