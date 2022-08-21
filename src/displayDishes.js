//Se importan lo módulos necesarios para las operaciones de este módulo
import getElement from './getElement.js';

//Obtiene el contenedor de los platillos
const dishesContainer = getElement('row');

//Función que despliega los platillos mediante el uso del arreglo dado en parámetros y los asigna a el contenedor para desplegarlos en pantalla
export function displayDishes(dishes) {
  //Guarda la lista de elementos en formato de un solo string y en formato html para desplegarlos en pantalla
  const dishesHTML = dishes
    .map((dish) => {
      //Desconstrucción de valores de la variable dish
      const { idMeal: id, strMealThumb: img, strMeal: name } = dish;
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
                  Banquete Providencia <br /><span class="yellow-text"
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
