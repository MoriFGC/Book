const api = "https://striveschool-api.herokuapp.com/books";
// punto il container di tutti i libri
const container = document.getElementById("contenitore");
// punto il container del carrello
const cart = document.querySelector(".carrello");
// punto la barra di ricerca
const search = document.getElementById("search");
// Array per tenere traccia degli elementi aggiunti al carrello
const carrelloItems = []; 
// totale costo carrello
const tot = document.getElementById('totale');

// al caricamento della pagina succedono cose
document.addEventListener("DOMContentLoaded", () => {
  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${book.img}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.price}$</p>
                  <a href="#" class="btn btn-primary aggiungi"><i class="bi bi-cart"></i> Add to cart</a>
                  <a href="#" class="btn btn-primary rimuovi">remove</a>
                  <a href="#" class="btn btn-primary nascondi">Hide</a>
                  <a href="details.html?id=${book.asin}" class="btn btn-primary ">See details</a>
                </div>
              </div>
                `;

        container.appendChild(card);
        //-----------------------------------------------------------------------------------------
        //SEZIONE AGGIUNGI AL CARRELLO
        // messo classe aggiungi su il bottone aggiungi al carrello e puntato conm query selector
        const aggiungi = card.querySelector(".aggiungi");
                // al click del bottone Add to cart succedono cose
                aggiungi.addEventListener("click", function (event) {
                    event.preventDefault();
                    // punto il prezzo è il titolo
                    const titolo = book.title;
                    const prezzo = book.price;
                    // se non trova un titolo pusha il titolo e il prezzo dentro il carrello
                    if (!carrelloItems.find(item => item.title === titolo)) {
                        carrelloItems.push({ title: titolo, price: prezzo });
                        // aggiungo un bordo alla card la metto nel carrello
                        card.style.border = "1px solid blue";
                        const cartResult = document.createElement("div"); // creo un div che poi metterò dentro al carrello
                        cartResult.classList.add('carrellino'); // metto una classe che mi servirà dopo per il rimuovi
                        cartResult.innerHTML = `
                            <h5 class="card-title">${titolo}</h5> <br>
                            <p class="card-text">${prezzo}$</p>
                        `;
                        cart.appendChild(cartResult);

                        const totale = carrelloItems.reduce((acc, curr) => acc + curr.price, 0);
                        tot.innerHTML = `Totale: ${totale}`;
                    }
                }); // fine addeventlistener di aggiungi
        //-----------------------------------------------------------------------------------------------------------------
        // SEZIONE RIMUOVI DAL CARRELLO
        // punto la classe rimuovi sul bottone remove
        const rimuovi = card.querySelector(".rimuovi");
        // al click di questo bottone succedono cose
        rimuovi.addEventListener('click', function (event) {
            event.preventDefault();
            const titolo = book.title; // punto i titoli dei libri
            const cartItems = document.querySelectorAll('.carrellino'); // vado a puntare la classe carrellino che ho aggiunto prima
            cartItems.forEach(cartItem => {
                if (cartItem.querySelector('.card-title').textContent === titolo) { // se trovo un titolo 
                    cartItem.remove(); // rimuovo il titolo dal carrello
                    card.style.border = '0px';
                    const index = carrelloItems.findIndex(item => item.title === titolo); // se trovo un titolo
                    if (index !== -1) { // se non è -1
                        carrelloItems.splice(index, 1); // toglie un elemento dall'array
                    };
                };
                  const totale = carrelloItems.reduce((acc, curr) => acc + curr.price, 0); // calcolo il prezzo del carrello
                  tot.innerHTML = `Totale: ${totale}`; // aggiungo il totale nel html
            });
        });// FINE SEZIONE RIMUOVI
        //----------------------------------------------------------------------------------------------------------------
        // SEZIONE NASCONDI CARD
        const nascondi = card.querySelectorAll('.nascondi');
        nascondi.forEach(hide => {
          hide.addEventListener('click', function() {
            card.style.display = 'none'
          })
        })
        //-----------------------------------------------------------------------------------------------------------------
        //SEZIONE SVUOTA CARRELLO
        const svuotaCarrello = document.getElementById('bottone');
        svuotaCarrello.addEventListener('click', function () {
          // Svuota l'array carrelloItems
          carrelloItems.length = 0;

          // Rimuovi tutti gli elementi figlio del container del carrello
          cart.innerHTML = "";
        
          // Resetto lo stile
          card.style.border = '0px'

          const totale = carrelloItems.reduce((acc, curr) => acc + curr.price, 0);
          tot.innerHTML = `Totale: ${totale}`;
        });
        //FINE SVUOTA CARRELLO
        //-----------------------------------------------------------------------------------------------------------------
        // Sezione ricerca
        search.addEventListener("input", function () {
          const result = search.value.toLowerCase();
          const filtredBooks = data.filter((book) =>
            book.title.toLowerCase().includes(result)
          );

          if (result.length >= 1) {
            // Esegui la ricerca solo se la lunghezza del testo di ricerca è almeno 3

            searchResults(filtredBooks);
          }
        });
        //-----------------------------------------------------------------------------------------------------------------
        // funzione per creare il risultato della ricerca, ricreo le cards
        function searchResults(books) {
          container.innerHTML = ""; // Rimuovi tutte le card esistenti prima di visualizzare i nuovi risultati

          books.forEach((book) => {
            const card = document.createElement("div");
            card.classList.add("col");

            card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                    <img src="${book.img}" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">${book.price}$</p>
                      <a href="#" class="btn btn-primary aggiungi"><i class="bi bi-cart"></i> Add to cart</a>
                      <a href="#" class="btn btn-primary rimuovi">remove</a>
                    </div>
                  </div>
                    `;

            container.appendChild(card);
          });
        } // FINE SEZIONE RICERCA
        //---------------------------------------------------------------------------------------
      });
    });
});



