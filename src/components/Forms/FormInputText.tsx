/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface IFormInputText {
    name: string;
    control: any;
    label: string;
    type: string;
    disabled?: boolean;
}

export const FormInputText = ({ name, control, label, type, disabled = false }: IFormInputText) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        size="small"
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={label}
                        variant="outlined"
                        type={type}
                        required={true}
                        disabled={disabled}
                    />
                )}
            />
        </>
    )
}