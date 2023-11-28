import { FormHelperText } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import { Form } from "react-bootstrap";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface DateFieldProps {
    name: string,
    label: string,
    defaultValue?: Date,
    registerOptions?: RegisterOptions,
    [x: string]: any
}

export const FormDateField = ({
    name,
    label,
    defaultValue,
    registerOptions,
    ...props
}: DateFieldProps) => {
    const { control, setValue, formState } = useFormContext();
    return (
        <Form.Group>
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <DateField
                        label={label}
                        value={field.value}
                        onChange={newValue => setValue(name, newValue)}
                        defaultValue={defaultValue}
                        color={formState.errors[name] ? 'error' : 'primary'}
                        {...props} />
                )}
                rules={registerOptions}
            />
            <FormHelperText error={!!formState.errors[name]}>{formState.errors[name]?.message ? formState.errors[name]?.message?.toString() : ""}</FormHelperText>
        </Form.Group>
    )
};