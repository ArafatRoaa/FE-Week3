async function useCountry() {
const urlParams = new URLSearchParams(window.location.search);
  const cca2 = urlParams.get("cca2");
  console.log(cca2);
  let response, country, countryArr, value, cca3, res, counArr, coun;
  let borderCountries = [];
  // var langKey, lk, str;
  let url =
    "https://restcountries.com/v3.1/alpha/" + `${cca2}`;
  try {
    response = await fetch(url);
    countryArr = await response.clone().json();
    console.log(response.status);
    // console.log(countryArr);
    country = countryArr.find((item) => item.cca2 === cca2);
    // console.log(country);
    value =  country.cca3.toLowerCase();
    cca3 = `${value}`;
    //   langKey = Object.keys(country.languages)[0];
    //   console.log(langKey);
    //   lk = `${langKey}`
    //   str = country.languages.$lk;
  } catch (error) {
    console.log(error);
  }

  //to get the full names of the border countries
  if(country.borders){
    console.log(country.borders);
    country.borders.forEach(async bord => {
        let url = "https://restcountries.com/v3.1/alpha/" + `${bord}`;
        try{
            res = await fetch(url);
            counArr = await res.clone().json();
            borderCountries.push(counArr.find((item) => item.cca3 === bord));
            console.log(borderCountries);
        }
        catch(error){
          console.log(error);
        }
    });
}

  document.getElementById(
    "countryDetails"
  ).innerHTML = `<div class="col-lg-6 p-0 mb-5 mt-4 mt-sm-0" id="imgDetailsDiv">
              <img src=${country.flags.svg} alt=${country.name.common} class="w-100 h-100" id="img" >
          </div>
          <div class="col-lg-5 py-lg-4 mb-5 mb-lg-0 d-flex flex-column text-dark themedText">
              <h2 class="h3 fw-bold mb-5">${country.name.official}</h1>
              <div class="row m-0 g-0">
                  <div class="col-lg-6 mb-5">
                      <span class="d-flex justify-content-start mb-3 mb-sm-2">
                          <span class="fs-6 fw-bold">Native&nbspName:&nbsp</span>
                          <span class="fw-normal">${country.name.nativeName}</span>
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
                          <span class="fw-normal">${Object.values(country.currencies).map(cur => cur.name).join(",")}</span>
                      </span>
                      <span class="d-flex justify-content-start mb-3 mb-sm-2">
                          <span class="fs-6 fw-bold">Languages:&nbsp</span>
                          <span class="fw-normal">${country.languages.$cca3}</span>
                      </span>
                  </div>
              </div>
              <div class="d-flex flex-wrap m-0 mt-5 mt-lg-0 align-items-center mb-lg-0" id="bordersDiv">
                      <span class="fs-6 fw-bold">Border&nbspCountries:&nbsp</span>
                      <div class="d-flex flex-wrap m-0 gap-2 bg-transparent" id="borders">
                      
                      </div>
                  </div> 
              </div>
          </div>`;

          if(borderCountries){
            document.getElementById("borders").innerHTML = borderCountries
                .map(
                (country) =>
                  `<span class="shadow-sm py-1 px-2 bg-white themedBg">
                          <span class="fw-normal text-center">${country.name.common}</span>
                      </span>`
              )
              .join("");
          }
          else {
            document.getElementById("bordersDiv").innerHTML = ` `;
          }
}
