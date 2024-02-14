let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearchResult(result) {

    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEl.appendChild(resultItem);

    let titleEl = document.createElement("a");
    titleEl.textContent = result.title;
    titleEl.href = result.link;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultItem.appendChild(titleEl);

    let breakEl = document.createElement("br");
    resultItem.appendChild(breakEl);

    let linkEl = document.createElement("a");
    linkEl.textContent = result.link;
    linkEl.href = result.link;
    linkEl.target = "_blank";
    linkEl.classList.add("result-url");
    resultItem.appendChild(linkEl);

    breakEl = document.createElement("br");
    resultItem.appendChild(breakEl);

    let linkDescription = document.createElement("p");
    linkDescription.textContent = result.description;
    linkDescription.classList.add("link-description");
    resultItem.appendChild(linkDescription);

}



function makehttpRequest(inputText) {

    let options = {
        method: "GET"
    };
    let url = "https://apis.ccbp.in/wiki-search?search=" + inputText;

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let sr = data["search_results"];
            spinnerEl.classList.toggle("d-none");

            for (let result of sr) {
                createAndAppendSearchResult(result);
            }

        });
}


function readInput(event) {

    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");

        let inputText = event.target.value;
        makehttpRequest(inputText);
    }

}


searchInputEl.addEventListener("keydown", readInput);