import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
import { invertColor } from 'lib';
import seedColor from 'seed-color';

@Injectable()
export class AvatarsService {
  avatar(parName: string, parSize: number, parShape: string): Buffer {
    const name = parName.split(' ');
    const letter = {
      first: name[0].charAt(0),
      last: name[name.length - 1].charAt(0),
    };

    const text = `${letter.first}${letter.last}`;

    // Colors: For seed generation we make the name lover case to prevent type errors like "JoHn DoE"
    const colorBg = seedColor(parName.toLocaleLowerCase()).toHex();
    const colorFont = invertColor(colorBg);

    // Canvas Settings
    const sizeHalf = Math.round(parSize / 2);
    const fontSize = Math.round(parSize / 2);
    const posY = Math.round(parSize / 1.5);

    const canvas = createCanvas(parSize, parSize);
    const context = canvas.getContext('2d');
    context.textAlign = 'center';

    if (parShape == 'circle') {
      context.arc(sizeHalf, sizeHalf, sizeHalf, 0, Math.PI * 2, false);
    } else {
      context.rect(0, 0, parSize, parSize);
    }

    context.fillStyle = colorBg;
    context.fill();
    context.font = `bold ${fontSize}px Calibri`;
    context.fillStyle = colorFont;
    context.fillText(text, sizeHalf, posY);

    return canvas.toBuffer('image/png');
  }
}
