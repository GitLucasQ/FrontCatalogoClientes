import { IClient } from "./GetClientsResponse";

export interface ICreateClientResponse {
    status: number;
    message: string;
    data: IClient;
}