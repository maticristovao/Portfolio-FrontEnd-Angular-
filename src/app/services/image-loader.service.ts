import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() { }

  async loadImage(imageUrl: string): Promise<void>{
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageUrl;

      image.onload = () => {
        // La imagen se cargó exitosamente
        resolve();
      };

      image.onerror = (error) => {
        // Hubo un error al cargar la imagen
        reject(error);
      };
    });
  }
}
