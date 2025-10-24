import * as yup from "yup";

export const scoreCardSchema =(target)=> yup.object().shape({
  actual: yup
    .number()
    .typeError("Achieved Value must be a number")
    .required("Achieved Value is required")
    .min(0, "Value cannot be negative")
    .max(target ||100, "Value should not be greater than target Value"),
  measureDescription: yup.string().required("Notes are required").max(100, "Value cannot exceed 100"),
  periodicity: yup.string().required("Action Plan is required"),
});
