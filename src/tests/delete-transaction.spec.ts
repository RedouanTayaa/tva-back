import { createTransactionFixtures } from './transaction.fixtures';
import { AmountType, TvaType } from '../transactions/models/transaction.model';

describe('Delete transaction', () => {
  let transactionFixtures: any;

  beforeEach(() => {
    transactionFixtures = createTransactionFixtures();
  });

  it('should not delete transaction empty list', async () => {
    await transactionFixtures.whenDeleteTransaction({ id: 1, userId: '1' });
    transactionFixtures.thenShouldDeleteTransaction(false);
  });

  it('should not delete transaction not owner', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenDeleteTransaction({ id: 1, userId: '2' });
    transactionFixtures.thenShouldDeleteTransaction(false);
  });

  it('should delete transaction', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenDeleteTransaction({ id: 1, userId: '1' });
    transactionFixtures.thenShouldDeleteTransaction(true);
  });
});
