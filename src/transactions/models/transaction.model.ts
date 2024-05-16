export interface TransactionModel {
  id: number;
  date: Date;
  amountHT: number;
  type: AmountType;
  tva: TvaType;
  tvaAmount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TVADue {
  collected: number;
  deductible: number;
  due: number;
}

export enum AmountType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export enum TvaType {
  TVA_20 = '20%',
  TVA_10 = '10%',
  TVA_5_5 = '5.5%',
  TVA_2_1 = '2.1%',
  TVA_0 = '0%',
}
