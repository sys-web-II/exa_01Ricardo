console.log("Index.js Functional");

const vecCountries = ["Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica", "Panama"];
console.log("Countries", vecCountries);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("carbonForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const datos = [];
    const formData = new FormData(form);
    vecCountries.forEach(country => {
      let data = country.toLowerCase().replace(/\s/g, "");
      let Anio1 = Number(formData.get(`${data}_1`));
      let Anio2 = Number(formData.get(`${data}_2`));
      // Diferencia porcentual: ((Anio2 - Anio1) / Anio1) * 100
      let diferencia = Anio1 !== 0 ? ((Anio2 - Anio1) / Anio1) * 100 : null;
      if (diferencia !== null) {
        diferencia = Number(diferencia.toFixed(2));
      }
      datos.push({ Pais: country, Anio1, Anio2, DiferenciaPorcentual: diferencia });
    });
    console.log("Country Data:", datos);
    document.getElementById("result").innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;

    // Proyección de años
    const aniosProyeccion = 5;
    let proyeccionHTML = '<h2>Años de Proyección</h2><table border="1"><thead><tr><th>País</th>';
    for (let i = 1; i <= aniosProyeccion; i++) {
      proyeccionHTML += `<th>Año ${i}</th>`;
    }
    proyeccionHTML += '</tr></thead><tbody>';
    datos.forEach(obj => {
      proyeccionHTML += `<tr><td>${obj.Pais}</td>`;
      let valor = obj.Anio2;
      let porcentaje = obj.DiferenciaPorcentual;
      for (let i = 1; i <= aniosProyeccion; i++) {
        if (porcentaje !== null) {
          valor = valor * (1 + porcentaje / 100);
          proyeccionHTML += `<td>${valor.toFixed(2)}</td>`;
        } else {
          proyeccionHTML += `<td>-</td>`;
        }
      }
      proyeccionHTML += '</tr>';
    });
    proyeccionHTML += '</tbody></table>';
    document.getElementById("result").innerHTML += proyeccionHTML;
  });
});





