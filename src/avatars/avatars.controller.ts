import { Controller, Get, Query } from '@nestjs/common';
import { AvatarsService } from './avatars.service';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get('/avatar?')
  avatar(
    @Query('name') name: string,
    @Query('size') size: number,
    @Query('shape') shape: string,
  ): string {
    return this.avatarsService.avatar(name, size, shape);
  }
}
