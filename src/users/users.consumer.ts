import {
  Processor,
  Process,
  OnGlobalQueueCompleted,
  InjectQueue,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Processor('testQueue')
export class UserConsumer {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    @InjectQueue('testQueue') private testQueue: Queue,
  ) {}

  @Process('saveUserToDB')
  async saveUserToDB(job: Job<CreateUserDto>) {
    try {
      const newProfile = this.profilesRepository.create({
        firstname: job.data.firstname,
        lastname: job.data.lastname,
      });
      await this.profilesRepository.save(newProfile);
      const newUser = this.usersRepository.create({
        email: job.data.email,
        profile: newProfile,
      });
      await this.usersRepository.save(newUser);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  // @OnGlobalQueueCompleted()
  // async onGlobalCompleted(jobId: number, result: any) {
  //   const job = await this.testQueue.getJob(jobId);
  //   console.log(
  //     '(Global) on completed: job ',
  //     job.id,
  //     ' -> result: ',
  //     result,
  //     ' - ',
  //     new Date().toLocaleString(),
  //   );
  // }
}
