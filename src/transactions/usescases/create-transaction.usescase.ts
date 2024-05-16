import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';
import {
  AmountType,
  TransactionModel,
  TvaType,
} from '../models/transaction.model';

export interface CreateTransactionCommand {
  userId: string;
  amountHT: number;
  type: AmountType;
  tva: TvaType;
  date: Date;
}

export class CreateTransactionUsescase
  implements UseCasePromise<CreateTransactionCommand, TransactionModel>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: CreateTransactionCommand): Promise<TransactionModel> {
    return this.transactionRepository.createTransaction(command);
  }
}
