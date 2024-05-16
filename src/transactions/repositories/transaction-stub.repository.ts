import { TransactionRepository } from './transaction.repository';
import { CreateTransactionCommand } from '../usescases/create-transaction.usescase';
import { AmountType, TransactionModel, TVADue, TvaType } from '../models/transaction.model';
import { UpdateTransactionCommand } from '../usescases/update-transaction.usescase';
import { ListTransactionCommand } from '../usescases/list-transaction.usescase';
import { GetTransactionCommand } from '../usescases/get-transaction.usescase';
import { DeleteTransactionCommand } from '../usescases/delete-transaction.usescase';
import { CalculateTvaCommand } from '../usescases/calculate-tva.usescase';

export class TransactionStubRepository implements TransactionRepository {
  private transactions: TransactionModel[] = [];

  constructor() {
    this.transactions = [];
  }

  createTransaction(
    params: CreateTransactionCommand,
  ): Promise<TransactionModel> {
    if (params.amountHT < 0) {
      return new Promise((resolve, reject) =>
        reject(new Error('Le montant doit être positif')),
      );
    }

    if (params.date > new Date()) {
      return new Promise((resolve, reject) =>
        reject(
          new Error(
            'La date de la transaction doit être inférieure à la date actuelle',
          ),
        ),
      );
    }

    const transaction: TransactionModel = {
      ...params,
      id: this.transactions.length + 1,
      tvaAmount: this.calculateTva(params.amountHT, params.tva),
      createdAt: new Date('2024-05-15 12:00:00'),
      updatedAt: new Date('2024-05-15 12:00:00'),
    };
    this.transactions = [...this.transactions, transaction];

    return new Promise((resolve) => resolve(transaction));
  }

  updateTransactionById(
    params: UpdateTransactionCommand,
  ): Promise<TransactionModel> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === params.id,
    );

    if (!transaction || transaction.userId !== params.userId) {
      return new Promise((resolve, reject) =>
        reject(new Error('Transaction not found')),
      );
    }

    if (params.transaction.amountHT < 0) {
      return new Promise((resolve, reject) =>
        reject(new Error('Le montant doit être positif')),
      );
    }

    if (params.transaction.date > new Date()) {
      return new Promise((resolve, reject) =>
        reject(
          new Error(
            'La date de la transaction doit être inférieure à la date actuelle',
          ),
        ),
      );
    }

    const updatedTransaction = {
      ...transaction,
      ...params.transaction,
      tvaAmount: this.calculateTva(
        params.transaction.amountHT,
        transaction.tva,
      ),
      updatedAt: new Date('2024-05-15 12:00:00'),
    };

    this.transactions = this.transactions.map((transaction) =>
      transaction.id === updatedTransaction.id
        ? updatedTransaction
        : transaction,
    );

    return Promise.resolve(updatedTransaction);
  }

  getTransactionById(params: GetTransactionCommand): Promise<TransactionModel> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === params.id,
    );

    if (!transaction) {
      return new Promise((resolve, reject) =>
        reject(new Error("La transaction n'existe pas")),
      );
    }

    return Promise.resolve(transaction);
  }
  getTransactionsByUserId(
    params: ListTransactionCommand,
  ): Promise<TransactionModel[]> {
    const transactions = this.transactions.filter(
      (transaction) => transaction.userId === params.userId,
    );
    return Promise.resolve(transactions);
  }

  deleteTransactionById(params: DeleteTransactionCommand): Promise<boolean> {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === params.id,
    );

    if (!transaction || transaction.userId !== params.userId) {
      return Promise.resolve(false);
    }

    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== params.id,
    );

    return Promise.resolve(true);
  }

  calculateTvaDue(params: CalculateTvaCommand): Promise<TVADue> {
    const tvaDue: TVADue = {
      collected: 0,
      deductible: 0,
      due: 0,
    };
    const transactions = this.transactions.filter(
      (transaction) =>
        transaction.date >= params.begin &&
        transaction.date <= params.end &&
        transaction.userId === params.userId,
    );

    transactions.forEach((transaction) => {
      if (transaction.type === AmountType.DEBIT) {
        tvaDue.collected += transaction.tvaAmount;
      } else {
        tvaDue.deductible += transaction.tvaAmount;
      }
    });

    tvaDue.due = tvaDue.collected - tvaDue.deductible;

    return Promise.resolve(tvaDue);
  }

  private calculateTva(amountHT: number, tva: string): number {
    switch (tva) {
      case TvaType.TVA_20:
        return amountHT * 0.2;
      case TvaType.TVA_10:
        return amountHT * 0.1;
      case TvaType.TVA_5_5:
        return amountHT * 0.055;
      case TvaType.TVA_2_1:
        return amountHT * 0.021;
      case TvaType.TVA_0:
        return 0;
      default:
        return 0;
    }
  }
}
