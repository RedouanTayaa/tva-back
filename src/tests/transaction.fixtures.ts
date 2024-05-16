import {
  CreateTransactionCommand,
  CreateTransactionUsescase,
} from '../transactions/usescases/create-transaction.usescase';
import { TransactionStubRepository } from '../transactions/repositories/transaction-stub.repository';
import {
  TransactionModel,
  TVADue,
} from '../transactions/models/transaction.model';
import {
  UpdateTransactionCommand,
  UpdateTransactionUsescase,
} from '../transactions/usescases/update-transaction.usescase';
import {
  ListTransactionCommand,
  ListTransactionUsescase,
} from '../transactions/usescases/list-transaction.usescase';
import {
  GetTransactionCommand,
  GetTransactionUsescase,
} from '../transactions/usescases/get-transaction.usescase';
import {
  DeleteTransactionCommand,
  DeleteTransactionUsescase,
} from '../transactions/usescases/delete-transaction.usescase';
import {
  CalculateTvaCommand,
  CalculateTvaUsescase,
} from '../transactions/usescases/calculate-tva.usescase';

export const createTransactionFixtures = () => {
  let errorMessage: string;
  let transaction: TransactionModel;
  let transactions: TransactionModel[];
  let success: boolean;
  let tvaDue: TVADue;
  const transactionRepository = new TransactionStubRepository();
  const createTransactionUseCase = new CreateTransactionUsescase(
    transactionRepository,
  );
  const updateTransactionUseCase = new UpdateTransactionUsescase(
    transactionRepository,
  );
  const listTransactionUseCase = new ListTransactionUsescase(
    transactionRepository,
  );
  const getTransactionUseCase = new GetTransactionUsescase(
    transactionRepository,
  );
  const deleteTransactionUseCase = new DeleteTransactionUsescase(
    transactionRepository,
  );
  const calculateTvaUseCase = new CalculateTvaUsescase(transactionRepository);

  return {
    whenTransactionIsCreated: async (
      createTransactionCommand: CreateTransactionCommand,
    ) => {
      return createTransactionUseCase
        .execute(createTransactionCommand)
        .then((transactionReturn) => {
          transaction = transactionReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenTransactionIsUpdated: async (
      udpdateTransactionCommand: UpdateTransactionCommand,
    ) => {
      return updateTransactionUseCase
        .execute(udpdateTransactionCommand)
        .then((transactionReturn) => {
          transaction = transactionReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenListTransaction: async (
      listTransactionCommand: ListTransactionCommand,
    ) => {
      return listTransactionUseCase
        .execute(listTransactionCommand)
        .then((transactionReturn) => {
          transactions = transactionReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenGetTransaction: async (
      getTransactionCommand: GetTransactionCommand,
    ) => {
      return getTransactionUseCase
        .execute(getTransactionCommand)
        .then((transactionReturn) => {
          transaction = transactionReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenDeleteTransaction: async (
      deleteTransactionCommand: DeleteTransactionCommand,
    ) => {
      return deleteTransactionUseCase
        .execute(deleteTransactionCommand)
        .then((successReturn) => {
          success = successReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    whenCalculateTvaDue: async (calculateTvaCommand: CalculateTvaCommand) => {
      return calculateTvaUseCase
        .execute(calculateTvaCommand)
        .then((tvaDueReturn) => {
          tvaDue = tvaDueReturn;
        })
        .catch((error) => {
          errorMessage = error.message;
        });
    },
    thenShouldCreateOrUpdateTransactionSuccessfully: (
      transactionExpected: TransactionModel,
    ) => {
      expect(transaction).toEqual(transactionExpected);
    },
    thenShouldCreateOrUpdateTransactionFailed: (message: string) => {
      expect(errorMessage).toEqual(message);
    },
    thenShouldGetTransactionsSuccessfully: (
      transactionExpected: TransactionModel[],
    ) => {
      expect(transactions).toEqual(transactionExpected);
    },
    thenShouldGetTransactionSuccessfully: (
      transactionExpected: TransactionModel,
    ) => {
      expect(transaction).toEqual(transactionExpected);
    },
    thenShouldGetTransactionFailed: (message: string) => {
      expect(errorMessage).toEqual(message);
    },
    thenShouldDeleteTransaction: (successExpected: boolean) => {
      expect(success).toEqual(successExpected);
    },
    thenShouldCalculateTvaDueSuccessfully: (tvaDueExpected: TVADue) => {
      expect(tvaDue).toEqual(tvaDueExpected);
    },
  };
};
