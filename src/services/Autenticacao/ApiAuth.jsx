import axios from "axios";
import { baseAutenticar } from "../ApiBase/ApiBase";

export const autenticar = (data) => {
    const url = "/autenticacao/login"
    return baseAutenticar.post(url, data);
}
