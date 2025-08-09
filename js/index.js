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
      let dato1 = Number(formData.get(`${data}_1`));
      let dato2 = Number(formData.get(`${data}_2`));
      // Diferencia porcentual: ((dato2 - dato1) / dato1) * 100 

      let diferencia = dato1 !== 0 ? ((dato2 - dato1) / dato1) * 100 : null;
      // no pude hacer que que imprimiera un maximo de 2 decimales, tuve que usar AI
      if (diferencia !== null) {
        diferencia = diferencia.toFixed(2);
      }
      datos.push({ Pais: country, dato1, dato2, DiferenciaPorcentual: diferencia});
    });
    console.log("Country Data:", datos);
    document.getElementById("result").innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;
  });
});





