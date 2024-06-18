import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRegDto } from '../dto/userReg.dto';
import { UserLoginDto } from '../dto/userLogin.dto';
import { UserEntity } from '../user/user.entity';
import { ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUserName: jest.fn(),
            existsByEmail: jest.fn(),
            existsByUsername: jest.fn(),
            add: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('signIn', () => {
    it('should return success if username and password are correct', async () => {
      const user = {
        id: 1,
        userName: 'test',
        passwordHash: 'hashedPassword',
      } as UserEntity;
      jest.spyOn(usersService, 'findOneByUserName').mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      jest
        .spyOn(authService, 'getTokens')
        .mockResolvedValue({ accessToken: 'access', refreshToken: 'refresh' });
      jest.spyOn(authService, 'updateRefreshToken').mockResolvedValue();

      const result = await authService.signIn({
        userName: 'test',
        password: 'password',
      } as UserLoginDto);

      expect(result).toEqual({
        success: true,
        message: 'Successfully logged in',
        tokens: { accessToken: 'access', refreshToken: 'refresh' },
      });
    });

    it('should return failure if username is incorrect', async () => {
      jest.spyOn(usersService, 'findOneByUserName').mockResolvedValue(null);

      const result = await authService.signIn({
        userName: 'test',
        password: 'password',
      } as UserLoginDto);

      expect(result).toEqual({
        success: false,
        message: 'Invalid username',
      });
    });

    it('should return failure if password is incorrect', async () => {
      const user = {
        id: 1,
        userName: 'test',
        passwordHash: 'hashedPassword',
      } as UserEntity;
      jest.spyOn(usersService, 'findOneByUserName').mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      const result = await authService.signIn({
        userName: 'test',
        password: 'password',
      } as UserLoginDto);

      expect(result).toEqual({
        success: false,
        message: 'Invalid password',
      });
    });
  });

  describe('signUp', () => {
    it('should return success if registration is successful', async () => {
      const userRegDto = new UserRegDto();
      userRegDto.email = 'test@example.com';
      userRegDto.userName = 'testuser';
      userRegDto.password = 'password';
      userRegDto.firstName = 'Test';
      userRegDto.lastName = 'User';

      jest.spyOn(usersService, 'existsByEmail').mockResolvedValue(false);
      jest.spyOn(usersService, 'existsByUsername').mockResolvedValue(false);
      jest
        .spyOn(bcrypt, 'hash')
        .mockImplementation(() => Promise.resolve('hashedPassword'));
      jest
        .spyOn(usersService, 'add')
        .mockImplementation(() =>
          Promise.resolve(
            new UserEntity(
              'test@example.com',
              'testuser',
              'hashedPassword',
              'Test',
              'User',
            ),
          ),
        );
      jest
        .spyOn(authService, 'getTokens')
        .mockResolvedValue({ accessToken: 'access', refreshToken: 'refresh' });
      jest.spyOn(authService, 'updateRefreshToken').mockResolvedValue();

      const result = await authService.signUp(userRegDto);

      expect(result).toEqual({
        success: true,
        message: 'Registration successful',
        tokens: { accessToken: 'access', refreshToken: 'refresh' },
      });
    });

    it('should return failure if email already exists', async () => {
      jest.spyOn(usersService, 'existsByEmail').mockResolvedValue(true);

      const userRegDto = new UserRegDto();
      userRegDto.email = 'test@example.com';

      const result = await authService.signUp(userRegDto);

      expect(result).toEqual({
        success: false,
        message: 'Email already exists',
      });
    });

    it('should return failure if username already exists', async () => {
      jest.spyOn(usersService, 'existsByEmail').mockResolvedValue(false);
      jest.spyOn(usersService, 'existsByUsername').mockResolvedValue(true);

      const userRegDto = new UserRegDto();
      userRegDto.email = 'test@example.com';
      userRegDto.userName = 'testuser';

      const result = await authService.signUp(userRegDto);

      expect(result).toEqual({
        success: false,
        message: 'Username already exists',
      });
    });
  });

  describe('logout', () => {
    it('should return success on logout', async () => {
      jest.spyOn(usersService, 'update').mockResolvedValue();

      const result = await authService.logout(1);

      expect(result).toEqual({
        success: true,
        message: 'Logged out',
      });
    });
  });

  describe('refreshTokens', () => {
    it('should return success if refresh token is valid', async () => {
      const user = {
        id: 1,
        userName: 'testuser',
        refreshToken: 'hashedToken',
      } as UserEntity;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));
      jest
        .spyOn(authService, 'getTokens')
        .mockResolvedValue({ accessToken: 'access', refreshToken: 'refresh' });
      jest.spyOn(authService, 'updateRefreshToken').mockResolvedValue();

      const result = await authService.refreshTokens(1, 'refreshToken');

      expect(result).toEqual({
        success: true,
        message: 'Token refreshed',
        tokens: { accessToken: 'access', refreshToken: 'refresh' },
      });
    });

    it('should return failure if refresh token is invalid', async () => {
      const user = {
        id: 1,
        userName: 'testuser',
        refreshToken: 'hashedToken',
      } as UserEntity;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      await expect(
        authService.refreshTokens(1, 'refreshToken'),
      ).rejects.toThrow(new ForbiddenException('Access Denied'));
    });

    it('should return failure if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      const result = await authService.refreshTokens(1, 'refreshToken');

      expect(result).toEqual({
        success: false,
        message: 'Access denied',
      });
    });
  });
});
