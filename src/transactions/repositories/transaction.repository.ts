import { CreateTransactionCommand } from '../usescases/create-transaction.usescase';
import { TransactionModel, TVADue } from '../models/transaction.model';
import { UpdateTransactionCommand } from '../usescases/update-transaction.usescase';
import { ListTransactionCommand } from '../usescases/list-transaction.usescase';
import { GetTransactionCommand } from '../usescases/get-transaction.usescase';
import { DeleteTransactionCommand } from '../usescases/delete-transaction.usescase';
import { CalculateTvaCommand } from '../usescases/calculate-tva.usescase';

export abstract class TransactionRepository {
  abstract createTransaction(
    params: CreateTransactionCommand,
  ): Promise<TransactionModel>;
  abstract getTransactionById(
    params: GetTransactionCommand,
  ): Promise<TransactionModel>;
  abstract getTransactionsByUserId(
    params: ListTransactionCommand,
  ): Promise<TransactionModel[]>;
  abstract updateTransactionById(
    params: UpdateTransactionCommand,
  ): Promise<TransactionModel>;
  abstract deleteTransactionById(
    params: DeleteTransactionCommand,
  ): Promise<boolean>;
  abstract calculateTvaDue(params: CalculateTvaCommand): Promise<TVADue>;
}
