export interface IGetClientsResponse {
    status: number;
    message: string;
    data: IClient[];
}

export interface IClient {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    documentNumber: string;
    fileNameCv: string;
    pathCv: string;
    fileNamePhoto: string;
    pathPhoto: string;
    typeDocument: ITypeDocument;
}

export interface ITypeDocument {
    id: number;
    description: string;
}