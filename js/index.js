console.log("Index.js Functional");

const vecCountries = ["Guatemala", "El Salvador", "Honduras", "Nicaragua", "Costa Rica", "Panamá"];
console.log("Countries", vecCountries);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("carbonForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const datos = [];
    const formData = new FormData(form);
    vecCountries.forEach(country => {
      // Un ejemplo el cual yo trabaje hace 2 semanas, el cual se descubre que "/\s/g" para remplazar espacios en blanco.
      let key = country.toLowerCase().replace(/\s/g, "");
      let dato1 = Number(formData.get(`${key}_1`));
      let dato2 = Number(formData.get(`${key}_2`));
      datos.push({ pais: country, dato1, dato2 });
    });
    console.log("Datos capturados:", datos);
    document.getElementById("result").innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;
  });
});