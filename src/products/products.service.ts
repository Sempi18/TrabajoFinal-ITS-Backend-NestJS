import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginatorDto } from '../common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  // Obtener todos los productos con paginación
  async findAll(paginator: PaginatorDto) {
    const { page, perPage } = paginator || {};
    let metadata;

    const totalPages = await this.prismaService.product.count();
    const lastPage = Math.ceil(totalPages / perPage);

    if (page && perPage) {
      metadata = {
        page,       // Número de página
        totalPages, // Total de productos
        lastPage,   // Última página
      };
    }

    const data = await this.prismaService.product.findMany({
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage || undefined,
    });

    return {
      data,      // Lista de productos
      metadata,  // Información del paginado
    };
  }

  // Obtener un producto por su ID
  async findOne(id: number) {
    const product = await this.prismaService.product.findFirst({ where: { id } });
    if (!product) throw new NotFoundException('Producto Inexistente');
    return product;
  }

  // Buscar productos por nombre
  async findByName(name: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        name: {
          startsWith: name, // Coincidencia parcial en el nombre
        },
      },
    });

    if (products.length === 0) throw new NotFoundException('Producto Inexistente');
    return products;
  }

  // Crear un nuevo producto
  async create(createProduct: CreateProductDto) {
    const { name } = createProduct;
    const existingProduct = await this.prismaService.product.findFirst({ where: { name } });

    if (existingProduct) throw new BadRequestException('Ya existe un producto con el mismo nombre.');

    const newProduct = await this.prismaService.product.create({ data: createProduct });
    return newProduct;
  }

  // Actualizar un producto existente
  async update(id: number, updateProduct: UpdateProductDto) {
    const product = await this.prismaService.product.findFirst({ where: { id } });
    if (!product) throw new NotFoundException('Producto Inexistente');

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: updateProduct,
    });

    return updatedProduct;
  }

  // Eliminar un producto
  async remove(id: number) {
    const result = await this.prismaService.product.delete({ where: { id } });
    return result;
  }
}
