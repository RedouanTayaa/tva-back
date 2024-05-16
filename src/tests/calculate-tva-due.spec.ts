import { createTransactionFixtures } from './transaction.fixtures';
import { AmountType, TvaType } from '../transactions/models/transaction.model';

describe('Calculate TVA Due', () => {
  let transactionFixtures: any;

  beforeEach(() => {
    transactionFixtures = createTransactionFixtures();
  });

  it('should return 0 tva due', async () => {
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date(),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully({
      collected: 0,
      deductible: 0,
      due: 0,
    });
  });

  it('should calculate TVA with just credit', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 200,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    const tvaDueExpected = {
      collected: 0,
      deductible: 60,
      due: -60,
    };
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date('2024-01-01'),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully(tvaDueExpected);
  });

  it('should calculate TVA with just debit', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 200,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    const tvaDueExpected = {
      collected: 60,
      deductible: 0,
      due: 60,
    };
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date('2024-01-01'),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully(tvaDueExpected);
  });

  it('should calculate TVA with date earlier', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2023-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 200,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    const tvaDueExpected = {
      collected: 40,
      deductible: 0,
      due: 40,
    };
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date('2024-01-01'),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully(tvaDueExpected);
  });

  it('should calculate TVA with another user', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '2',
      amountHT: 100,
      date: new Date('2023-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 200,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    const tvaDueExpected = {
      collected: 40,
      deductible: 0,
      due: 40,
    };
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date('2024-01-01'),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully(tvaDueExpected);
  });

  it('should calculate TVA with debit and credit', async () => {
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 100,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.CREDIT,
      tva: TvaType.TVA_20,
    });
    await transactionFixtures.whenTransactionIsCreated({
      userId: '1',
      amountHT: 200,
      date: new Date('2024-05-15 12:00:00'),
      type: AmountType.DEBIT,
      tva: TvaType.TVA_20,
    });
    const tvaDueExpected = {
      collected: 40,
      deductible: 20,
      due: 20,
    };
    await transactionFixtures.whenCalculateTvaDue({
      begin: new Date('2024-01-01'),
      end: new Date(),
      userId: '1',
    });
    transactionFixtures.thenShouldCalculateTvaDueSuccessfully(tvaDueExpected);
  });
});
