import { Component } from '../base/Component.ts';
import { IGalleryData } from '../../types';
import { ensureElement } from '../../utils/utils.ts';


export class GalleryView extends Component<IGalleryData> {
  private catalogNode: HTMLElement;
  
  constructor(protected readonly container: HTMLElement) {
    super(container);
    this.catalogNode = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(nodeItems: HTMLElement[]) {
    this.catalogNode.replaceChildren(...nodeItems);
  }
}
