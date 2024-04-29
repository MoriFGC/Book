const api = "https://striveschool-api.herokuapp.com/books";
const container = document.getElementById("contenitore");
const cart = document.querySelector(".carrello");
const search = document.getElementById("search");

document.addEventListener("DOMContentLoaded", () => {
  const carrelloItems = []; // Array per tenere traccia degli elementi aggiunti al carrello

  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
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
                </div>
              </div>
                `;

        container.appendChild(card);
        //-----------------------------------------------------------------------------------------
        //SEZIONE AGGIUNGI AL CARRELLO
        // messo classe aggiungi su il bottone aggiungi al carrello e puntato conm query selector
        const aggiungi = card.querySelector(".aggiungi");
                aggiungi.addEventListener("click", function (event) {
                    event.preventDefault();
                    const titolo = book.title;
                    const prezzo = book.price;
                    if (!carrelloItems.find(item => item.title === titolo)) {
                        carrelloItems.push({ title: titolo, price: prezzo });
                        card.style.border = "1px solid blue";
                        const cartResult = document.createElement("div");
                        cartResult.classList.add('carrellino');
                        cartResult.innerHTML = `
                            <h5 class="card-title">${titolo}</h5> <br>
                            <p class="card-text">${prezzo}$</p>
                        `;
                        cart.appendChild(cartResult);
                    }
                }); // fine addeventlistener di aggiungi
        //-----------------------------------------------------------------------------------------------------------------
        // SEZIONE RIMUOVI DAL CARRELLO
        const rimuovi = card.querySelector(".rimuovi");
        rimuovi.addEventListener('click', function (event) {
            event.preventDefault();
            const titolo = book.title;
            const cartItems = document.querySelectorAll('.carrellino');
            cartItems.forEach(cartItem => {
                if (cartItem.querySelector('.card-title').textContent === titolo) {
                    cartItem.remove();
                    card.style.border = '0px';
                    const index = carrelloItems.findIndex(item => item.title === titolo);
                    if (index !== -1) {
                        carrelloItems.splice(index, 1);
                    }
                }
            });
        });// FINE SEZIONE RIMUOVI
        //----------------------------------------------------------------------------------------------------------------
        //SEZIONE SVUOTA CARRELLO
        const svuotaCarrello = document.getElementById('bottone');
        svuotaCarrello.addEventListener('click', function () {
          cart.innerHTML = ""; 
          card.style.border = '0px';
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
        // funzione per creare il risultato della ricerca
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



