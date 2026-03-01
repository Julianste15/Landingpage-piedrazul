const formCitas = document.getElementById("formCitas");
const tablaCitas = document.getElementById("tablaCitas");

formCitas.addEventListener("submit", (e) => {
  e.preventDefault();
 
  const fecha = document.getElementById("fecha").value;
  const horaInicio = document.getElementById("horaInicio").value;
  const horaFin = document.getElementById("horaFin").value;

  const medicoSelect=document.getElementById("medicoSelect");
  const pacienteSelect=document.getElementById("pacienteSelect");

  const medicoId = parseInt(medicoSelect.value); 
  const pacienteId = parseInt(pacienteSelect.value); 

  console.log("Datos para registrar cita:", { fecha, horaInicio, horaFin, medicoId, pacienteId });
  
  try {
    const cita = gestionarCitas.registrarCita(fecha, horaInicio, horaFin, medicoId, pacienteId);
    console.log("Cita registrada",cita);
    //mostrar en la tabla
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cita.fecha}</td>
      <td>${cita.horaInicio}</td>
      <td>${cita.horaFin}</td>
      <td>${cita.medico.nombres} ${cita.medico.apellidos}</td>
      <td>${cita.paciente.nombres} ${cita.paciente.apellidos}</td>
    `;
    tablaCitas.appendChild(fila);

    formCitas.reset();
  } catch (error) {
    alert(error.message);
  }
});


