import * as Yup from "yup";

const CarCollateralSchema = Yup.object().shape({
  model: Yup.number().required("model is required"),
  loan: Yup.string().required("loan is required"),
  manufacturedYear: Yup.number().required("manufacturedYear is required"),
  chassisNumber: Yup.string().required("chassisNumber is required"),
  engineNumber: Yup.string().required("engineNumber is required"),
  carPlate: Yup.string().required("carPlate is required"),
  insuranceValue: Yup.string().required("insuranceValue is required"),
  carCC: Yup.string().required("carCC is required"),
});

export default CarCollateralSchema;
