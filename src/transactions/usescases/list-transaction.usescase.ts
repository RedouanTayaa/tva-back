import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';
import { TransactionModel } from '../models/transaction.model';

export interface ListTransactionCommand {
  userId: string;
}

export class ListTransactionUsescase
  implements UseCasePromise<ListTransactionCommand, TransactionModel[]>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: ListTransactionCommand): Promise<TransactionModel[]> {
    return this.transactionRepository.getTransactionsByUserId(command);
  }
}
