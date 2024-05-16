import { createTransactionFixtures } from './transaction.fixtures';
import { AmountType, TvaType } from '../transactions/models/transaction.model';

describe('Create transaction', () => {
  let transactionFixtures: any;

  beforeEach(() => {
    transactionFixtures = createTransactionFixtures();
  });

  it('should create transaction with positive amount', async () => {
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
    transactionFixtures.thenShouldCreateOrUpdateTransactionSuccessfully(
      transactionExpected,
    );
  });

  it('should create transaction failed negative amount', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: -100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    transactionFixtures.thenShouldCreateOrUpdateTransactionFailed(
      'Le montant doit être positif',
    );
  });

  it('should create transaction failed with date in future', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date().setFullYear(new Date().getFullYear() + 1),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    transactionFixtures.thenShouldCreateOrUpdateTransactionFailed(
      'La date de la transaction doit être inférieure à la date actuelle',
    );
  });

  it('should create transaction with date of today', async () => {
    const today = new Date();
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: today,
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
      date: today,
      createdAt: new Date('2024-05-15 12:00:00'),
      updatedAt: new Date('2024-05-15 12:00:00'),
    };
    transactionFixtures.thenShouldCreateOrUpdateTransactionSuccessfully(
      transactionExpected,
    );
  });
});
