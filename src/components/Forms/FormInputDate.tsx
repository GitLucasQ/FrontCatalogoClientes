import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IFormInputDate {
    name: string;
    control: any;
    label: string;
}

export const FormInputDate = ({ name, control, label }: IFormInputDate) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <DatePicker value={value} onChange={onChange} />
                )}
            />
        </LocalizationProvider>
    );
};