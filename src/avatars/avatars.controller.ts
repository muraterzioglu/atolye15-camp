import {
  Controller,
  Query,
  Get,
  Response,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { Readable } from 'stream';

/*
TODO: Make Colors Random with contrast
TODO: Make logos by size
TODO: Connect Database and Check that if it's already make!
*/

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarsService: AvatarsService) {}

  @Get('?')
  @Header('Content-type', 'image/png')
  avatar(
    @Response({ passthrough: true }) res,
    @Query('name') name: string,
    @Query('size') size: number,
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
