import * as yup from "yup";

export const authSchema = yup.object().shape({
  studentId: yup.string().required(),
  password: yup.string().min(8).required(),
});
