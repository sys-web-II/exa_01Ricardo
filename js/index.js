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
      //parte de los vectores curisamente fue una de las partes que si sabia hacer, fue una practica persona que hice en mi casa porque aparte de recibir clases, tambien pago cursos en linea (curiosamente, solo de web) entonces para  mi no fue tanto problema
      let data = country.toLowerCase().replace(/\s/g, "");
      let Anio1 = Number(formData.get(`${data}_1`));
      let Anio2 = Number(formData.get(`${data}_2`));
      // Diferencia porcentual: ((Anio2 - Anio1) / Anio1) * 100
      let diferencia = Anio1 !== 0 ? ((Anio2 - Anio1) / Anio1) * 100 : null;
      //Solo imprime 2 deccimales, tuve que hacer esta parte con AI, logica fue hecha por mi pero me imprimia muchos decimales, no tuve la mente

      if (diferencia !== null) {
        diferencia = Number(diferencia.toFixed(2));
      }
      //a la hora de hacer el .push al vector datos, sere honesto, se me olvido como agregar strings, queria agregar "%" luego de diferencia pero no me dio la mente
      datos.push({ Pais: country, Anio1, Anio2, DiferenciaPorcentual: diferencia });
    });
    console.log("Country Data:", datos);
    document.getElementById("result").innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;

    // Proyección de años, dicenio creado por AI, logica 80% mia... tengo demaciador errores ortograficos porque aparte de ser un completo tonto y con 0 estabilidad mental, soy dislexico 
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


//POR MI MALA COSTUMBRE, ESTE TRABAJO, AL IGUAL QUE TODO ESTA ESCRITO EN INGLES Y ESPANIOL.\

//--Ricardo Contreras Ocampo





