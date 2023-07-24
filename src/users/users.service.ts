import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    @InjectQueue('testQueue') private testQueue: Queue,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const job = await this.testQueue.add('saveUserToDB', createUserDto, {
        // removeOnComplete: true,
        delay: 5000,
      });
      const result = await job.finished();
      return result;
    } catch (err) {
      console.log(err);
      throw new ExceptionsHandler(err);
    }
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
