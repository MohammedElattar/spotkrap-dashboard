import { generateFullUrl, getUniqueParams } from "../helpers/urlHelper.js"

let searchComponent = document.querySelector('.searchComponent')

searchComponent.innerHTML = `<div class="filter">
<form class="filterBox fsear" id="search-form">
  <input type="text" name="handle" placeholder="Search" class="w-100 py-1">
  <button type="button" id="search-button"><img src="media/icons/search.png" alt=""></button>
</form>
</div>`

let searchButton = document.getElementById('search-button');
let queryParams = getUniqueParams()
let tmpHandle = queryParams.get('handle')
let searchForm = document.getElementById('search-form')
let searchInput = document.getElementsByName('handle')[0]

if(searchInput)
{
  searchInput.value = tmpHandle;
}

searchInput.addEventListener('keyup', function(event){
  let value = event.target.value;

  if(value == '' && tmpHandle != '')
  {
      putSearchParam('')
  }
})

searchForm.addEventListener('submit', (e) => e.preventDefault())

searchButton.addEventListener('click', function(event){
  event.preventDefault();

  
  let formData = new FormData(searchForm)

  let {handle} = Object.fromEntries(formData.entries(formData))

  if(handle != tmpHandle)
  {
    putSearchParam(handle)
  }
})

function putSearchParam(handle)
{
  queryParams.delete('handle');
  queryParams.set('handle', handle)
  window.location.replace(generateFullUrl(queryParams.toString()))
}