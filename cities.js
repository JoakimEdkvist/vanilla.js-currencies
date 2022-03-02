fetch("https://avancera.app/cities/")
  .then((response) => response.json())
  .then((result) => {
    //console.log(result);
    const citylist = document.querySelector("#citylist");

    result.map((i) => {
      let li = document.createElement("li");
      li.textContent = `${i?.name}` + "," + `${i?.population}`;
      citylist.appendChild(li);
    });
  });

//Textfields selectors
const deletecity = document.querySelector("#delete-id");
const nameinput = document.querySelector("#newcityname");
const popnumber = document.querySelector("#popnumber");
const newcityid = document.querySelector("#newcityid");
const findcitybyid = document.querySelector("#findcity");
const changename = document.querySelector("#changename");
const changepop = document.querySelector("#changepop");

//forms variables
const deleteform = document.querySelector("#deleteform"); // DELETE FORM ELEMENT
const replaceform = document.querySelector("#replaceform"); // REPLACE CITY
const addform = document.querySelector("#addform"); //ADD A NEW CITY

// DELETE CITY FORM LISTENER
deleteform.addEventListener("submit", () => {
  fetch("https://avancera.app/cities/" + deletecity.value, {
    method: "DELETE",
  }).then((response) => {
    console.log(response);
  });

  event.preventDefault();
});

// POST A NEW CITY FORM
addform.addEventListener("submit", () => {
  fetch("https://avancera.app/cities/", {
    body: JSON.stringify({
      //id: newcityid.value,
      name: nameinput.value,
      population: Number(popnumber.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  }).then((response) => {
    console.log(response);
  });
  event.preventDefault();
});

// CHANGE AN ALREADY EXISTING CITY FORM
let totalchanges = {};
let exitobject = {};

changename.addEventListener("input", () => {
  if (changename.value !== null) {
    totalchanges.name = changename.value;
  } else {
    exitobject.name = changename.value;
  }
});

changepop.addEventListener("input", () => {
  if (changepop.value !== null) {
    totalchanges.population = Number(changepop.value);
  } else {
    exitobject.population = Number(changepop.value);
  }
});

replaceform.addEventListener("submit", () => {
  fetch("https://avancera.app/cities/" + findcitybyid.value, {
    body: JSON.stringify(totalchanges),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  }).then((response) => {
    console.log(response);
  });
  event.preventDefault();
});
