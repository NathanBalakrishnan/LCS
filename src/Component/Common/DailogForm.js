import React, { useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useFormik } from "formik";
import { scoreCardSchema } from "./ValidationSchema";

export default function DialogForm({ visible,readonly, onHide, rowData, onSave }) {
  console.log("readonly",readonly)
  const formik = useFormik({
    initialValues: {
      actual: "",
      measureDescription: "",
      periodicity: "",
    },
    validationSchema: scoreCardSchema,
    onSubmit: (values) => {
      if (onSave) onSave(values);
      onHide();
    },
    enableReinitialize: true, // allow updates when rowData changes
  });
  useEffect(() => {
    if (rowData) {
      formik.setValues({
        actual: rowData.actual || "",
        measureDescription: rowData.measureDescription || "",
        periodicity: rowData.periodicity || "",
      });
    }
  }, [rowData]);

  const onClear = () => {
    formik.resetForm();
  };

  return (
    <Dialog
      header={readonly?"View Rows":"Edit Row Values"}
      visible={visible}
      style={{ width: "500px", maxWidth: "90vw" }}
      onHide={onHide}
      footer={
        <div style={{ textAlign: "right" }}>
          <button
             style={{ display: readonly ? "none" : "inline-block" }}
            type="button"
            className="p-button p-button-text"
            onClick={onClear}
          >
            Clear
          </button>
          <button
           style={{ display: readonly ? "none" : "inline-block" }}
            type="submit"
            className="p-button p-button-primary"
            onClick={formik.handleSubmit}
          >
            Submit
          </button>
          <button
            type="submit"
            style={{ display: !readonly ? "none" : "inline-block" }}
            className="p-button p-button-primary"
            onClick={onHide}
          >
            Close
          </button>
        </div>
      }
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Achieved Value */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
          }}
        >
          <label
            htmlFor="actual"
            style={{ marginBottom: "4px", fontWeight: "500" }}
          >
            Achieved Value
          </label>
          <InputText
            id="actual"
            name="actual"
            readOnly={readonly}
            value={formik.values.actual}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter a value"
          />
          {formik.touched.actual && formik.errors.actual && (
            <span style={{ color: "red" }}>{formik.errors.actual}</span>
          )}
        </div>

        {/* Notes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
          }}
        >
          <label
            htmlFor="measureDescription"
            style={{ marginBottom: "4px", fontWeight: "500" }}
          >
            Notes
          </label>
          <InputTextarea
            id="measureDescription"
            name="measureDescription"
            readOnly={readonly}
            rows={5}
            cols={30}
            value={formik.values.measureDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.measureDescription &&
            formik.errors.measureDescription && (
              <span style={{ color: "red" }}>
                {formik.errors.measureDescription}
              </span>
            )}
        </div>

        {/* Action Plan */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px",
          }}
        >
          <label
            htmlFor="periodicity"
            style={{ marginBottom: "4px", fontWeight: "500" }}
          >
            Action Plan
          </label>
          <InputText
            id="periodicity"
            name="periodicity"
            readOnly={readonly}
            value={formik.values.periodicity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter a value"
          />
          {formik.touched.periodicity && formik.errors.periodicity && (
            <span style={{ color: "red" }}>{formik.errors.periodicity}</span>
          )}
        </div>
      </form>
    </Dialog>
  );
}
