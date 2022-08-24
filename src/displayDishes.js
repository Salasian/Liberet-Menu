//Se importan lo módulos necesarios para las operaciones de este módulo
import getElement from './getElement.js';

//Obtiene el contenedor de los platillos
const dishesContainer = getElement('row');

//Asignamos la dirección url de la API a una variable constante
const SINGLE_DISH_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

//Función que solicita el elemento a la API para obtener sus atributos mediante fetch usando el id como endpoint
const fetchDish = async (id) => {
  //Hacemos fetch a la API con la id puesta en parámetros
  const response = await fetch(`${SINGLE_DISH_API}?i=${id}`);
  //Transformamos los datos a el formato json
  const { meals } = await response.json();
  //Regresamos el arreglo de meals que contiene todos los atributos del platiollo
  return meals[0];
};

//Función que llama a cada platillo de la categoría y toma los atributos del mismo para obtener los atributos individuales y almacenarlos en un arreglo en forma de objeto
const constructedDishesObj = async (dishes) => {
  //Inicializamos la variable donde guardaremos los objetos
  const constructedDishes = [];
  //Recorreremos el arreglo otorgado en parámetros
  for (const dish of dishes) {
    //Obtendremos el id de el platillo
    const { idMeal: id } = dish;
    //Obtendremos los la response con los atributos necesarios de un solo platillo
    const singleDish = await fetchDish(id);
    //Deconstruye el arreglo y asigna las nuevas variables
    const { strArea, strTags } = singleDish;
    //Añade un nuevo objeto al arreglo con todos los atributos dados en categoria y los atributos de strArea y strTags y formar un nuevo objeto
    constructedDishes.push({ ...dish, strArea, strTags });
  }
  //Regresamos el arreglo con cada uno de los elementos nuevos
  return constructedDishes;
};

//Función que despliega los platillos mediante el uso del arreglo dado en parámetros y los asigna a el contenedor para desplegarlos en pantalla
export async function displayDishes(dishes) {
  //Usa la función para obtener el arreglo de los platillos con sus correspondientes atributos
  const constructedDishes = await constructedDishesObj(dishes);

  //Guarda la lista de elementos en formato de un solo string y en formato html para desplegarlos en pantalla
  const dishesHTML = constructedDishes
    .map((dish) => {
      const {
        idMeal: id,
        strMealThumb: img,
        strMeal: name,
        strArea,
        strTags,
      } = dish;
      //Desconstrucción de valores de la variable dish
      const formattedPrice = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'MEX',
      }).format(parseInt(id));
      //Regresa el platillo con sus correspondientes atributos y sus respectivas clases
      return `<article class="col-4 p-0 my-3">
            <div class="dish">
              <div class="dish-showup">
                <img src="${img}" class="dish-img" alt="dish" />
                <span class="dish-left">Quedan ${id % 10}</span>
                <div class="dish-info">
                  ${strArea} <br /><span class="yellow-text"
                    >${name}</span
                  >
                </div>
              </div>
              <div class="dish-price d-flex">
                <div>
                  <img
                    src="img/clock.png"
                    class="chips-img ml-2 mr-2"
                    alt="clock"
                  />
                </div>
                <div >${formattedPrice.slice(3)}MXN</div>
              </div>
            </div>
          </article>`;
    })
    .join('');
  //Se asignará la estructura al contenedor principal y representará los platillos correspondientes

  dishesContainer.innerHTML = dishesHTML;
}

export default displayDishes;
