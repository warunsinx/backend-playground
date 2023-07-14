import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newProfile = this.profilesRepository.create({
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
    });
    await this.profilesRepository.save(newProfile);
    const newUser = this.usersRepository.create({
      email: createUserDto.email,
      profile: newProfile,
    });
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const profile = await this.profilesRepository.findOne({
      where: { user: { id } },
    });
    const updateProfile = this.profilesRepository.merge(profile, updateUserDto);
    return this.profilesRepository.save(updateProfile);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
