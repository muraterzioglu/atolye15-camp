import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarsService {
  avatar(name: string, size: number, shape: string): string {
    return `Name: ${name} Size: ${size} Shape: ${shape}`;
  }
}
