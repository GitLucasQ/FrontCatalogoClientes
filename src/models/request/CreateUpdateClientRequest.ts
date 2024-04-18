export interface ICreateUpdateClienteRequest {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    idTypeDocument: number;
    documentNumber: string;
    cvFileName: string;
    CvBase64: string;
    photoFileName: string;
    PhotoBase64: string;
}