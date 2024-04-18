import axios from "axios";
import UseAlert from "../hooks/UseAlert";
import { IGetClientsResponse } from "../models/response/GetClientsResponse";
import { IDeleteClientRequest } from "../models/request/DeleteClientRequest";
import { IDeleteClientResponse } from "../models/response/DeleteClientResponse";
import { ICreateUpdateClienteRequest } from "../models/request/CreateUpdateClientRequest";
import { ICreateClientResponse } from "../models/response/CreateClientResponse";
import { IUpdateClientResponse } from "../models/response/UpdateClientResponse";

const URL: string = 'https://localhost:7045/api/Client';

export class ClientService {
    static get axios() {
        const axiosInstance = axios.create({
            baseURL: URL,
            responseType: "json"
        });

        axiosInstance.interceptors.response.use(
            response => response,
            error => {
                UseAlert().mostrarAlertaErronea(error.response?.data?.message || "Sucedió un error al realizar la petición")
                .then(() => {
                    return Promise.reject(error); 
                });                
            }
        )

        return axiosInstance;
    }

    static async getAllClients() : Promise<IGetClientsResponse | undefined> {
        try {
            const resp = await ClientService.axios.get<IGetClientsResponse>(
                "/GetAllActives"
            );

            if (resp.data?.status >=200 && resp.data?.status < 300) {
                return resp.data;
            } else {
                UseAlert().mostrarAlertaErronea(resp.data?.message || "Sucedió un error al realizar la petición");
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async deleteClient(payload: IDeleteClientRequest) : Promise<IDeleteClientResponse | undefined> {
        try {
            const resp = await ClientService.axios.post<IDeleteClientResponse>(
                "/SoftDelete",
                payload
            );

            if (resp.data?.status >=200 && resp.data?.status < 300) {
                return resp.data;
            } else {
                UseAlert().mostrarAlertaErronea(resp.data?.message || "Sucedió un error al realizar la petición");
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async createClient(payload: ICreateUpdateClienteRequest) : Promise<ICreateClientResponse | undefined> {
        try {
            const resp = await ClientService.axios.post<ICreateClientResponse>(
                "Create",
                payload
            );

            if (resp.data?.status >=200 && resp.data?.status < 300) {
                return resp.data;
            } else {
                UseAlert().mostrarAlertaErronea(resp.data?.message || "Sucedió un error al realizar la petición");
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    static async updateClient(payload: ICreateUpdateClienteRequest) : Promise<IUpdateClientResponse | undefined> {
        try {
            const resp = await ClientService.axios.put<IUpdateClientResponse>(
                "Update",
                payload
            );

            if (resp.data?.status >=200 && resp.data?.status < 300) {
                return resp.data;
            } else {
                UseAlert().mostrarAlertaErronea(resp.data?.message || "Sucedió un error al realizar la petición");
                return undefined;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}