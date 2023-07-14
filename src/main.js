import{input,count,obtenerTareas,postTareas,marcarTarea,deleteTask} from './modular.js';
var mistareas= await obtenerTareas();


// var postTareasResultado=await postTareas("sacar al gato")

// var putTarea=await marcarTarea(true,"55863360-a2a8-4c1b-a35b-447e465cf64e")


// var resultadoDelete= await deleteTask("6e24054a-d0f7-492e-885d-6ca3055540e2")






const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("#elementList");
const empty = document.querySelector(".empty");
// var EliminarTarea;

/////////////////////////////////////////////////////////////////////////////////7


const contaTarea = document.querySelector("#contaTarea");
addBtn.addEventListener("keypress", addTaskEvent);
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  addTaskEvent();
});




var listaTareaGlobal = [];

async function crearTareasIniciales() {
  listaTareaGlobal = await obtenerTareas();

  for (let indiceTarea = 0;indiceTarea < listaTareaGlobal.length;indiceTarea++) {
    const tarea = listaTareaGlobal[indiceTarea];
    const text = tarea.task;
addTask(text,tarea.id,tarea.check);
    ///////////////////////////////
  }
  count()

}

async function addTaskEvent(){
  const text = input.value.toLowerCase();
  var ExisteTarea = false;
  var lista_tarea = document.querySelectorAll(".textoTarea");

  for (let index = 0; index < lista_tarea.length; index++) {
    var TextoP = lista_tarea[index];
    if (TextoP.textContent.toLowerCase().trim() === text.toLowerCase().trim()) {
      // Comparar en minúsculas
      ExisteTarea = true;
      break; // Salir del bucle si se encuentra una tarea repetida
    }
  }

  if (text.trim().length === 0) {
    Swal.fire({
      title: 'Porfavor agrega una tarea',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  } else if (ExisteTarea) {
    Swal.fire({
      icon: 'error',
      title: 'Esta tarea ya existe',
      text: 'digita otra tarea',
      footer: 'ʕ•́ᴥ•̀ʔっ'
    });
  }
  var respuestaAgregar= await postTareas(text)
  listaTareaGlobal=[... respuestaAgregar]
  var UltimaTarea=respuestaAgregar.pop()

  const idTarea=UltimaTarea.id
  const checktarea=UltimaTarea.check

 console.log("SOY EL ID ",idTarea)

  addTask(text,idTarea,checktarea);

}

function addTask(text,idTarea,checktarea) {
  if(checktarea){
   
  }
   // Convertir a minúsculas
   console.log("SOY EL ID RECIBIDO ",idTarea)
  

  var lista_tarea = document.querySelectorAll(".textoTarea");
  var ExisteTarea = false;

  for (let index = 0; index < lista_tarea.length; index++) {
    var TextoP = lista_tarea[index];
    if (TextoP.textContent.toLowerCase().trim() === text.toLowerCase().trim()) {
      // Comparar en minúsculas
      ExisteTarea = true;
      break; // Salir del bucle si se encuentra una tarea repetida
    }
  }

  if (text.trim().length === 0) {
    Swal.fire({
      title: 'Porfavor agrega una tarea',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  } else if (ExisteTarea) {
    Swal.fire({
      icon: 'error',
      title: 'Esta tarea ya existe',
      text: 'digita otra tarea',
      footer: 'ʕ•́ᴥ•̀ʔっ'
    });
    //check//
  } else {
    var check = document.createElement("input");
    check.checked=checktarea;
    check.id=idTarea;
    check.type = "checkbox";
    check.classList.add("check-button");
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.classList.add("textoTarea");
    p.textContent = text;

    check.addEventListener("change",(e)=>{
      count(e)
      var check=e.target;
      marcarTarea(check.checked,check.id)
    } );

    li.appendChild(check);
    li.appendChild(p);
    li.appendChild(addDeleteBtn(idTarea));
    ul.appendChild(li);

    input.value = "";
    empty.style.display = "none";
  }
}
// elimina el boton//
function addDeleteBtn(idTarea) {
  console.log("SOY EL ID RECIBIDO EN EL DELETE",idTarea)
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    ul.removeChild(item);
    deleteTask(idTarea)
   
    const items = document.querySelectorAll("li");

    if (items.length === 0) {
      empty.style.display = "block";
    }
    count();
  });

  return deleteBtn;
}

crearTareasIniciales()