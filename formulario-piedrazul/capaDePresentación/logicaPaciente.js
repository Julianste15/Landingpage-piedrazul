const formPaciente = document.getElementById("formPaciente"); 
const pacienteSelect = document.getElementById("pacienteSelect");

formPaciente.addEventListener("submit", (e) => {
  e.preventDefault(); 
  const nombres = document.getElementById("nombrePaciente").value; 
  const apellidos = document.getElementById("apellidoPaciente").value;

  const paciente = gestionarPacientes.registrarPaciente(nombres, apellidos);
  console.log("Paciente registrado: ", paciente);
  //actualizar select
  const option = document.createElement("option");
  option.value = paciente.id;
  option.textContent = `${paciente.nombres} ${paciente.apellidos}`;
  pacienteSelect.appendChild(option);

  formPaciente.reset();
});


