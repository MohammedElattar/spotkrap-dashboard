import { stringifyPaginationParams } from "../js/pagination.js";
import axiosInstance from "./axiosInterceptor.js";

export function fetchAllActivities(thirdPartyId)
{
    return axiosInstance.get(`/api/third_parties/${thirdPartyId}/activities?${stringifyPaginationParams()}`);
}

export function changeCarouselStatus(thirdPartyId, activityId, status)
{
    return axiosInstance.post(`/api/third_parties/${thirdPartyId}/activities/${activityId}/toggle_carousel?status=${status == true ? '1' : '0'}`)
}

export function changeAdrenalineRushStatus(thirdPartyId, activityId, status)
{
    return axiosInstance.post(`/api/third_parties/${thirdPartyId}/activities/${activityId}/toggle_adrenaline_rush?status=${status == true ? '1' : '0'}`)
}