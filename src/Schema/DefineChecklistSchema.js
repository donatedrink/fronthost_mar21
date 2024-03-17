import * as Yup from "yup";

const DefineChecklistSchema = Yup.object().shape({
    chkListTypeId: Yup.string().required("Select Check List Type"),
});

export default DefineChecklistSchema;
