import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from '../../configuration';
import { PayloadInterface } from 'src/common';
import { UsersService } from '../users.service';

@Injectable()
export class JWTPassport extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Expired tokens will be rejected
      secretOrKey: envs.secredKey,
    });
  }

  /**
   * Validates the JWT payload and retrieves the associated user from the database.
   * @param payload - The decoded JWT payload.
   * @returns The user associated with the JWT payload.
   * @throws UnauthorizedException if the user is not found.
   */
  async validate(payload: PayloadInterface) {
    try {
      // Retrieve the user using the user ID from the payload
      return await this.userService.findOne(+payload.sub);
    } catch (err) {
      // If the user is not found, throw an UnauthorizedException
      throw new UnauthorizedException(`User not found in Token: ${err.message}`);
    }
  }
}
