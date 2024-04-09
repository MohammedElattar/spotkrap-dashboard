import { stringifyPaginationParams } from "../js/pagination.js";
import axiosInstance from "./axiosInterceptor.js";

export function fetchAllThidParties()
{
    return axiosInstance.get(`/api/users/third_parties?${stringifyPaginationParams()}`);
}

export function changeThirdPartyStatus(id, status)
{
    return axiosInstance.patch(`api/users/third_parties/${id}/change_status?status=${status == true ? '1' : '0'}`)
}