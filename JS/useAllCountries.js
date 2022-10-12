async function getAllCountries() {
  let response, countries;
  try {
    response = await fetch("https://restcountries.com/v3.1/all");
    countries = await response.json();
    console.log(response.status);
    console.log(countries);
  } catch (error) {
    console.log(error);
  }
  document.getElementById("cards").innerHTML = countries
    .map(
      (country) =>
        `<div class="col-10 col-sm-7 col-md-5 col-lg-3 bg-transparent ${country.region}">
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