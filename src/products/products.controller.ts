import { HttpStatus, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginatorDto } from '../common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query() paginator: PaginatorDto, // Paginación recibida desde la query string
    @Res() response: Response,
  ) {
    const result = await this.productsService.findAll(paginator);
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Listado de Productos' });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this.productsService.findOne(id);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).json({ ok: false, msg: 'Producto no encontrado' });
    }
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Encontrado' });
  }

  @Get('/search/:name')
  async findByName(@Param('name') name: string, @Res() response: Response) {
    const result = await this.productsService.findByName(name);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).json({ ok: false, msg: 'Producto no encontrado' });
    }
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Encontrado' });
  }

  @Post()
  @Roles('admin','superadmin') // Solo accesible por admin y superadmin
  async create(@Body() createProductDto: CreateProductDto) {
    const result = await this.productsService.create(createProductDto);
    return { ok: true, result, msg: 'Producto Creado' };
  }

  @Patch(':id')
  @Roles('admin','superadmin') // Solo accesible por admin y superadmin
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).json({ ok: false, msg: 'Producto no encontrado' });
    }
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Modificado' });
  }

  @Delete(':id')
  @Roles('admin','superadmin') // Solo accesible por admin y superadmin
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this.productsService.remove(id);
    if (!result) {
      return response.status(HttpStatus.NOT_FOUND).json({ ok: false, msg: 'Producto no encontrado' });
    }
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Eliminado' });
  }
}
