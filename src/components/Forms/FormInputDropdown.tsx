import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFormInputDropdown {
    name: string;
    control: any;
    label: string;
    disabled?: boolean;
}

const options = [
    {
        label: "DNI",
        value: 1,
    },
    {
        label: "RUC",
        value: 2,
    },
    {
        label: "Carnet Extranjería",
        value: 3,
    },
];

export const FormInputDropdown = ({ name, control, label, disabled = false }: IFormInputDropdown) => {
    const generateSingleOptions = () => {
        return options.map((option: any) => {
            return (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            );
        });
    };
    return (
        <FormControl size={"small"}>
            <InputLabel>{label}</InputLabel>
            <Controller
                render={({ field: { onChange, value } }) => (
                    <Select onChange={onChange} value={value} defaultValue={1} disabled={disabled}>
                        {generateSingleOptions()}
                    </Select>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    );
};