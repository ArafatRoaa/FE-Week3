async function init() {
  let country, languages, name, borders;
  const urlParams = new URLSearchParams(window.location.search);
  const cca2 = urlParams.get("cca2");

  country = await fetchCountry(cca2);
  languages = getLanguages(country);
  name = getName(country);
  borders = getBorders(country);
  renderCountry(country, languages, name, borders);
}

async function fetchCountry(code) {
  let countryArr, country;
  let url = "https://restcountries.com/v3.1/alpha/" + `${code}`;
  try {
    response = await fetch(url);
    countryArr = await response.json();
    country = countryArr[0];
  } catch (error) {
    console.log(error);
  }
  return country;
}

function getLanguages(country){
    let languages = [];
    let languagesEntries = Object.entries(country.languages);
    languagesEntries.forEach(element => {
        languages.push(element[1]);
    });
    return languages;
}

function getName(country){
    let name = [];
    let namesEntries = Object.entries(country.name.nativeName);
    name.push(namesEntries[0][1].common);
    return name;
}

function getBorders(country){
    let countries = [];
    if(country.borders){
        let borders = Object.values(country.borders);
        borders.forEach(async (border) => {
            let country = await fetchCountry(border);
            countries.push(country.name.common);
        })
    } 
    return countries; 
}

function renderCountry(country, languages, name, borders) {
  document.getElementById("countryDetails")
  .innerHTML = 
    `<div class="col-lg-6 p-0 mb-5 mt-4 mt-sm-0" id="imgDetailsDiv">
        <img src=${country.flags.svg} alt=${country.name.common} class="w-100 h-100" id="img" >
    </div>
    <div class="col-lg-5 py-lg-4 mb-5 mb-lg-0 d-flex flex-column text-dark themedText">
        <h2 class="h3 fw-bold mb-5">${country.name.official}</h1>
            <div class="row m-0 g-0">
                <div class="col-lg-6 mb-5">
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Native&nbspName:&nbsp</span>
                        <span class="fw-normal">${name}</span>
                    </span>
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Population:&nbsp</span>
                        <span class="fw-normal">${country.population}</span>
                    </span>
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Region:&nbsp</span>
                        <span class="fw-normal">${country.region}</span>
                    </span>
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Sub&nbspRegion:&nbsp</span>
                        <span class="fw-normal">${country.subregion}</span>
                    </span>
                    <span class="d-flex justify-content-start">
                        <span class="fs-6 fw-bold">Capital:&nbsp</span>
                        <span class="fw-normal">${country.capital}</span>
                    </span>
                </div>
                <div class="col-lg-6">
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Top&nbspLevel&nbspDomain:&nbsp</span>
                        <span class="fw-normal">${country.tld}</span>
                    </span>
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Currencies:&nbsp</span>
                        <span class="fw-normal">
                            ${Object.values(country.currencies).map((cur) => cur.name).join(",")}
                        </span>
                    </span>
                    <span class="d-flex justify-content-start mb-3 mb-sm-2">
                        <span class="fs-6 fw-bold">Languages:&nbsp</span>
                        <span class="fw-normal d-flex flex-wrap" id="languages"> </span>
                    </span>
                </div>
            </div>
            <div class="d-flex flex-wrap m-0 mt-5 mt-lg-0 align-items-center mb-lg-0 d-block" id="bordersDiv">
                    <span class="fs-6 fw-bold">Border&nbspCountries:&nbsp</span>
                    <span class="fw-normal d-flex flex-wrap m-0 gap-2 bg-transparent" id="borders"> </span>
                </div> 
            </div>
        </div>`

    document.getElementById("languages")
        .innerHTML = 
            languages.map((lang) => 
                `<p class="m-0 p-0">
                    ${lang}
                </p>`
            ).join(",")

    document.getElementById("borders")
    .innerHTML = 
        borders?.map((border) => 
            `<span class="shadow-sm py-1 px-2 bg-white themedBg">
                <p class="text-center m-0 p-0">${border}</p>
            </span>`
        ).join("")

    if(borders.length == 0){
        let element = document.getElementById("bordersDiv");
        element.classList.add("d-none");
    }
}
