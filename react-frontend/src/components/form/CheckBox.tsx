import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material"
import { Form } from "react-bootstrap";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form"

interface CheckBoxProps {
    name: string,
    label: string,
    textSize?: string,
    lineHeightNumber?: string | number,
    registerOptions?: RegisterOptions,
    [x: string]: any
}

const LabelledCheckBox = ({
    name,
    label,
    textSize = '0.8rem',
    lineHeightNumber,
    registerOptions,
    ...props
}: CheckBoxProps) => {
    const { control, setValue } = useFormContext();

    return (
        <Form.Group>
            <FormControlLabel control={
                <Controller
                    name={name}
                    render={({ field }) => (
                        <Checkbox checked={!!field.value} onChange={() => setValue(name, !(!!field.value))} />
                    )}
                    control={control}
                />
            }
                label={<span style={{ fontSize: textSize, lineHeight: lineHeightNumber }}> {label}</span>}
                {...props}
            />
        </Form.Group>
    )
}

export default LabelledCheckBox;