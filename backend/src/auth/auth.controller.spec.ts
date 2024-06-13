import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRegDto } from '../dto/userReg.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';
import AuthStatusInterface from './interfaces/auth-status.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            signIn: jest.fn(),
            logout: jest.fn(),
            refreshTokens: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should return auth status on successful signup', async () => {
      const result: AuthStatusInterface = {
        success: true,
        message: 'User registered successfully',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await authController.signUp(new UserRegDto())).toBe(result);
    });

    it('should throw HttpException on failed signup', async () => {
      const result: AuthStatusInterface = {
        success: false,
        message: 'User already exists',
      };
      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      await expect(authController.signUp(new UserRegDto())).rejects.toThrow(
        new HttpException(result.message, HttpStatus.CONFLICT),
      );
    });
  });

  describe('signIn', () => {
    it('should return auth status on successful signin', async () => {
      const result: AuthStatusInterface = {
        success: true,
        message: 'User logged in successfully',
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await authController.signIn(new UserLoginDto())).toBe(result);
    });

    it('should throw HttpException on failed signin', async () => {
      const result: AuthStatusInterface = {
        success: false,
        message: 'Invalid credentials',
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      await expect(authController.signIn(new UserLoginDto())).rejects.toThrow(
        new HttpException(result.message, HttpStatus.CONFLICT),
      );
    });
  });

  describe('logout', () => {
    it('should return auth status on successful logout', async () => {
      const result: AuthStatusInterface = {
        success: true,
        message: 'User logged out successfully',
      };
      jest.spyOn(authService, 'logout').mockResolvedValue(result);

      const req = { user: { sub: '1' } } as unknown as Request;
      expect(await authController.logout(req)).toBe(result);
    });

    it('should throw HttpException on failed logout', async () => {
      const result: AuthStatusInterface = {
        success: false,
        message: 'Logout failed',
      };
      jest.spyOn(authService, 'logout').mockResolvedValue(result);

      const req = { user: { sub: '1' } } as unknown as Request;
      await expect(authController.logout(req)).rejects.toThrow(
        new HttpException(result.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('refresh', () => {
    it('should return auth status on successful token refresh', async () => {
      const result: AuthStatusInterface = {
        success: true,
        message: 'Tokens refreshed successfully',
      };
      jest.spyOn(authService, 'refreshTokens').mockResolvedValue(result);

      const req = {
        user: { sub: '1', refreshToken: 'refresh-token' },
      } as unknown as Request;
      expect(await authController.refresh(req)).toBe(result);
    });

    it('should throw HttpException on failed token refresh', async () => {
      const result: AuthStatusInterface = {
        success: false,
        message: 'Token refresh failed',
      };
      jest.spyOn(authService, 'refreshTokens').mockResolvedValue(result);

      const req = {
        user: { sub: '1', refreshToken: 'refresh-token' },
      } as unknown as Request;
      await expect(authController.refresh(req)).rejects.toThrow(
        new HttpException(result.message, HttpStatus.BAD_REQUEST),
      );
    });
  });
});
