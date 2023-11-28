import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';

interface FormPhoneInputProps {
    name: string,
    label: string,
    registerOptions?: RegisterOptions,
    [x: string]: any
}

const FormPhoneInput = ({
    name,
    label,
    registerOptions,
    ...props
}: FormPhoneInputProps) => {
    const { control, setValue } = useFormContext()
    return (
        <Form.Group>
            <Controller
                name={name}
                control={control}
                rules={registerOptions}
                render={({ field }) => (
                    <PhoneInput
                        value={field.value}
                        onChange={newValue => setValue(name, newValue)} />
                )}
                {...props}
            />
        </Form.Group>
    )
};

export default FormPhoneInput;