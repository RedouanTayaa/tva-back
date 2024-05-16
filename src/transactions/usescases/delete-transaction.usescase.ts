import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';

export interface DeleteTransactionCommand {
  id: number;
  userId: string;
}

export class DeleteTransactionUsescase
  implements UseCasePromise<DeleteTransactionCommand, boolean>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: DeleteTransactionCommand): Promise<boolean> {
    return this.transactionRepository.deleteTransactionById(command);
  }
}
