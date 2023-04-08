import { PartialType } from '@nestjs/mapped-types';
import { CreateInsertProductOrderDto } from './create-insert_product_order.dto';

export class UpdateInsertProductOrderDto extends PartialType(CreateInsertProductOrderDto) {}
