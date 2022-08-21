//Url usada para obtener las categorías de los platillos
const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

//Función que recupera todas las categorías que hay existentes en la API
export const fetchServices = async () => {
  //Conseguirá los resultados por medio de fetch
  const res = await fetch(url);
  //Formateará los datos a JSON
  const data = await res.json();
  //Regresará el atributo categories con la lsita de las categorias
  return data.categories;
};

export default fetchServices;
