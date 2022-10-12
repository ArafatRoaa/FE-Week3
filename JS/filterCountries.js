var filtered = 0;

function filterCountries(filter){
    if(filter == "all") {
        getAllCountries();
        filtered = 1;
        return;
    }

    filtered = 1;
    var elements = document.getElementById("cards").childNodes;
    console.log(elements);
    for (var i = 0; i < elements.length; i++) {
        if(document.getElementById("cards").childNodes[i].classList.contains("d-none"))
            document.getElementById("cards").childNodes[i].classList.remove("d-none");
    }
    for (var i = 0; i < elements.length; i++) {
        if ( !document.getElementById("cards").childNodes[i].classList.contains(filter) ) {
            document.getElementById("cards").childNodes[i].classList.add("d-none");
        }    
    }

}