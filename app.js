const urlForm = document.querySelector('form');
const list = document.querySelector('.breakdown')
const tbl = document.querySelector('table');

const generateUserView = aURL => {

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
      };

    const html = `
        <li><b>Host:</b> ${aURL.host}</li>
        <li><b>Protocol:</b> ${aURL.protocol}</li>
        <li><b>Pathname:</b> ${aURL.pathname}</li>
        <li><b>href:</b> <a href="${aURL.href}">${aURL.href}</a></li>
    `;
    list.innerHTML += html;
}

urlForm.addEventListener('submit', e => {
    e.preventDefault();

    // console.log(urlForm.userURL.value)
    if(urlForm.userURL.value.length) {
        let jordansURL = new URL(urlForm.userURL.value)
        // console.log(jordansURL)
        generateUserView(jordansURL)
    }
    urlForm.reset();
})