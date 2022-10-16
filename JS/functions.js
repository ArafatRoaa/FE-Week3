export {fetchCountries, filterData, renderCards};

async function fetchCountries(whatToLoad = "") {
    let response, countries;
    if (whatToLoad.length > 0) {
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

  function filterData(countries, region) {
    let filteredCountries=[];
    if(region == 'No Filter'){
        countries.forEach((country) => {
            filteredCountries.push(country);
        })
    }
    countries.forEach((country) => {
        if(country.region == region){
            filteredCountries.push(country);
        }
    })
    return filteredCountries;
  }

  function renderCards(countries) {
    document.getElementById("cards").innerHTML = countries
      .map(
        (country) =>
          `<div class="col-10 col-sm-7 col-md-5 col-lg-3 bg-transparent">
                    <a href="details.html?cca2=${country.cca2}" class="btn p-0 m-0 text-start w-100" id="aCard">
                        <div class="card shadow-sm w-100 h-100 bg-transparent">
                            <div class="w-100 h-50" id="imgDiv">
                                <img src=${country.flags.svg} class="w-100 h-100" alt=${country.name.common} id="img">
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
                        </div>
                    </a>
                </div>`
      )
      .join("");
  }