import * as Yup from 'yup';

const ApplicationSchema = Yup.object().shape({
  clientId: Yup.string().required('ID is required'),
});

export default ApplicationSchema;
