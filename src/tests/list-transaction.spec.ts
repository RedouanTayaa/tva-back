import { createTransactionFixtures } from './transaction.fixtures';
import { AmountType, TvaType } from '../transactions/models/transaction.model';

describe('List transaction', () => {
  let transactionFixtures: any;

  beforeEach(() => {
    transactionFixtures = createTransactionFixtures();
  });

  it('should empty list transaction of a user', async () => {
    await transactionFixtures.whenListTransaction({ userId: '1' });
    transactionFixtures.thenShouldGetTransactionsSuccessfully([]);
  });

  it('should list transaction of a user', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    const transactionExpected = {
      id: 1,
      amountHT: 100,
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
      tvaAmount: 100 * 0.2,
      userId: '1',
      date: new Date('2024-05-15 12:00:00'),
      createdAt: new Date('2024-05-15 12:00:00'),
      updatedAt: new Date('2024-05-15 12:00:00'),
    };
    await transactionFixtures.whenListTransaction({ userId: '1' });
    transactionFixtures.thenShouldGetTransactionsSuccessfully([
      transactionExpected,
    ]);
  });
});
