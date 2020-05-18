// Hämtar express-modulen till vårt projekt
const express = require("express");
// Definerar vår port
const port = 3000;

// Ropar på expressfunktionen, så att vi kan använda ramverket Express
// Mer förklarat - skapar ett objekt "app" av express-klassen
const app = express();


// Middleware
app.use(express.json());

/*   7 RESTful routes */
app.get("/", function (request, response) {
  response.send("Första sidan...");
});

// Visar alla inlägg
app.get("/posts", function (request, response) {
  // send() skickar med en sträng till responseobjektet
  response.send("På den här URI:en ska alla inlägg visas");
});

// Visar ett formulär för att skapa nytt ett inlägg
app.get("/posts/new", function (request, response) {
  response.send("På den här URI:en ska ett formulär visas");
});

// Skapa ett inlägg
app.post("/posts", function (request, response) {

  let posted = request.body;
  console.log(posted);

  response.send("Skickat");
});

// Hämta ett specifikt inlägg
app.get("/posts/:id", function (request, response) {

  let id = request.params.id;
  console.log(id);
  response.send(`Här kommer du kunna se ett inlägg med id ${id}`);
});

// Visa ett fomulär för att uppdatera ett specifikt inlägg
app.get("/posts/:id/edit", function (request, response) {
  let id = request.params.id;
  response.send(
    `Här visas ett formulär för att uppdatera ett inlägg med id ${id}`
  );
});

// Uppdatera ett specifikt inlägg
app.put("/posts/:id", function (request, response) {
  let id = request.params.id;
  response.send(`Här kommer du kunna uppdatera ett inlägg med id ${id}`);
});

// Ta bort ett specikt inlägg
app.delete("/posts/:id", function (request, response) {
  let id = request.params.id;
  response.send(`Här kommer ett inlägg med id ${id} tas bort`);
});

// Definierar vad som ska hända om man når vilken annan som helst route
// d.v.s om man skriver i en annan en de routes som anges ovan
app.get("/*", function (request, response) {
  response.status(404).send("Sidan finns inte...prova en annan route!");
});

/********************* */

// Vår applikation startar en HTTP server och lyssnar på den port vi angivet
app.listen(port, function () {
  console.log(`Vår app lyssnar på port ${port}...`);
});