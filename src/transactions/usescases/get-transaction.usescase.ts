import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';
import { TransactionModel } from '../models/transaction.model';

export interface GetTransactionCommand {
  id: number;
}

export class GetTransactionUsescase
  implements UseCasePromise<GetTransactionCommand, TransactionModel>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: GetTransactionCommand): Promise<TransactionModel> {
    return this.transactionRepository.getTransactionById(command);
  }
}
