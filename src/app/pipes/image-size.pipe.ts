import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSize',
  standalone: true,
})
export class ImageSizePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('size=50x50', 'size=100x100');
  }
}
