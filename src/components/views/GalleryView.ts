import { Component } from '../base/Component.ts';

export class GalleryView extends Component<IGallery> {
  private catalogElement: HTMLElement | null;
  
  constructor(protected readonly container: HTMLElement) {
    super(container);
    this.catalogElement = container.querySelector('.gallery');
  }

  set catalog(items: HTMLElement[]) {

  }

}