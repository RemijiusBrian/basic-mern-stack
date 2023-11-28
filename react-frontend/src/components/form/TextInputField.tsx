import { TextField, TextFieldVariants } from "@mui/material";
import { Form } from "react-bootstrap";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    registerOptions?: RegisterOptions,
    variant?: TextFieldVariants,
    [x: string]: any
}

const TextInputField = ({
    name,
    label,
    registerOptions,
    variant = "outlined",
    ...props
}: TextInputFieldProps) => {
    const { control } = useFormContext();


    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Form.Group className="mb-3">
                    <TextField
                        value={value}
                        onChange={onChange}
                        label={label}
                        error={!!error}
                        helperText={error?.message}
                        variant={variant}
                        defaultValue={""}
                        {...props}
                    />
                </Form.Group>
            )}
            rules={registerOptions}
        />
    )
};

export default TextInputField;