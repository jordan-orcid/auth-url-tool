const urlForm = document.querySelector("form");
const list = document.querySelector(".breakdown");
const tbl = document.querySelector("table");

const scopes = [
  "/authenticate",
  "/read-limited",
  "/activities/update",
  "/person/update",
  "openid",
];
const generateUserView = (aURL) => {
  aURL.searchParams.sort();
  let keys = aURL.searchParams.keys();

  for (let key of keys) {
    let val = aURL.searchParams.get(key);
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    cell.innerText = key;
    row.appendChild(cell);
    cell = document.createElement("td");
    cell.innerText = val;
    row.appendChild(cell);
    tbl.appendChild(row);

    //check to see if included scopes match the 3-legged (authorization code) scopes for ORCID
    if (key == "scope" && checkScopes(cell.innerText) == true) {
      cell.style.color = "green";
    } else if (key == "scope" && checkScopes(cell.innerText) == false) {
      cell.style.color = "red";
    }
  }
  const html = `
        <li><b>Host:</b> ${aURL.host}</li>
        <li><b>Protocol:</b> ${aURL.protocol}</li>
        <li><b>Pathname:</b> ${aURL.pathname}</li>
        <li><b>href:</b> <a href="${aURL.href}">${aURL.href}</a></li>
    `;
  list.innerHTML += html;
};

urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (urlForm.userURL.value.length) {
    let jordansURL = new URL(urlForm.userURL.value);
    generateUserView(jordansURL);
  }
  urlForm.reset();
});

const checkScopes = (scopesInLink) => {
  const scopeArr = scopesInLink.split(" ");
  const result = scopeArr.every((element) => {
    return scopes.includes(element);
  });
  return result;
};
