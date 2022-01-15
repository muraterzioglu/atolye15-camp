// import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { createCanvas } from 'canvas';

@Injectable()
export class AvatarsService {
  avatar(name: string, size: number, shape: string): Buffer {
    // Get Letters
    const named = name.split(' ');
    const first = named[0].charAt(0);
    const last = named[named.length - 1].charAt(0);
    const text = first + '' + last;

    // Canvas Settings
    const width = 420;
    const height = 420;
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    if (shape == 'circle') {
      context.arc(210, 210, 210, 0, Math.PI * 2, false);
      context.fillStyle = 'yellow';
      context.fill();
      context.font = 'bold 120% Calibri';
      context.textAlign = 'center';

      context.fillStyle = '#000000';
      context.fillText(text, 210, 210 + 30);

      return canvas.toBuffer('image/png');
    } else if (shape == 'square') {
      context.rect(0, 0, 420, 420);
      context.fillStyle = '#000';
      context.fill();
      context.font = 'bold 120% Calibri';
      context.textAlign = 'center';

      context.fillStyle = '#FFF';
      context.fillText(text, 210, 240);

      return canvas.toBuffer('image/png');
    }
  }
}
