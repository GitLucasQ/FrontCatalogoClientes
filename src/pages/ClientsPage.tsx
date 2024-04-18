import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ClientService } from "../services/ClientService";
import { IClient } from "../models/response/GetClientsResponse";
import TableData from "../components/TableData";
import { ClientColumns } from "../models/ClientColumns";
import UseAlert from "../hooks/UseAlert";
import { MRT_Row } from "material-react-table";
import { IDeleteClientRequest } from "../models/request/DeleteClientRequest";
import { Box, Button } from "@mui/material";
import ModalClient from "../components/ModalClient";
import { exportDataToExcel } from "../utilities/File.utility";
import dayjs from "dayjs";
import { columnsReport } from "../utilities/Variables";

const ClientsPage = () => {

    const [clientsData, setClientsData] = useState<IClient[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [clientSelected, setClientSelected] = useState<IClient>();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const res = await ClientService.getAllClients();
        if (res?.data) {
            setClientsData(res.data);
        }
    }

    const handleDelete = (row: MRT_Row<IClient>) => {
        UseAlert().mostrarAlertaConfirmacion()
            .then(async (result) => {
                if (result) {
                    const payload: IDeleteClientRequest = {
                        id: row.getValue("id")
                    }

                    const res = await ClientService.deleteClient(payload);

                    if (res !== undefined) {
                        await UseAlert().mostrarAlertaExitosa(res.message);
                    }
                }
            })
            .finally(async () => {
                await fetchClients();
            });
    }

    const hanldeEdit = (row: MRT_Row<IClient>) => {
        setClientSelected(row.original);
        handleShowModal();
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setClientSelected(undefined);
    }

    const hanldeExportData = () => {
        const rowsToExport = clientsData.map((el) => {
            return {
                "nombres": el.firstName,
                "apellidos": el.lastName,
                "fecha_nacimiento": el.birthDate,
                "tipo_documento": el.typeDocument.description,
                "nro_documento": el.documentNumber,
                "cv": el.fileNameCv,
                "foto": el.fileNamePhoto
            }
        });

        exportDataToExcel(
            rowsToExport,
            columnsReport,
            `Listado Clientes`,
            `${dayjs().format("YYYY-MM-DD")}.xlsx`
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ paddingX: 10, paddingY: 4 }}>
                <Button
                    variant="contained"
                    onClick={handleShowModal}
                >
                    Agregar
                </Button>
            </Box>
            <TableData
                columns={ClientColumns}
                data={clientsData}
                enableActions={true}
                enableEdit={true}
                enableDelete={true}
                enableExportData={true}
                handleDelete={handleDelete}
                handleEdit={hanldeEdit}
                handleExportData={hanldeExportData}
            />

            <ModalClient
                open={showModal}
                handleClose={handleCloseModal}
                reloadData={fetchClients}
                clientData={clientSelected}
            />
        </>
    )
}

export default ClientsPage;