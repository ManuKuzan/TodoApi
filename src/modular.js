 export const input = document.querySelector("input");


export  function count() {
    var contador = 0;
    var lista = document.querySelectorAll("input[type='checkbox']");
  
    for (let index = 0; index < lista.length; index++) {
      if (lista[index].checked) {
        contador++;
      }
    }
    contaTarea.textContent = contador;
    return console.log(contador);
  }
//buscar las tareas //
  export async function searchTareas(textoBuscar) {
    let promesaTareas = fetch(urlTareas);
    let resultadoPromesa = await promesaTareas;
    let datosTarea = await resultadoPromesa.json();
  
    let tareasFiltradas = datosTarea.filter((tarea)=>{
      return tarea.task.includes(textoBuscar)
  
  
    })
    return tareasFiltradas;
  }
  
  // url
const urlTareas= "http://localhost:3000/api/task/"
//get tareas
export async function obtenerTareas(){
let promesaTareas= fetch(urlTareas);
let resultadoPromesa= await promesaTareas;
let datosTarea = await resultadoPromesa.json()

console.log("tareas",datosTarea)
return datosTarea;
}

//post tareas(guardar tarea)

export async function postTareas(tareaParametro){

  console.log("estoy añadiendo al servidor")
  let promesaTareas= fetch(urlTareas,{
    method: "POST",
    body: JSON.stringify(
      {
      "task": tareaParametro,
      "creck": false
    }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  });

  let resultado=await promesaTareas;

if (resultado.status===200 && resultado.ok===true) {
  
  let datosInsertados=await resultado.json()
  return datosInsertados;
}else{
  console.log("no se logro insertar");
}

}



//función put
export async function marcarTarea(checkParametro,IdtareaParametro){
  let promesaTareas= fetch(urlTareas+ IdtareaParametro,{
    method: "PUT",
    body: JSON.stringify(
      {
      // "task": deleteParametro,
      "check": checkParametro
    }
    ),
    headers: {
      "Content-Type": "application/json"
    }
  });

  let resultado=await promesaTareas;

if (resultado.status===200 && resultado.ok===true) {
  
  let datosActualizados=await resultado.json()
  return datosActualizados;
}else{
  console.log("no se logro insertar");
}

}
//Delete tareas
export async function deleteTask(idDelete){


  let promesaDelete=fetch(urlTareas+idDelete,{
    method: "DELETE",
  })
  let resuldado=await promesaDelete;
  if (resuldado.status==200 && resuldado.ok===true) {
let datos= await resuldado.json()
console.log("ME ACABO DE BORRAR")
return datos;
    
  }else{
    console.log("algo paso mal")
  }
}

