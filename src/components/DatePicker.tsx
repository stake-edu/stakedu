import { FieldHookConfig, useField, useFormikContext } from "formik";
import React from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

type DatePickerFieldProps = FieldHookConfig<Date> & ReactDatePickerProps;

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      autoComplete="off"
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val: Date) => {
        setFieldValue(field.name, val);
      }}
    />
  );
};

export default DatePickerField;
