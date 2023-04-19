import { Controller, Post, Param, Get } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.entity';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Post()
  create(): Promise<Wallet> {
    return this.walletService.create({
      adress: '0xssswwWweqe',
      private: '0xssswwWweqe',
    } as Wallet);
  }

  @Get(':address')
  async getBalance(@Param('address') address: string): Promise<string> {
    return await this.walletService.getBalance(address);
  }
}
