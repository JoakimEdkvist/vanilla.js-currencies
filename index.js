//MY VARIABLES
const currencylist = document.querySelector("#currencylist"); // MY OL ELEMENT
const favlist = document.querySelector(".favlist");
const deletefav = favlist.querySelector(".remove-button");
//let currencyStorage = {}
let localarr = [];
let data; //FETCH CONTAINER
collect();

async function collect() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/sek.json"
  );
  const result = await response.json();
  data = result;
  renderData(data);
  //console.log(data.sek) //fungerar
}

function renderData(data) {
  //console.log(data.sek) //fungerar
  currencylist.innerHTML = ""; //empty currency list before updating

  /*const keys = Object.keys(localStorage);
for (let key of keys) {
    console.log(`${key}: ${localStorage.getItem(key)}`);
}*/

  arr = JSON.parse(localStorage.getItem("currencies"));

  if (arr === null || arr === undefined || arr.length === 0) {
    console.log("Empty array");
  } else {
    arr.map((i) => {
      //build favlist with appendchild solution
      let li = document.createElement("li"); //currency container
      let favbutton = document.createElement("input"); //create add fav button
      favbutton.classList.add("fav-button");
      let removebutton = document.createElement("input"); //create remove button
      removebutton.classList.add("remove-button");
      let container = document.createElement("div"); //info containter
      let currencyname = document.createElement("h4"); //Currency name
      let rate = document.createElement("p"); //Currency rate

      currencyname.textContent = `${i?.name}`;
      let rating = `${i?.value}`;
      rating = Math.round(rating * 1000) / 1000;
      if (rating > 1) {
        rate.classList.add("positive");
      } else {
        rate.classList.add("negative");
      }
      rate.textContent = rating;
      favbutton.type = "button";
      favbutton.value = "ADD";
      removebutton.type = "button";
      removebutton.value = "REMOVE";

      favlist.appendChild(li);
      li.appendChild(container);
      li.appendChild(favbutton);
      li.appendChild(removebutton);
      favbutton.style.display = "none";
      container.appendChild(currencyname);
      container.appendChild(rate);

      localarr.push({ name: i?.name, value: i?.value });

      function myRemoveFromFavFunction() {
        console.log("tar bort");
        currencylist.appendChild(li);
        removebutton.style.display = "none";
        favbutton.style.display = "initial";
        removeindex = localarr.findIndex((o) => o.name === i?.name);
        removed = localarr.splice(removeindex, 1);
        paintMyChart();
        localStorage.removeItem("currencies"); //remove key from local storage
        localStorage.setItem("currencies", JSON.stringify(localarr));
      }

      removebutton.addEventListener("click", myRemoveFromFavFunction);

      /*
      let rating = `${i?.value}`;
      let ratingclass;
      if (rating > 1) {
        ratingclass = "positive";
      } else {
        ratingclass = "negative";
      }
      rating = Math.round(rating * 1000) / 1000; // max 0.000 digits
      const el = `<li>
                  <div> <h4> ${i?.name} </h4> <p class="${ratingclass}">${rating}</p> </div>
                  <input style="display:none" class="fav-button" type="button" value="ADD" />
                  <input class="remove-button" type="button" value="REMOVE" />
                </li>`;
      favlist.innerHTML += el;*/
    });
  }

  //CHARTS

  if (localarr !== []) {
    paintMyChart();
  }
  function paintMyChart() {
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    let labelarr = localarr.map((a) => a.name);
    let chartvalues = localarr.map((a) => a.value);
    Chart.defaults.color = "black";
    Chart.defaults.font.size = 25;
    Chart.defaults.font.textContent = "uppercase";
    const ctx = document.getElementById("myChart").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 500);
    gradient.addColorStop(0, "rgba(197, 197,197,.4)");
    gradient.addColorStop(1, "rgba(0, 153, 255, 1)");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelarr,
        datasets: [
          {
            label: "EXCHANGE VS SEK",
            data: chartvalues,
            count: labelarr.length,
            backgroundColor: gradient,
            hoverOffset: 4,
          },
        ],
      },
    });

    //chart stops
  }

  for (const key in data.sek) {
    //console.log(`${key}: ${data.sek[key]}`)//fungerar

    let li = document.createElement("li"); //currency container
    li.classList.add("splide__slide");
    let favbutton = document.createElement("input"); //create add fav button
    favbutton.classList.add("fav-button");
    let removebutton = document.createElement("input"); //create remove button
    removebutton.classList.add("remove-button");
    let container = document.createElement("div"); //info containter
    let currencyname = document.createElement("h4"); //Currency name
    let rate = document.createElement("p"); //Currency rate

    currencyname.textContent = `${key}`;
    let rating = `${data.sek[key]}`;
    rating = Math.round(rating * 1000) / 1000;
    if (rating > 1) {
      rate.classList.add("positive");
    } else {
      rate.classList.add("negative");
    }
    rate.textContent = rating;
    favbutton.type = "button";
    favbutton.value = "ADD";
    removebutton.type = "button";
    removebutton.value = "REMOVE";

    currencylist.appendChild(li);
    li.appendChild(container);
    li.appendChild(favbutton);
    li.appendChild(removebutton);
    removebutton.style.display = "none";
    container.appendChild(currencyname);
    container.appendChild(rate);

    // add to fav function when clicking button
    function myAddToFavFunction() {
      favlist.appendChild(li);
      removebutton.style.display = "initial";
      favbutton.style.display = "none";
      console.log("lägger till");
      localarr.push({ name: key, value: data.sek[key] });
      paintMyChart();
      localStorage.setItem("currencies", JSON.stringify(localarr));
      //localStorage.setItem(`${key}`, JSON.stringify(`${data.sek[key]}`)); // add key to local storage
      //console.log(localStorage.getItem(localStorage.key(1)))
    }
    function myRemoveFromFavFunction() {
      console.log("tar bort");
      currencylist.appendChild(li);
      removebutton.style.display = "none";
      favbutton.style.display = "initial";
      removeindex = localarr.findIndex((o) => o.name === `${key}`);
      removed = localarr.splice(removeindex, 1);
      paintMyChart();
      localStorage.removeItem("currencies"); //remove key from local storage
      localStorage.setItem("currencies", JSON.stringify(localarr));
    }

    favbutton.addEventListener("click", myAddToFavFunction);
    removebutton.addEventListener("click", myRemoveFromFavFunction);
  }

  var splide = new Splide(".splide", {
    autoplay: true,
    interval: 1000,
    rewind: true,
    pauseOnHover: true,
    pauseOnFocus: false,
    focus: "center",
  });

  splide.mount();
}

/*
   let li = document.createElement('li')
   li.textContent = rate[i]
   currencylist.appendChild(li)

   console.log(result.sek)
*/

/* TODO
-Pick your favourites and add to gridlayout
use webstorage/local
-use JS.chart to make diagram for favourites

fetch https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/sek.json
*/

/*
object entries
counter rend correct value
*/
