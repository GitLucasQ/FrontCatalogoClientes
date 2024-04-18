import { Box, Button, CircularProgress, Modal, Stack } from "@mui/material";
import { FormInputText } from "./Forms/FormInputText";
import { useForm } from "react-hook-form";
import { FormInputDropdown } from "./Forms/FormInputDropdown";
import { FormInputDate } from "./Forms/FormInputDate";
import dayjs, { Dayjs } from "dayjs";
import { ICreateUpdateClienteRequest } from "../models/request/CreateUpdateClientRequest";
import { ClientService } from "../services/ClientService";
import UseAlert from "../hooks/UseAlert";
import { ChangeEvent, useEffect, useState } from "react";
import { toBase64 } from "../utilities/File.utility";
import { IClient } from "../models/response/GetClientsResponse";
import { green } from "@mui/material/colors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface IModalClient {
    open: boolean;
    clientData?: IClient | undefined;
    handleClose: () => void;
    reloadData: () => void;
}

interface IFormInput {
    firstNameValue: string;
    lastNameValue: string;
    documentValue: string;
    birthDateValue: Dayjs;
    idTypeDocumentValue: number;
}

const ModalClient = ({ open, clientData, handleClose, reloadData }: IModalClient) => {

    const [idClient, setIdClient] = useState(0);
    const [fileCv, setFileCv] = useState<File | null>(null);
    const [fileCvBase64, setFileCvBase64] = useState("");
    const [filePhoto, setFilePhoto] = useState<File | null>(null);
    const [filePhotoBase64, setFilePhotoBase64] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [errorSizeCv, setErrorSizeCv] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
        defaultValues: {
            firstNameValue: clientData?.firstName ?? "",
            lastNameValue: clientData?.lastName ?? "",
            documentValue: clientData?.documentNumber ?? "",
            birthDateValue: clientData ? dayjs(clientData.birthDate) : dayjs(),
            idTypeDocumentValue: clientData ? clientData.typeDocument.id : 1,
        },
    });

    useEffect(() => {
        if (clientData) {
            setIsEdit(true);
            setIdClient(clientData.id);
            setValue("firstNameValue", clientData.firstName);
            setValue("lastNameValue", clientData.lastName);
            setValue("documentValue", clientData.documentNumber);
            setValue("birthDateValue", dayjs(clientData.birthDate));
            setValue("idTypeDocumentValue", clientData.typeDocument.id);
        }
    }, [clientData, setValue]);

    const onClose = () => {
        setShowMessage(false);
        setFileCv(null);
        setFileCvBase64("");
        setFilePhoto(null);
        setFileCvBase64("");
        setIsEdit(false);
        setErrorSizeCv(false);
        handleClose();
        reset();
    }

    const handleChangeFileCv = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const maxSize = 5 * 1024 * 1024;

            if (e.target.files[0]?.size > maxSize) {
                setErrorSizeCv(true);
                return;
            } else {
                setErrorSizeCv(false);
            }

            setFileCv(e.target.files[0]);
            const base64 = await toBase64(e.target.files[0]);
            setFileCvBase64((base64 as string).split(",")[1]);
        }
    }

    const handleChangeFilePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFilePhoto(e.target.files[0]);
            const base64 = await toBase64(e.target.files[0]);
            setFilePhotoBase64((base64 as string).split(",")[1]);
        }
    }

    const onSubmit = async (data: IFormInput) => {
        if (
            data.firstNameValue.trim() === "" ||
            data.lastNameValue.trim() === "" ||
            data.birthDateValue === null ||
            data.documentValue.trim() === "" ||
            fileCv?.name === "" ||
            fileCvBase64 === "" ||
            filePhoto?.name === "" ||
            filePhotoBase64 === ""
        ) {
            setShowMessage(true);
            return;
        }

        const payload: ICreateUpdateClienteRequest = {
            id: idClient,
            firstName: data.firstNameValue,
            lastName: data.lastNameValue,
            birthDate: data.birthDateValue.format("YYYY-MM-DD"),
            idTypeDocument: data.idTypeDocumentValue,
            documentNumber: data.documentValue,
            cvFileName: fileCv!.name,
            CvBase64: fileCvBase64,
            photoFileName: filePhoto!.name,
            PhotoBase64: filePhotoBase64
        };

        if (isEdit) {
            setIsLoading(true);
            ClientService.updateClient(payload)
                .then(async (res) => {
                    if (res !== undefined) {
                        reloadData();
                        onClose();
                        await UseAlert().mostrarAlertaExitosa(res.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    onClose();
                })
        } else {
            setIsLoading(true);
            ClientService.createClient(payload)
                .then(async (res) => {
                    if (res !== undefined) {
                        reloadData();
                        onClose();
                        await UseAlert().mostrarAlertaExitosa(res.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                    onClose();
                })
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflow: 'scroll' }}
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <FormInputText
                            name={"firstNameValue"}
                            control={control}
                            label={"Nombres"}
                            type={"text"}
                        />

                        <FormInputText
                            name={"lastNameValue"}
                            control={control}
                            label={"Apellidos"}
                            type={"text"}
                        />

                        <FormInputDropdown
                            name="idTypeDocumentValue"
                            control={control}
                            label={"Tipo Documento"}
                            disabled={isEdit}
                        />

                        <FormInputText
                            name={"documentValue"}
                            control={control}
                            label={"Nro. Documento"}
                            type={"number"}
                            disabled={isEdit}
                        />

                        <FormInputDate
                            name="birthDateValue"
                            control={control}
                            label={"Fecha Nacimiento"}
                        />

                        <Box>
                            <p>Seleccione su CV</p>
                            <div>
                                <input type="file" accept=".pdf" onChange={handleChangeFileCv} />
                            </div>
                            <Box sx={{ color: "red" }}>
                                <p>{errorSizeCv ? "El CV no puede pesar más de 5Mb" : ""}</p>
                            </Box>
                        </Box>

                        <Box>
                            <p>Seleccione su foto</p>
                            <div>
                                <input type="file" accept=".jpeg" onChange={handleChangeFilePhoto} />
                            </div>
                        </Box>

                        <Box sx={{ color: "red" }}>
                            <p>{showMessage ? "Debe completar todos los campos" : ""}</p>
                        </Box>

                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleSubmit(onSubmit)}
                            disabled={errorSizeCv}
                        >
                            GRABAR
                        </Button>
                        {isLoading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Stack>
                </Box>
            </Modal>
        </>
    )
}

export default ModalClient;