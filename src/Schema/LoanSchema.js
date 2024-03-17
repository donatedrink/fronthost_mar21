import * as Yup from 'yup';

const LoanSchema = Yup.object().shape({
  compulsaryAmount: Yup.number().required('Compulsary is Blank'),
  loansavingAmount: Yup.number().required('Loan Saving is Blank'),
  shareAmount: Yup.number().required('Share is Blank'),

  sch: Yup.number().required('SCH is Blank'),
  lis: Yup.number().required('LIS is Blank'),
  multiplier: Yup.number().required('Multiplier is Blank'),
  stamp: Yup.number().required('Stamp is Blank'),
});

export default LoanSchema;
