import * as Yup from 'yup';

const ApplicationSubmitSchemaFile = Yup.object().shape({
  amFirstname: Yup.string().min(2, 'First Name must be 2 characters at minimum').required('First Name is required'),
  amMiddlename: Yup.string().min(2, 'Middle Name must be 2 characters at minimum').required('Middle Name is required'),
  amLastname: Yup.string().min(2, 'Last Name must be 2 characters at minimum').required('Last Name is required'),
  address: Yup.string().min(2, 'Address must be 2 characters at minimum').required('Address is required'),
  amAddress: Yup.string().min(2, 'Address must be 2 characters at minimum').required('Address is required'),
  isMarried: Yup.boolean(),
});

export default ApplicationSubmitSchemaFile;

// phoneNumber: Yup.string().min(9, 'Phone number must be exactly 9 characters').max(9, 'exceeds 9 characters').required('Phone number is required'),
// amDisplayName: Yup.string().min(8, 'Display Name must be 8 characters at minimum').required('Display Name is required'),
// address: Yup.string().min(2, 'Address must be 2 characters at minimum').required('Address is required'),
// amAddress: Yup.string().min(2, 'Address must be 2 characters at minimum').required('Address is required'),
// amFirstname: Yup.string().min(2, 'First Name must be 2 characters at minimum').required(' First Name is required'),
// 
// amLastname: Yup.string().min(2, 'Last Name must be 2 characters at minimum').required('Last Name is required'),
// amDisplayName: Yup.string().min(8, 'Display Name must be 8 characters at minimum').required('Display Name is required'),
// displayName: Yup.string().min(8, 'Display Name must be 8 characters at minimum').required('Display Name is required'),
//   firstname: Yup.string().min(2, 'First Name must be 2 characters at minimum').required('First Name is required'),
//   middlename: Yup.string().min(2, 'Middle Name must be 2 characters at minimum').required('Middle Name is required'),
//   lastname: Yup.string().min(2, 'Last Name must be 2 characters at minimum').required('Last Name is required'),
