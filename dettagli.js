window.onload = () => {
  const newUrl = new URLSearchParams(location.search);
  const id = newUrl.get("id");

  const api = "https://striveschool-api.herokuapp.com/books/" + id;
  // punto il container di tutti i libri
  const container = document.getElementById("contenitore");
  // punto il container del carrello
  const cart = document.querySelector(".carrello");
  // punto la barra di ricerca
  const search = document.getElementById("search");
  // Array per tenere traccia degli elementi aggiunti al carrello
  const carrelloItems = [];
  // totale costo carrello
  const tot = document.getElementById("totale");

  // al caricamento della pagina succedono cose

  fetch(api)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati");
      }
      return response.json();
    })
    .then((data) => {
      const card = document.createElement("div");
      card.classList.add("col");

      card.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${data.img}" class="card-img-top" alt="${data.title}">
                <div class="card-body">
                  <h5 class="card-title">${data.title}</h5>
                  <p class="card-text">${data.price}$</p>
                  <a href="#" class="btn btn-primary aggiungi"><i class="bi bi-cart"></i> Add to cart</a>
                  <a href="#" class="btn btn-primary rimuovi">remove</a>
                  <a href="#" class="btn btn-primary nascondi">Hide</a>
                </div>
              </div>
                `;

      container.appendChild(card);
    });
};
