import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';
import {
  AmountType,
  TransactionModel,
  TvaType,
} from '../models/transaction.model';

export interface UpdateTransactionCommand {
  id: number;
  userId: string;
  transaction: {
    userId: string;
    amountHT: number;
    type: AmountType;
    tva: TvaType;
    date: Date;
  };
}

export class UpdateTransactionUsescase
  implements UseCasePromise<UpdateTransactionCommand, TransactionModel>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: UpdateTransactionCommand): Promise<TransactionModel> {
    return this.transactionRepository.updateTransactionById(command);
  }
}
