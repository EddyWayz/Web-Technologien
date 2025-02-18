document.addEventListener("DOMContentLoaded", function () {
    let now = new Date();
    let today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + 'T' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    document.getElementById('zeitraumVon').value = today;

    let nowPlus3Hours = new Date(now.getTime());
    nowPlus3Hours.setHours(nowPlus3Hours.getHours() + 3);

    let todayPlus3 = nowPlus3Hours.getFullYear() + '-' + String(nowPlus3Hours.getMonth() + 1).padStart(2, '0') + '-' + String(nowPlus3Hours.getDate()).padStart(2, '0') + 'T' + String(nowPlus3Hours.getHours()).padStart(2, '0') + ':' + String(nowPlus3Hours.getMinutes()).padStart(2, '0');
    document.getElementById('zeitraumBis').value = todayPlus3;

    bezahlBereich();
    const liste_buchungen = [
        {
          "Zeitraum_von": "2023-11-01",
          "Zeitraum_bis": "2023-11-02",
          "Veranstaltung": "Konzert",
          "Preiskategorie": "VIP",
          "Sitzplatz": "A1",
          "Zusatzspende": 50
        },
        {
          "Zeitraum_von": "2023-12-05",
          "Zeitraum_bis": "2023-12-06",
          "Veranstaltung": "Theater",
          "Preiskategorie": "Standard",
          "Sitzplatz": "B2",
          "Zusatzspende": 20
        },
        {
          "Zeitraum_von": "2024-01-10",
          "Zeitraum_bis": "2024-01-11",
          "Veranstaltung": "Oper",
          "Preiskategorie": "Premium",
          "Sitzplatz": "C3",
          "Zusatzspende": 100
        },
        {
          "Zeitraum_von": "2024-02-15",
          "Zeitraum_bis": "2024-02-16",
          "Veranstaltung": "Ballett",
          "Preiskategorie": "Standard",
          "Sitzplatz": "D4",
          "Zusatzspende": 30
        },
        {
          "Zeitraum_von": "2024-03-20",
          "Zeitraum_bis": "2024-03-21",
          "Veranstaltung": "Comedy",
          "Preiskategorie": "Economy",
          "Sitzplatz": "E5",
          "Zusatzspende": 10
        }
      ];
      let custList = liste_buchungen;
let i;
let out = "<table id='tableId'><tr><th>Zeitraum_von</th><th>Zeitraum_bis</th><th>Veranstaltung</th><th>Preiskategorie</th><th>Sitzplatz</th><th>Zusatzspende</th></tr>";

for (i = 0; i < custList.length; i++) {
  out += "<tr><td>" +
    custList[i].Zeitraum_von +
    "</td><td>" +
    custList[i].Zeitraum_bis +
    "</td><td>" +
    custList[i].Veranstaltung +
    "</td><td>" +
    custList[i].Preiskategorie +
    "</td><td>" +
    custList[i].Sitzplatz +
    "</td><td>" +
    custList[i].Zusatzspende +
    "</td></tr>";
}
out += "</table>";
document.getElementById("table").innerHTML = out;

});

function checkDate() {
    console.log("1");
}

function checkDate() {
    let vonValue = document.getElementById('zeitraumVon').value;
    let bisValue = document.getElementById('zeitraumBis').value;


    let vonDate = new Date(vonValue);
    let bisDate = new Date(bisValue);

    let vonTimestamp = vonDate.getTime();
    let bisTimestamp = bisDate.getTime();

    if (vonTimestamp > bisTimestamp) {
        let r = confirm("Die von-Zeit ist früher als die bis-Zeit. Sollen die Zeiten automatisch getauscht werden?");
        if (r) {
            document.getElementById('zeitraumVon').value = bisValue;
            document.getElementById('zeitraumBis').value = vonValue;
        }
    }
}

function sitzplatz(number) {
    document.getElementById("sitzplatz").value = number;
}

function bezahlBereich() {
    let radioOption = document.querySelector('input[name="bezahloption"]:checked').value;

    if (radioOption === "rechnung") {
        document.getElementById("rechnungContainer").hidden = false;
        document.getElementById("kartenzahlungContainer").hidden = true;

        document.getElementById("vorname").required = true;
        document.getElementById("nachname").required = true;
        document.getElementById("strasseUndHausnummer").required = true;
        document.getElementById("postleitzahl").required = true;

        document.getElementById("nameKarteninhaber").required = false;
        document.getElementById("kartennummer").required = false;
        document.getElementById("pruefziffer").required = false;
        document.getElementById("monat").required = false;
        document.getElementById("jahr").required = false;
    }

    if ((radioOption === "visa") || (radioOption === "mastercard")) {
        document.getElementById("rechnungContainer").hidden = true;
        document.getElementById("kartenzahlungContainer").hidden = false;

        document.getElementById("vorname").required = false;
        document.getElementById("nachname").required = false;
        document.getElementById("strasseUndHausnummer").required = false;
        document.getElementById("postleitzahl").required = false;

        document.getElementById("nameKarteninhaber").required = true;
        document.getElementById("kartennummer").required = true;
        document.getElementById("pruefziffer").required = true;
        document.getElementById("monat").required = true;
        document.getElementById("jahr").required = true;
    }
}


function pruefegueltigkeitsdauer(event) {
    if (!check()) {
        return false;
    }
    if (document.querySelector('input[name="bezahloption"]:checked').value !== "rechnung") {
        let now = new Date();
        let month = document.getElementById("monat").value;
        let year = document.getElementById("jahr").value;
        if (!year || !month) {

            return false;  // Verhindert das Absenden des Formulars
        }
        if (year < now.getFullYear()) {
            alert("Die Gültigkeitsdauer liegt in der Vergangenheit. Bitte schreiben Sie dies neu.");
            document.getElementById("monat").value = null;
            document.getElementById("monat").focus();
            document.getElementById("jahr").value = null;
            return false; // Verhindert das Absenden des Formulars
        } else if (year == now.getFullYear()) {
            if (month < now.getMonth() + 1) { // Monat ist 0-basiert, daher +1
                alert("Die Gültigkeitsdauer liegt in der Vergangenheit. Bitte schreiben Sie dies neu.");
                document.getElementById("monat").value = null;
                document.getElementById("monat").focus();
                document.getElementById("jahr").value = null;
                return false; // Verhindert das Absenden des Formulars
            }
        }
    }
    // Wenn alles in Ordnung ist, wird das Formular abgeschickt
    return true;
}


function check() {
    let kartennummer = document.getElementById("kartennummer").value;
    let pruefziffer = document.getElementById("pruefziffer").value;
    let icon1 = document.getElementById("kartennummerIcon");
    let icon2 = document.getElementById("pruefzifferIcon");
    // Kombiniere Nummer und Prüfziffer
    let code = kartennummer + pruefziffer;
    console.log(code);
    if (Number.isNaN(code)) return '';
    var len = code.length;
    var parity = len % 2;
    var sum = 0;
    for (var i = len - 1; i >= 0; i--) {
        var d = parseInt(code.charAt(i));
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d;
    }
    console.log(sum % 10 == 0);
    if (sum % 10 == 0) {
        icon1.innerHTML = '<i class="bi bi-check-circle text-success"></i>';
        icon2.innerHTML = '<i class="bi bi-check-circle text-success"></i>';
        return true;
    } else {
        alert("Es wurde eine falsche Kartennummer eingegeben. Bitte ueberpruefen Sie diese.");
        document.getElementById("kartennummer").focus();
        icon1.innerHTML = '';
        icon2.innerHTML = '';
        return false;
    }
}


function resetSitzplatzAuswahl() { 
    document.getElementById("sitzplatz").value = "";
}

