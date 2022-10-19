async function init() {
  let countriesFetched, filteredCountries, regionSelected, favoriteCountries = [];
  let searchInput = document.getElementById("search");
  let dropdown = document.getElementById("ul");

  //fetch all at the beginning
  countriesFetched = await fetchCountries();
  renderCards(countriesFetched);

  //when searching
  searchInput.onkeyup = async (e) => {
    let searchFiltered;
    let searchValue = e.target.value;
    countriesFetched = await fetchCountries(searchValue);
    if (filteredCountries.length < 250) {
      if(regionSelected != "Favourites"){
        searchFiltered = countriesFetched.filter(
          (country) => country.region == regionSelected
        );
      }
      else {
        searchFiltered = countriesFetched.filter(
          (country) => favoriteCountries.find((element) => element.cca2 == country.cca2 )
        );
      }
      filteredCountries = searchFiltered;
      renderCards(filteredCountries);
      console.log(filteredCountries);
    } 
    else {
      renderCards(countriesFetched);
    }
  };

  //when filtering
  dropdown.onclick = (e) => {
    regionSelected = e.target.innerHTML;
    filteredCountries = filterData(countriesFetched, regionSelected, favoriteCountries);
    renderCards(filteredCountries);
    console.log(filteredCountries);
  };

  //when dragging
  let dropZone = document.getElementById("favourites");

  for (const dragElement of document.querySelectorAll(".theCard")){
    dragElement.ondragstart = (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
      e.target.style.opacity = "0.5";
    }

    dragElement.ondragend = (e) => {
      e.target.style.opacity = "1";
    }
    
    dropZone.ondragover = (e) => {
      e.preventDefault();
      e.target.style.border = "1px solid #27ae60";
    }
  
    dropZone.ondrop = async (e) => {
      e.preventDefault();
      dropZone.style.border = "none";
      const droppedElementID = e.dataTransfer.getData("text/plain");
      let country = await AddFetchCountry(favoriteCountries,droppedElementID);
      console.log(favoriteCountries);
      if(typeof country != "undefined"){
        const droppedElement = document.createElement('div');
        droppedElement.classList.add("row", "justify-content-start", "align-content-center", "my-1", "border-0", "favItem");
        droppedElement.setAttribute("name",`${country.cca2}`);
        droppedElement.innerHTML = 
          `<div class="col-3 pe-0 radius10 border-0 text-center">
              <img src=${country.flags.svg} alt=${country.name.common} class="radius5 border-0" style="width:60%;height:80%;"/>
            </div>
            <div class="col-7 p-0 py-1 border-0">
              <p class="fs-6 semiBold m-0 border-0">${country.name.common}</p>
            </div>
            <div class="col-2 p-0 border-0">
              <button type="button" class="btn btn-sm rounded-circle border-0 deleteBtn" style="background-color: #f5f5f5;" data-id=${country.cca2}>
                <span>
                  <i class="bi bi-x border-0" id="icon"></i>
                </span>  
              </button>
            </div>`;
      let dropList = document.getElementById("favList");
      dropList.appendChild(droppedElement);
      }

      //delete from favourites
      for (const favItem of document.querySelectorAll(".favItem")){
          const deleteDiv = favItem.children[2];
          const deleteBtn = deleteDiv.children[0];
          deleteBtn.onclick = (e) => {
            const cca2 = deleteBtn.getAttribute("data-id");
            favoriteCountries = favoriteCountries.filter((element) => element.cca2 != cca2);
            console.log(favoriteCountries);
            let dropList = document.getElementById("favList");
            dropList.removeChild(favItem);
          }
      }

  
    }
}

//favourites on Mob 
for(const card of document.querySelectorAll(".theCard")){
  let aTag = card.children[0];
  let dTag = aTag.children[0];
  let favBtn = dTag.children[2];
  let icon = favBtn.children[0];
  favBtn.onclick = async (e) => {
    e.stopPropagation();
    const cca2 = card.getAttribute("id"); 
    console.log(cca2);
    if(icon.classList.contains("gray")){
      //fave
      let country = await AddFetchCountry(favoriteCountries,cca2);
      icon.classList.remove("gray");
    }
    else {
      //delete
      favoriteCountries = favoriteCountries.filter((element) => element.cca2 != cca2);
      icon.classList.add("gray");
    }
  }
}

}

//-----------------------------------   Functions   --------------------------------------------

async function fetchCountries(whatToLoad = "") {
  let response, countries;
  if (whatToLoad.length != "") {
    //search
    try {
      response = await fetch(
        "https://restcountries.com/v3.1/name/" + `${whatToLoad}`
      );
      countries = await response.json();
    } catch (error) {
      console.log(error);
    }
  } else {
    //all Countries
    try {
      response = await fetch("https://restcountries.com/v3.1/all");
      countries = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  return countries;
}

function filterData(countries, region, favList = []) {
  let filteredCountries = [];
  if (region == "") {
    return countries;
  }
  else if (region == "No Filter") {
    countries.forEach((country) => {
      filteredCountries.push(country);
    });
  }
  else if( region == "Favourites"){
    favList.forEach((country) => {
      filteredCountries.push(country);
    });
  }
  else {
    countries.forEach((country) => {
      if (country.region == region) {
        filteredCountries.push(country);
      }
    });
  }
  return filteredCountries;
}

function renderCards(countries) {
  document.getElementById("cards").innerHTML = countries
    .map(
      (country) =>
        `<div class="col-10 col-sm-7 col-md-4 bg-transparent theCard" draggable="true" id=${country.cca2}>
            <a href="details.html?cca2=${country.cca2}" class="btn p-0 m-0 text-start w-100 aCard" draggable="false">
              <div class="card shadow-sm w-100 h-100 bg-transparent">
                  <div class="w-100 h-50" id="imgDiv">
                      <img src=${country.flags.svg} class="w-100 h-100" alt=${country.name.common} id="img" draggable="false">
                  </div>
                  <div class="card-body px-4 bg-white themedBg" id="textDiv">
                      <h5 class="card-title mb-3 mt-2 fw-bold">${country.name.common}</h5>
                      <div class="card-text">
                          <span class="d-flex justify-content-start">
                            <h6 class="semiBold">Population:&nbsp</h6>
                            <h6 class="light">${country.population}</h6>
                          </span>
                          <span class="d-flex justify-content-start">
                            <h6 class="semiBold">Region:&nbsp</h6>
                            <h6>${country.region}</h6>
                          </span>
                          <span class="d-flex justify-content-start">
                            <h6 class="semiBold">Capital:&nbsp</h6>
                            <h6>${country.capital}</h6>
                          </span>
                       </div>
                  </div>
                  <button type="button" class="btn btn-xs p-0 pe-2 pb-2 position-absolute bottom-0 end-0" name="favoriteBtn">
                    <i class="bi bi-star-fill gray d-lg-none" id="icon"></i>
                  </button>
               </div>
            </a>
          </div>`
    )
    .join("");
}

async function AddFetchCountry(favList, cca2){
  let countryArr, country;
  let url = "https://restcountries.com/v3.1/alpha/" + `${cca2}`;
  try {
    response = await fetch(url);
    countryArr = await response.json();
    country = countryArr[0];
  } catch (error) {
    console.log(error);
  }

  if(!favList.find((element) => element.cca2 == country.cca2 )){
    favList.push(country);
    return country;
  }
}