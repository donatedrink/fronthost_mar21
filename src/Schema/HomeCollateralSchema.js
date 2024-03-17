import * as Yup from "yup";

const HomeCollateralSchema = Yup.object().shape({
  homeType: Yup.number().required("model is required"),
  amName: Yup.string().required("amName is required"),
  enName: Yup.string().required("enName is required"),
  homeArea: Yup.number().required("model is required"),
});

export default HomeCollateralSchema;
