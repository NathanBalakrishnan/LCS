import * as yup from "yup";

export const scoreCardSchema = yup.object().shape({
  actual: yup
    .number()
    .typeError("Achieved Value must be a number")
    .required("Achieved Value is required")
    .min(0, "Value cannot be negative")
    .max(999, "Value cannot exceed 3 digits"),
  measureDescription: yup.string().required("Notes are required").max(10, "Value cannot exceed 100"),
  periodicity: yup.string().required("Action Plan is required"),
});
