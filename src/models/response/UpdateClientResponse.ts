import { IClient } from "./GetClientsResponse";

export interface IUpdateClientResponse {
    status: number;
    message: string;
    data: IClient;
}