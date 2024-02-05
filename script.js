//data
const BOOKS = [
    {
        id: 1,
        title: "خواجه تاجدار",
        author: "ژان گور",
        published_date: 2007,
        language: "persian",
        genre: "تاریخ",
        imgSrc: "1.jpg"
    },
    {
        id: 2,
        title: "ضیافت",
        author: "افلاطون",
        published_date: 385,
        language: "greek",
        genre: "فلسفه",
        imgSrc: "2.jpg"
    },
    {
        id: 3,
        title: "منطق الطیر",
        author: "عطار",
        published_date: 1177,
        language: "persian",
        genre: "شعر",
        imgSrc: "3.jpg"
    },
    {
        id: 4,
        title: "مثنوی معنوی",
        author: "مولوی",
        published_date: 1258,
        language: "persian",
        genre: "شعر",
        imgSrc: "4.jpg"
    },
    {
        id: 5,
        title: "دیوان حافظ",
        author: "حافظ",
        published_date: 1200,
        language: "persian",
        genre: "شعر",
        imgSrc: "5.jpg"
    },
    {
        id: 6,
        title: "رومیو و جولیت",
        author: "ویلیام شکسپیر",
        published_date: 1595,
        language: "english",
        genre: "عاشقانه",
        imgSrc: "6.jpg"
    },
    {
        id: 7,
        title: "ویس و رامین",
        author: "فخرالدین اسعد گرگانی",
        published_date: 1054,
        language: "persian",
        genre: "عاشقانه",
        imgSrc: "7.jpg"
    },
    {
        id: 8,
        title: "گلستان",
        author: "سعدی",
        published_date: 1258,
        language: "persian",
        genre: "شعر",
        imgSrc: "8.jpg"
    },
    {
        id: 9,
        title: "بوستان",
        author: "سعدی",
        published_date: 1257,
        language: "persian",
        genre: "شعر",
        imgSrc: "9.jpg"
    },
    {
        id: 10,
        title: "گلشن راز",
        author: "شیخ محمود شبستری",
        published_date: 1311,
        language: "persian",
        genre: "شعر",
        imgSrc: "10.jpg"
    },
    {
        id: 11,
        title: "لیلی و مجنون",
        author: "نظامی",
        published_date: 1188,
        language: "persian",
        genre: "عاشقانه",
        imgSrc: "11.jpg"
    },
    {
        id: 12,
        title: "شاهنامه",
        author: "فردوسی",
        published_date: 1010,
        language: "persian",
        genre: "شعر",
        imgSrc: "12.jpg"
    },
    {
        id: 13,
        title: "ایلیاد",
        author: "هومر",
        published_date: 762,
        language: "greek",
        genre: "شعر",
        imgSrc: "13.jpg"
    },
    {
        id: 14,
        title: "اودیسه",
        author: "هومر",
        published_date: 725,
        language: "greek",
        genre: "شعر",
        imgSrc: "14.jpg"
    },
    {
        id: 15,
        title: "هملت",
        author: "ویلیام شکسپیر",
        published_date: 1609,
        language: "greek",
        genre: "درام",
        imgSrc: "15.jpg"
    },
    {
        id: 16,
        title: "دن کیشوت",
        author: "میگل دسروانتس",
        published_date: 1605,
        language: "spanish",
        genre: "درام",
        imgSrc: "16.jpg"
    }
]



//variables

let container = document.querySelector(".container")
let bucket = document.querySelector(".navbar__bucket")
let fav = [];
let pluses;
let home = document.querySelector(".navbar__home");
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
<div class="container__card " id='${book.id}'>
    <div class="container__card__cover">
        <h2 class="container__card__cover__title"><span>عنوان:</span>  ${book.title}</h2>
        <i class="far fa-plus container__card__cover__plus"></i>
        <p class="container__card__cover__author">${book.author}</p>
        <p class="container__card__cover__language">${book.language}</p>
    </div>
    <img src="./assets/image/${book.id}.jpg">
</div>
                `
    }).join("")
    container.innerHTML = temp;
    pluses = document.querySelectorAll(".container__card__cover__plus");

    for (const plus of pluses) {
        plus.addEventListener("click", addToFav);
    }
}


function addToFav() {
    let id = (this.parentElement.parentElement.getAttribute("id"))
    let found = BOOKS.find(book => book.id == id);
    if (!fav.includes(found)) {
        fav.push(found);
    }

}

function showFav() {
    container.innerHTML = "";
    filterBox.style = "display:none";
    container.classList.remove("container");
    container.classList.add("favContainer");
    renderFavs()

}

function renderFavs() {
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


function Delete() {
    let card = this.parentElement.parentElement;
    let id = card.getAttribute("id");
    let newfav = fav.filter(book => {
        return book.id != id
    })
    fav = newfav;
    renderFavs()



}

function Home() {
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

//calling-functions
render(BOOKS);
renderFilters();
