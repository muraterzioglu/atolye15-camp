import { Controller, Get, Query } from '@nestjs/common';
import { AvatarService } from './avatar.service';

@Controller()
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Get('/avatar?')
  avatar(
    @Query('name') name: string,
    @Query('size') size: number,
    @Query('shape') shape: string,
  ): string {
    return this.avatarService.avatar(name, size, shape);
  }
}
