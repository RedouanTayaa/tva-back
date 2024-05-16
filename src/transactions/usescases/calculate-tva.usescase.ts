import { TransactionRepository } from '../repositories/transaction.repository';
import { UseCasePromise } from '../../base/use-case';
import { TVADue } from '../models/transaction.model';

export interface CalculateTvaCommand {
  begin: Date;
  end: Date;
  userId: string;
}

export class CalculateTvaUsescase
  implements UseCasePromise<CalculateTvaCommand, TVADue>
{
  constructor(private transactionRepository: TransactionRepository) {}
  public execute(command: CalculateTvaCommand): Promise<TVADue> {
    return this.transactionRepository.calculateTvaDue(command);
  }
}
