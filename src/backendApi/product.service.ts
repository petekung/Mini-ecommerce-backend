import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Sub_categories } from './entities/sub_categories.entity';
import * as fs from 'fs';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
    @InjectRepository(Sub_categories)
    private SubCateRepository: Repository<Sub_categories>,
  ) { }
  create(createProductDto: CreateProductDto) {
    console.log(createProductDto)
    const product1 = new Product();
    product1.img_product = createProductDto.img_product
    product1.product_name = createProductDto.product_name
    product1.product_detail = createProductDto.product_detail
    product1.sku_id = createProductDto.sku_id
    product1.stock = createProductDto.stock
    product1.subId = createProductDto.subId
    product1.product_price = createProductDto.product_price

    return this.ProductRepository.save(product1);
  }

  findAll() {
    return this.ProductRepository.find({
      relations: ["subCate"],
      order: {
        id: { direction: "DESC" }
      }
    });
  }

  findOne(id: number): Promise<Product> {
    return this.ProductRepository.findOne(
      {
        where: { id },
        relations: ["subCate"]
      }
    );
  }

  findSubCategory() {
    return this.SubCateRepository.find()
  }


  findCate(subId: string) {
    return this.ProductRepository.find({
      where: { subId: subId }
      //แก้บรรทัดนี้
    })
  }
  findCateLine(subId: string) {
    return this.ProductRepository.find({
      where: { subId: subId },
      relations: ["subCate"],
      take: 3//แก้บรรทัดนี้
    })

  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.ProductRepository.update(id, updateProductDto);
  }

  async remove(id: number) {

    const removeProduct = await this.ProductRepository.findOne({
      where: { id: id },
      relations: ["orderDetail"]
    })
    const filename = removeProduct.img_product
    await fs.unlink('./files/' + filename, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    await this.ProductRepository.remove(removeProduct)
  }


}
