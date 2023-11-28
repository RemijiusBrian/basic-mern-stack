import { DateField } from "@mui/x-date-pickers";
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
    const { control, setValue } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <DateField
                    label={label}
                    value={field.value}
                    onChange={newValue => setValue(name, newValue)}
                    defaultValue={defaultValue}
                    {...props} />
            )}
            rules={registerOptions}
        />
    )
};