import { changeAdrenalineRushStatus, changeCarouselStatus, fetchAllActivities } from "../api/activityApi.js";
import {activityStatusEnum} from "../enums/activityStatusEnum.js";
import { getUniqueParams } from "../helpers/urlHelper.js";

let thirdPartyId = getUniqueParams().get('third_party_id')

if(! thirdPartyId)
{
    window.location.replace('third-parties.html')
}


//TODO handleCarouselChange

function handleCarouselChange(event)
{
    let target = event.target;

    target.disabled = true;

    changeCarouselStatus(
        thirdPartyId, 
        target.getAttribute('switch_carousel_id_value'), 
        target.checked
    )
    .finally(() => {
        target.disabled = false;
    })
}

function handleAdrenalineRushChange(event)
{
    let target = event.target;

    target.disabled = true;

    changeAdrenalineRushStatus(
        thirdPartyId, 
        target.getAttribute('switch_adrenaline_rush_id_value'), 
        target.checked
    )
    .finally(() => {
        target.disabled = false;
    })
}

function handleStatusChange(event)
{
    let id = event.target.getAttribute('switch_status_id_value')
    let currentStatus = event.target.textContent.trim()
}

//TODO fetch all activities

async function getAllActivities()
{
    let tBody = document.querySelector('#activities-table tbody')

    let activities = await fetchAllActivities(thirdPartyId)

    activities.data.data.forEach((activity) => {
        let activityStatus = activity.status;

        let statusClass = '';

        switch(activityStatus)
        {
            case activityStatusEnum.PENDING:
                statusClass = 'secondary';
                break;
            case activityStatusEnum.ACCEPTED:
                statusClass='success';
                break;
            default:
                statusClass='danger'
                break;
        }

        tBody.innerHTML += `<tr>
        <td>${activity.id}</td>
        <td class="mw200">${activity.name}</td>
        <td>${activity.type}</td>
        <td>${activity.phone}</td>
        <td>
            <img src="${activity.main_image}" class="img-fluid rounded" />
        </td>
        <td>${activity.category.name}</td>
        <td>${activity?.address?.address || 'no address'}</td>
        <td>
            <button class="badge bg-${statusClass} text-xl" switch_status_id_value="${activity.id}">
                ${activity.status}
            </button>
        </td>
        <td>
            <span class="form-check form-switch m-auto">
                <input style="width:45%" class="form-check-input" name="status" type="checkbox" role="switch"
                id="flexSwitchCheckChecked" ${activity.include_in_carousel == true ? 'checked' : ''} switch_carousel_id_value="${activity.id}">
            </span>
        </td>
        <td>
            <span class="form-check form-switch m-auto">
                <input style="width:45%" class="form-check-input" name="status" type="checkbox" role="switch"
                id="flexSwitchCheckChecked" ${activity.include_in_adrenaline_rush == true ? 'checked' : ''} switch_adrenaline_rush_id_value="${activity.id}">
            </span>
        </td>
      </tr>`
    })


    Array.from(document.querySelectorAll('[switch_carousel_id_value]')).forEach((td) => {
        td.addEventListener('click', (e) => handleCarouselChange(e))
    });

    Array.from(document.querySelectorAll('[switch_adrenaline_rush_id_value]')).forEach((td) => {
        td.addEventListener('click', (e) => handleAdrenalineRushChange(e))
    });

    Array.from(document.querySelectorAll('[switch_status_id_value]')).forEach((td) => {
        td.addEventListener('click', (e) => handleStatusChange(e))
    });
}

getAllActivities()