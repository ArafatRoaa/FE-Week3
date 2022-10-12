async function searchCountries() {
  //value of input field
  var text = document.getElementById("search").value;
  console.log(text);
  console.log(filtered);

  if(filtered){
    var elements = document.getElementById("cards").childNodes;
    var finalElements = [];
    for (var i = 0; i < elements.length; i++) {
      if(!document.getElementById("cards").childNodes[i].textContent.toLowerCase().includes(text.toLowerCase())){
        document.getElementById("cards").childNodes[i].classList.add("d-none");
      }
    }
  }
  else {
    if(text === ""){
      getAllCountries();
    };
  
    let response, countries, country;
    let countriesArr = [];
    try {
      response = await fetch("https://restcountries.com/v3.1/all");
      countries = await response.json();
      console.log(response.status);
      console.log(countries);
      country = countries.find((item) => item.name.common.toLowerCase().includes(text.toLowerCase()));
      console.log(country);
      countries.forEach(coun => {
        if(coun.name.common.toLowerCase().includes(text.toLowerCase())){
          countriesArr.push(coun);
        }
      });
      console.log(countriesArr);
    } catch (error) {
      console.log(error);
    }
    if(countriesArr.length > 0){
      document.getElementById("cards").innerHTML = countriesArr.map((country) => 
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
            ).join(" ");
    }
    else {
      document.getElementById("cards").innerHTML = ` `;
    }
  }
}
