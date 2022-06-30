import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
import { invertColor } from 'lib';
import seedColor from 'seed-color';

@Injectable()
export class AvatarsService {
  avatar(name: string, size: number, shape: string): Buffer {
    // Get Letters
    const named = name.split(' ');
    const nameFirst = named[0];
    const letterFirst = nameFirst.charAt(0);
    let text = letterFirst;

    if (named.length > 1) {
      // If the user have more than one name or have surname we calc the last letter.
      text = letterFirst + '' + named[named.length - 1].charAt(0);
    }

    // Colors
    // For seed generation we make the name lover case to prevent type errors like "JoHn DoE"
    const colorBg = seedColor(name.toLocaleLowerCase()).toHex();
    const colorFont = invertColor(colorBg);

    // Canvas Settings
    const sizeHalf = Math.round(size / 2);
    const fontSize = Math.round(size / 2);
    const posY = Math.round(size / 1.5);

    const canvas = createCanvas(size, size);
    const context = canvas.getContext('2d');
    context.textAlign = 'center';

    if (shape == 'circle') {
      context.arc(sizeHalf, sizeHalf, sizeHalf, 0, Math.PI * 2, false);
    } else {
      context.rect(0, 0, size, size);
    }

    context.fillStyle = colorBg;
    context.fill();
    context.font = `bold ${fontSize}px Calibri`;
    context.fillStyle = colorFont;
    context.fillText(text, sizeHalf, posY);

    return canvas.toBuffer('image/png');
  }
}
