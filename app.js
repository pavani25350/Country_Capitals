const dbParam = JSON.stringify({ table: "countries" });
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
    const myObj = JSON.parse(this.responseText);
    let text = "<table id='tab'><tr><th>COUNTRY</th><th>CAPITAL</th><th>POPULATION</th><th>DETAILS</th></tr>";
    for (let x in myObj) {
        text += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].capital + "</td><td>" + `<button onclick='abc(${myObj[x].population})'>Get Population</button>` + "</td><td>" + `<button onclick='details("${myObj[x].name}")'>Action</button>` + "</td></tr>";
    }
    text += "</table>"
    document.getElementById("demo").innerHTML = text;
}
xmlhttp.open("GET", "https://restcountries.eu/rest/v2/all");
xmlhttp.send("x=" + dbParam);

function abc(temp) {
    const eve = document.querySelector('.box');
    eve.classList.toggle('active');
    eve.innerHTML = "population is " + `${temp}`;
    eve.append(btn);
}
var btn = document.createElement('button');
var txt = document.createTextNode("cancel");
btn.appendChild(txt);
btn.addEventListener('click', function () {
    document.getElementsByClassName('active')[0].classList.remove('active');
})
btn.id = "demo1";

function searchfun() {
    var count = 0;
    var noc = document.getElementById("nocountry");
    let ival = document.getElementById("text1").value.toUpperCase();
    let table = document.getElementById('tab');
    let row = table.getElementsByTagName('tr');

    table.style.display = "";
    noc.style.display = "none";
    for (var i = 0; i < row.length; i++) {
        let tdata = row[i].getElementsByTagName('td')[0];
        if (tdata) {
            let data = tdata.innerHTML;
            if (data.toUpperCase().indexOf(ival) === 0) {
                row[i].style.display = "";
            }
            else {
                row[i].style.display = "none";
                count += 1;

            }
        }
    }
    if (count === row.length - 1) {
        table.style.display = "none";
        noc.style.display = "";
        noc.innerHTML = "No country found";
        noc.style.textAlign = "center";
        noc.style.padding = "10px";
        noc.style.background = "rgb(201,143,105)";
    }
}
var link = String("https://restcountries.eu/rest/v2/name/aruba?fullText=true");
var str1 = "https://restcountries.eu/rest/v2/name/";
var str3 = "?fullText=true";

function details(temp) {
    var str2 = str1 + temp + str3;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", str2);
    xmlhttp.onload = function () {
        var data = JSON.parse(this.responseText);
        const eve = document.querySelector('.box');
        eve.classList.toggle('active');
        eve.innerHTML = "Details are " + "<br>" + "Currency :" + data[0]["currencies"][0]["name"] + "<br>" + "symbol:  " + data[0]["currencies"][0]["symbol"] + "<br>" + "Click to see flag:" + `<button onclick='image("${data[0]['flag']}")'>Country Flag</button>`;
        eve.append(btn);
    }
    xmlhttp.send("x=" + dbParam);
}
function image(img1) {
    // img1.width = "500px";
    // img1.height = "500px";
    // img1.target = "_blank";
    // location.href = img1;
    window.open(img1, " "); //opens in new tab
}