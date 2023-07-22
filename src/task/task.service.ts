import { Injectable } from '@nestjs/common';
// import {
//   Cron,
//   CronExpression,
//   Interval,
//   SchedulerRegistry,
//   Timeout,
// } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  //   constructor(private schedulerRegistry: SchedulerRegistry) {}

  //   @Cron('10 * * * * *', {
  //     name: 'testCronExpression',
  //   })
  async testCron() {
    console.log('test cron expression');
  }

  //   @Cron(CronExpression.EVERY_10_SECONDS, {
  //     name: 'testCronEnum',
  //   })
  async testCronEnum() {
    console.log('test cron enum every 10 seconds');
  }

  //   @Interval('testInterval', 5000)
  async testInterval() {
    console.log('This will run every 5 seconds');
  }

  //   @Timeout(15000)
  async setTimeOut() {
    // const testCronEnum = this.schedulerRegistry.getCronJob('testCronEnum');
    // testCronEnum.stop();
    console.log('TestCronEnumm will stop after 15 seconds');
  }
}
