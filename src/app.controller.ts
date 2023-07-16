import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  hello() {
    return 'Hello, World !';
  }

  @Get('seed')
  seed() {
    return this.appService.seed();
  }

  @Get('test-redis')
  async testRedis() {
    // const cacheBtcPrice = await this.cacheManager.get('btc-price');
    // if (cacheBtcPrice) {
    //   return cacheBtcPrice;
    // } else {
    //   const btcPrice = await axios
    //     .get('https://api.bitkub.com/api/market/ticker')
    //     .then((res) => res.data['THB_BTC'].last);
    //   await this.cacheManager.set('btc-price', btcPrice, 5000);
    //   return btcPrice;
    // }
    const btcPrice = await axios
      .get('https://api.bitkub.com/api/market/ticker')
      .then((res) => res.data['THB_BTC'].last);
    return btcPrice;
  }
}
