import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Wallet } from './wallet.entity';
import Web3 from 'web3';

@Injectable()
export class WalletService {
  web3: any;
  constructor(
    @InjectRepository(Wallet) private walletsRepository: Repository<Wallet>,
  ) {
    const provider = 'http://localhost:8503';
    const web3Provider = new Web3.providers.HttpProvider(provider);
    this.web3 = new Web3(web3Provider);
  }

  create(wallet: Wallet): Promise<Wallet> {
    const account = this.web3.eth.accounts.create();
    return account as any;
    return this.walletsRepository.save(wallet);
  }

  async getBalance(address: string): Promise<string> {
    return this.web3.utils.fromWei(await this.web3.eth.getBalance(address));
  }
}
