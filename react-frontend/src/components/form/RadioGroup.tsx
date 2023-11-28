import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Form } from "react-bootstrap";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

interface RadioGroupProps {
    values: string[],
    name: string,
    label: string,
    registerOptions?: RegisterOptions,
    className?: string,
    [x: string]: any
}

export const FormRadioGroup = ({
    values,
    name,
    label,
    className,
    registerOptions,
    ...props
}: RadioGroupProps) => {
    const { control } = useFormContext();

    return (
        <FormControl>
            <Form.Group>
                <FormLabel id={name + "-label"}>{label}</FormLabel>
                <Controller
                    control={control}
                    name={name}
                    render={({ field: { onChange } }) => (
                        <RadioGroup
                            aria-labelledby={name + "-label"}
                            name={name}
                            onChange={onChange}
                            {...props}>
                            {values.map(value => (
                                <FormControlLabel value={value} control={<Radio />} label={value} />
                            ))}
                        </RadioGroup>
                    )}
                    rules={registerOptions} />
            </Form.Group>
        </FormControl>
    )
};