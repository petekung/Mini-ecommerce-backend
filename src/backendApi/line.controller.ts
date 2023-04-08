import { Controller, Post, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { LineService } from './line.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('line')
export class LineController {
  constructor(private lineService: LineService) {}

  @Post('rich-menu')
  async createRichMenu(@Body() body: any): Promise<any> {
    return this.lineService.createRichMenu(body);
  }

  @Post('rich-menu/:richMenuId/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadRichMenuImage(@Param('richMenuId') richMenuId: string, @UploadedFile() image): Promise<void> {
    // const lineRichMenuId = await this.lineService.createRichMenu(richMenuId,image.buffer)
    return this.lineService.uploadRichMenuImage(richMenuId, image.buffer);
  }

  @Post('rich-menu/:richMenuId/link-all')
  async linkRichMenuToAllUsers(@Param('richMenuId') richMenuId: string): Promise<void> {
    return this.lineService.linkRichMenuToAllUsers(richMenuId);
  }
}
