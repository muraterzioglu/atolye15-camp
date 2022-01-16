import {
  Controller,
  Query,
  Get,
  Response,
  Header,
  StreamableFile,
  ParseIntPipe,
} from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Readable } from 'stream';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get('?')
  @Header('Content-type', 'image/png')
  avatar(
    @Response({ passthrough: true }) res,
    @Query('name') name: string,
    @Query('size', ParseIntPipe) size: number,
    @Query('shape') shape: string,
  ): StreamableFile {
    const buffer = this.avatarsService.avatar(name, size, shape);

    const readableInstanceStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': 'inline; filename="avatar.png"',
    });
    return new StreamableFile(readableInstanceStream);
  }
}
