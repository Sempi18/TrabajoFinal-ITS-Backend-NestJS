import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly auth: AuthService,
  ) {}

  /**
   * Registers a new user after validating input and creating a hashed password.
   * @param createUserDto The data to create a user.
   * @returns The newly created user.
   */
  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    
    // Check if the user already exists
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (user) throw new BadRequestException('El correo ya está registrado');
    
    // Hash the password
    const hashedPassword = await this.auth.hashPassword(password);
    
    // Create the new user
    const newUser = await this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    
    delete newUser.password;  // Remove password from the returned object
    return newUser;
  }

  /**
   * Logs in a user by validating credentials and generating a JWT.
   * @param credential The user's login credentials.
   * @returns The user and JWT token.
   */
  async login(credential: LoginDto) {
    const { email, password } = credential;

    // Find user by email
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) throw new UnauthorizedException('Usuario no Encontrado');
    
    // Compare the password
    const passwordOk = await this.auth.passwordCompare(password, user.password);
    if (!passwordOk) throw new UnauthorizedException('Password Incorrecta');
    
    // Create JWT token
    const token = this.auth.createJWT(user);
    
    // Remove password from the user object before returning
    delete user.password;
    return { token, user };
  }

  /**
   * Retrieves a user by their ID.
   * @param id The user's ID.
   * @returns The user or throws an error if not found.
   */
  async findOne(id: number) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  /**
   * Retrieves all users from the database.
   * @returns A list of all users.
   */
  async findAll() {
    return await this.prismaService.user.findMany();
  }

  /**
   * Updates a user's data.
   * @param id The user's ID.
   * @param UpdateUser The data to update.
   * @returns The updated user.
   */
  async update(id: number, UpdateUser: UpdateUserDto) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('Usuario Inexistente');
    
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: UpdateUser,
    });
    return updatedUser;
  }

  /**
   * Deletes a user by ID.
   * @param id The user's ID.
   * @returns The deleted user.
   */
  async remove(id: number) {
    const deletedUser = await this.prismaService.user.delete({ where: { id } });
    return deletedUser;
  }
}
