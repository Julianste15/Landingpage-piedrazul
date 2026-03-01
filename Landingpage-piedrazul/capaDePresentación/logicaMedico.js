const formMedico = document.getElementById("formMedico"); 
const medicoSelect = document.getElementById("medicoSelect");

formMedico.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombres = document.getElementById("nombreMedico").value; 
  const apellidos = document.getElementById("apellidoMedico").value;
 
  const medico = gestionarMedicos.registrarMedico(nombres, apellidos);

  // actualizar select
  const option = document.createElement("option");
  option.value = medico.id;
  option.textContent = `${medico.nombres} ${medico.apellidos}`;
  medicoSelect.appendChild(option);

  formMedico.reset();
});

