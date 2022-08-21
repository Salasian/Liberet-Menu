//URL para la búsqueda por la categoría Beef
const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
//Función que obtiene todos los platillos con la categroía Beef y los manda como un arreglo
export const fetchDishes = async (endpoint) => {
  //Hacemos fetch a la url correpondiente para obtener los platillos con categría "Beef"
  const res = await fetch(url + endpoint);
  //Convertimos los datos de la API a JSON
  const data = await res.json();
  //Regresamos el atributo "meals", donde vienen todos los elementos con la categoría
  return data.meals;
};

export default fetchDishes;
