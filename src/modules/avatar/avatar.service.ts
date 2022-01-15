import { Injectable } from '@nestjs/common';

@Injectable()
export class AvatarService {
  avatar(name: string, size: number, shape: string): string {
    return `Name: ${name} Size: ${size} Shape: ${shape}`;
  }
}
