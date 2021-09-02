const searchBtn = document.getElementById('search-btn');
// Event handler and Load data
searchBtn.addEventListener('click', function () {
    const search = document.getElementById('search-text');
    const searchText = search.value;
    search.value = ' ';
    console.log(searchText);
    const url = `https://openlibrary.org/search.json?q=${searchText}`;  // URL for Books
    sppiner("visible");
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))
})

const displayData = datas => {
    const totalFound = datas.numFound;
    const searchResult = document.getElementById('search-result');
    const totalDataFound = document.getElementById('data-found');
    const totalFoundDiv = document.createElement('div');

    totalDataFound.innerHTML = "";
    totalFoundDiv.innerHTML = `
        <h2 class="text-center mb-4">Total Showing Result ${totalFound} Books</h2>  
    `;
    totalDataFound.appendChild(totalFoundDiv);

    if (totalFound === 0) {
        alert('Please input a valid book name');
        sppiner("hidden");
    }
    searchResult.innerHTML = "";

    // HTML display part
    datas.docs.forEach(data => {
        const div = document.createElement('div');
        div.classList.add('col');
        // image showing part
        data?.cover_i
            ? (imgUrl = `https://covers.openlibrary.org/b/id/${data?.cover_i}-M.jpg`)
            : (imgUrl = "images/no_pic.png");

        div.innerHTML = `
        <div class="col">
        <div class="card">
            <img height='300px' src=${imgUrl}  class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Book Name: ${data.text[3]}</h5>
            <p class="card-text">Author Name: ${data.author_name}</p>
            <p class="card-text">Publishing Year: ${data.publish_date}</p>
          </div>
        </div>
      </div>
        `;
        searchResult.appendChild(div);
        sppiner("hidden");
    });
}

// sppiner function
sppiner = (property) => {
    const sppiner = document.getElementById("sppiner");
    sppiner.style.visibility = property;
};
