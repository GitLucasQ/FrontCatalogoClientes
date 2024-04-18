import { MRT_ColumnDef } from "material-react-table";
import { IClient } from "./response/GetClientsResponse";
import dayjs from "dayjs";

export const ClientColumns: MRT_ColumnDef<IClient>[] = [
    {
        accessorKey: "id",
        header: "#",
        size: 100
    },
    {
        accessorKey: "firstName",
        header: "Nombres",
        size: 150
    },
    {
        accessorKey: "lastName",
        header: "Apellidos",
        size: 150
    },
    {
        id: "birthDate",
        accessorFn: (row) => new Date(row.birthDate ?? ""),
        sortingFn: "datetime",
        Cell: ({ cell }) =>
            dayjs(cell.getValue<string>()).format("DD/MM/YYYY"),
        header: "Fecha de nacimiento",
        size: 150,
    },
    {
        accessorKey: "typeDocument.description",
        header: "Tipo Documento",
        size: 100
    },
    {
        accessorKey: "documentNumber",
        header: "N° Documento",
        size: 100
    },
    {
        id: "fileNameCv",
        accessorFn: (row) => row.fileNameCv,
        Cell: ({ cell, row }) => <a href={row.original.pathCv} target="_blank">{cell.getValue<string>()}</a>,
        header: "CV",
        size: 100
    },
    {
        id: "fileNamePhoto",
        accessorFn: (row) => row.fileNamePhoto,
        Cell: ({ cell, row }) => <a href={row.original.pathPhoto} target="_blank">{cell.getValue<string>()}</a>,
        header: "Foto",
        size: 100
    }
]