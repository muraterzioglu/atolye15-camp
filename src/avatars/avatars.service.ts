// import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';
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
    const colorBg = seedColor(name.toLocaleLowerCase()).toHex();
    const colorFont = invertColor(colorBg);

    // https://stackoverflow.com/questions/51568098/javascript-find-the-inverse-of-a-hex-code
    function invertColor(hex) {
      if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
      }
      // invert color components
      const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
      // pad each with zeros and return
      return '#' + padZero(r) + padZero(g) + padZero(b);
    }

    function padZero(str, len = 2) {
      const zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
    }

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
