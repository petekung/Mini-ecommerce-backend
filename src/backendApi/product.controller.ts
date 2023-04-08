import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('/file')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      }

    })
  }))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.filename
  }
  

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':product_id')
  findOne(@Param('product_id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('picture/:image')
  getimage(@Param('image') imgProduct, @Res() res) {
    return res.sendFile(imgProduct, { root: './files' }
    )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  @Get('/category/subcategory')
  findSubCategory(){
    return this.productService.findSubCategory();
  }
  @Get('/line/:subId')
  findkeybord(@Param('subId') subId: string){
      return this.productService.findCate(subId);
  }


}
