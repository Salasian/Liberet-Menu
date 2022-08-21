//Función para obtener cualquier elemento de el DOM solo con el nombre y recibirlo devuelta
// O en su caso contrario devolver error si este no se loga encontrar
export function getElement(className) {
  //Buscamos el nombre de la clase por el string mandado en parámetros
  const element = document.querySelector(`.${className}`);
  //Si el elemento el de valor Thrusty lo regresa
  if (element) return element;
  //En caso contrario se arroja el error
  throw Error(`Selection ${className} invalid`);
}

export default getElement;
