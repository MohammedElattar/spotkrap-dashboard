import { changeThirdPartyStatus, fetchAllThidParties } from "../api/thirdPartyApi.js";


function handleStatusChange(event)
{
    event.target.disabled = true;
    let id = event.target.getAttribute('switch_id_value')

    changeThirdPartyStatus(id, event.target.checked).then(function(res){
        event.target.disabled = false;
    }).catch(function(){
        event.target.checked = !event.target.checked;
    })
}

async function getAllThirdParties()
{
    let tBody = document.querySelector('#third-parties-table tbody')
    tBody.innerHTML = '';

    let allCoupons = await fetchAllThidParties()

    allCoupons.data.data.forEach((thirdParty) => {
        tBody.innerHTML += `<tr>
        <td>${thirdParty.id}</td>
        <td class="mw200">${thirdParty.name}</td>
        <td>${thirdParty.phone}</td>
        <td>${thirdParty.email}</td>
        <td>${thirdParty.username}</td>
        <td>
            <span class="form-check form-switch m-auto">
                <input style="width:45%" class="form-check-input" name="status" type="checkbox" role="switch"
                id="flexSwitchCheckChecked" ${thirdParty.status == true ? 'checked' : ''} switch_id_value="${thirdParty.id}">
            </span>
        </td>
        <td>
            <a href="${window.location.origin}/activities.html?third_party_id=${thirdParty.id}" class="btn btn-primary">Activities</a>
        </td>
      </tr>`
    })


    Array.from(document.querySelectorAll('[switch_id_value]')).forEach((td) => {
        td.addEventListener('click', (e) => handleStatusChange(e))
    });
}

getAllThirdParties()