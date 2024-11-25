import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';
import { PayloadInterface, Public, Roles } from '../common';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registro de usuario
  @Post('auth/register')
  @Public()
  async register(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const result = await this.usersService.register(createUserDto);
    response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Created' });
  }

  // Login de usuario
  @Post('auth/login')
  @Public()
  async login(@Body() loginUserDto: LoginDto) {
    return this.usersService.login(loginUserDto);
  }

  // Obtener todos los usuarios (solo admin y superadmin)
  @Get()
  @Roles('admin', 'superadmin')
  async findAll() {
    return this.usersService.findAll();
  }

  // Obtener un usuario por ID (solo admin y superadmin)
  @Get(':id')
  @Roles('admin', 'superadmin')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  // Actualizar un usuario (solo superadmin)
  @Patch(':id')
  @Roles('superadmin')
  async update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Eliminar un usuario (solo superadmin)
  @Delete(':id')
  @Roles('superadmin')
  async remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
