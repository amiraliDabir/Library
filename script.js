
//variables
let container = document.querySelector(".container")
let bucket = document.querySelector(".navbar__bucket")
let fav = [];
let carts;
let home = document.querySelector(".navbar__home");
let bar = document.getElementById("bar")
let filterBox = document.querySelector(".filter")
let filteredLanguage = document.querySelector(".filter__language");
let filterdAuthors = document.querySelector(".filter__author");
let filterdGenres = document.querySelector(".filter__genere");
let inputItems;
let ids = [];
let resetBtn = document.getElementById("filter__reset")
let unrepeatedLangs = [];
let unrepeatedats = [];
let unrepeatedgenres = [];
let authorInputs = [];
let langInputs = [];
let genreInputs = [];
let selectedLangs = [];
let selectedAuthors = [];
let selectedGenres = [];
//functions

function render(arr) {
    let temp = arr.map(book => {
        return `

<div class="container__card" id='${book.id}'>
        <div class="container__card__img">
            <img src="./assets/image/${book.id}.jpg" >
        </div>
        <div class="container__card__detail">
        <h2 class="container__card__detail__title"> ${book.title}</h2>
        <p class="container__card__detail__author">${book.author}</p>
        <button class="container__card__detail__addToCart">اضافه به سبد<i class="fa-solid fa-cart-shopping"></i></button>
        
        </div>
    </div>
                `
    }).join("")
    container.innerHTML = temp;
    carts = document.querySelectorAll(".container__card__detail__addToCart");

    for (const cart of carts) {
        cart.addEventListener("click", addToFav);
    }
}


function addToFav(ev) {
    let purchaseBtn = document.createElement("button")
    purchaseBtn.innerHTML = `ادامه و پرداخت...`
    purchaseBtn.classList.add("container__card__detail__purchase")
    ev.target.style = "display:none";
    ev.target.parentElement.appendChild(purchaseBtn)
    let id = (ev.target.parentElement.parentElement.getAttribute("id"))
    let found = BOOKS.find(book => book.id == id);
    if (!fav.includes(found)) {
        fav.push(found);
    }
    localStorage.setItem("cartItems", JSON.stringify(fav));
}

function showFav() {
    filterBox.classList.add("hidden")
    container.innerHTML = "";
    container.classList.remove("container");
    container.classList.add("favContainer");
    renderFavs()

}

function renderFavs() {
    fav = JSON.parse(localStorage.getItem("cartItems"));
    let temp = fav.map(favBook => {
        return `
    <div class="favContainer__card" id=${favBook.id}>
        <img src="./assets/image/${favBook.id}.jpg">
        <div class="favContainer__card__detail">
            <h2><span>عنوان:</span>${favBook.title}</h2>
            <p><span>شاعر/نویسنده:</span>${favBook.author}</p>
            <p><span>زبان:</span>${favBook.language}</p>
            <i class="fa-solid fa-trash trash-can" style="color:#c10000; cursor:pointer;";></i>
        </div>
    
    </div>
    `
    }).join("")
    container.innerHTML = temp;
    let bins = document.querySelectorAll(".trash-can");
    for (const bin of bins) {
        bin.addEventListener("click", Delete)
    }
}


function Delete(ev) {
    let card = ev.target.parentElement.parentElement;
    let id = card.getAttribute("id");
    let newfav = fav.filter(book => {
        return book.id != id
    })
    fav = newfav;
    localStorage.setItem("cartItems", JSON.stringify(fav));
    renderFavs()



}

function showMenu() {
    filterBox.classList.toggle("hidden")
}

function Home() {
    filterBox.classList.remove("hidden")
    container.classList.remove("favContainer");
    container.classList.add("container");
    container.innerHTML = ""
    render(BOOKS);
}
function renderFilters() {
    let langs = BOOKS.map(item => {
        return item.language;


    }).sort();
    for (let index = 0; index < langs.length; index++) {
        if (langs[index] != langs[index + 1]) {
            unrepeatedLangs.push(langs[index]);
        }

    }
    let temp1 = unrepeatedLangs.map(lang => {
        return `
    <div>
        <input type="checkbox" id="${lang}" name="language" />
        <label for="${lang}">${lang}</label>
    </div>
    `
    }).join("");
    filteredLanguage.innerHTML += temp1;
    langInputs = document.getElementsByName("language");


    let authors = BOOKS.map(item => {
        return item.author;


    }).sort();

    for (let index = 0; index < authors.length; index++) {
        if (authors[index] != authors[index + 1]) {
            unrepeatedats.push(authors[index]);
        }

    }
    let temp2 = unrepeatedats.map(author => {
        return `
    <div>
        <input type="checkbox" id="${author}" name="author" />
        <label for="${author}">${author}</label>
    </div>
        `}).join("");
    filterdAuthors.innerHTML += temp2;
    authorInputs = document.getElementsByName("author");


    let genres = BOOKS.map(item => {
        return item.genre;
    }).sort();
    for (let index = 0; index < genres.length; index++) {
        if (genres[index] != genres[index + 1]) {
            unrepeatedgenres.push(genres[index]);
        }

    }
    let temp3 = unrepeatedgenres.map(genre => {
        return `
    <div>
        <input type="checkbox" id="${genre}" name="genre" />
        <label for="${genre}">${genre}</label>
    </div>
        `}).join("");
    filterdGenres.innerHTML += temp3;
    genreInputs = document.getElementsByName("genre");


    for (const iterator of authorInputs) {
        iterator.addEventListener("change", filterBooks)
    }
    for (const iterator of genreInputs) {
        iterator.addEventListener("change", filterBooks)
    }
    for (const iterator of langInputs) {
        iterator.addEventListener("change", filterBooks)
    }
}


function filterBooks() {
    selectedAuthors = []
    selectedGenres = []
    selectedLangs = []
    langInputs.forEach(element => {
        if (element.checked && !(selectedLangs.includes(element.id))) {
            selectedLangs.push(element.id);
        }
    });
    authorInputs.forEach(element => {
        if (element.checked && !(selectedAuthors.includes(element.id))) {
            selectedAuthors.push(element.id);
        }
    });
    genreInputs.forEach(element => {
        if (element.checked && !(selectedGenres.includes(element.id))) {
            selectedGenres.push(element.id);
        }
    });
    if (selectedLangs.length == 0) {
        selectedLangs = unrepeatedLangs;
    }
    if (selectedAuthors.length == 0) {
        selectedAuthors = unrepeatedats;
    }
    if (selectedGenres.length == 0) {
        selectedGenres = unrepeatedgenres;
    }


    let filteredBook = BOOKS.filter(book => {
        return selectedAuthors.includes(book.author);
    });
    filteredBook = filteredBook.filter(book => {
        return selectedLangs.includes(book.language)
    });
    filteredBook = filteredBook.filter(book => {
        return selectedGenres.includes(book.genre)
    });

    console.log(filteredBook)
    // if (filteredBook.length == 0) {
    //     render(BOOKS)
    // }
    render(filteredBook)

}
function reset() {
    selectedAuthors, selectedGenres, selectedLangs = [];
    for (const iterator of langInputs) {
        iterator.checked = false;
    }
    for (const iterator of authorInputs) {
        iterator.checked = false;
    }
    for (const iterator of genreInputs) {
        iterator.checked = false;
    }
    render(BOOKS);

}


//events

bucket.addEventListener("click", showFav);
home.addEventListener("click", Home);
bar.addEventListener("click", showMenu)

//calling-functions
render(BOOKS);
renderFilters();

