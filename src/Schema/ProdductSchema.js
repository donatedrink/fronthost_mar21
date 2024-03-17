import * as Yup from "yup";

const ProdductSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),
    description: Yup.string()
    .min(3, "Description must be 3 characters at minimum")
    .required("Description is required"),

    vendorCompanyId: Yup.string().required("Select Vendor Company"),
});

export default ProdductSchema;
