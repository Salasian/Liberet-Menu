//Importación de paquetes que se usarán en el trasncurso del codigo
import { getElement } from './getElement.js';
import { fetchDishes } from './fetchDishes.js';
import { displayDishes } from './displayDishes.js';
import { displayServices } from './displayServices.js';

//Componentes del DOM
const dias = getElement('days');
const modalHour = getElement('modal-hour');
const modalRestaurant = getElement('modal-restaurant');
const hourBtn = getElement('hour-btn');
const restaurantBtn = getElement('restaurant-btn');
const placeService = getElement('place-chip');
const placeHour = getElement('hour-chip');
const profileBtn = getElement('profile-btn');

//Variables Globales
let diaSeleccionado = 28;
let periodoSeleccionado = 0;
let categoriaSeleccionada = 'Beef';

//Arreglo Auxiliar
const arreglo = ['11:00pm-12:00pm', '1:00pm-2:00pm', '2:00pm-3:00pm'];

function changedVariables() {
  profileBtn.href = `http://127.0.0.1:5500/perfil.html?dia=${diaSeleccionado}&periodo=${periodoSeleccionado}&categoria=${categoriaSeleccionada}`;
}

//Función que escucha cuando se presióna un click sobre un botón dentro de la sección días
//para otorgarle la clase activo o quitársela en caso de que ya la tenga en su lista de clases
dias.addEventListener('click', (e) => {
  //Si al objeto que se le dió click tiene como clase nav-btn
  if (e.target.classList.contains('nav-btn')) {
    //se seleccionarán todos los botones nav
    const btnList = document.querySelectorAll('.day-btn');
    //Se recorerán
    btnList.forEach((element) => {
      //Si algún botón tiene como clase 'active' en su lista de clases
      if (element.classList.contains('active')) {
        //Se le removerá de su lista de clases
        element.classList.remove('active');
      }
    });
    //Se agrega la clase "active" a el botón clickeado
    e.target.classList.add('active');
    //Actualiza la variable con el día seleccionado
    diaSeleccionado = Number(e.target.textContent);
    changedVariables();
  }
});

//Evento que escucha cuando se presiona el botón hour-btn y cambia el estado de la clase hide
hourBtn.addEventListener('click', () => {
  modalHour.classList.toggle('hide');
  modalRestaurant.classList.add('hide');
});

//Evento que escucha cuando se presiona el botón retaurant-btn y cambia el estado de la clase hide
restaurantBtn.addEventListener('click', () => {
  modalRestaurant.classList.toggle('hide');
  modalHour.classList.add('hide');
});

//Evento que al hacer click reconocerá que el elemento clickeado sea un boton del contenedor correspondiente, iterará sobre la lista de todos los botones quitando el atributo "active-modal" y asignandolo al botón que fue seleccionado por el usuario, además mostrará los elementos de dicho elemento seleccionado con la ayuda de los métodos "getDishesByCategory" y ocultará el modal correspondiente
modalRestaurant.addEventListener('click', (e) => {
  //Si el elemento seleccionado es un botón del contenedor de servicios procederá
  if (e.target.classList.contains('restaurant-modal-btn')) {
    //Obtendrá todos los botones con la clase "restaurant-modal-btn" y los guardará en la variable
    const restaurantBtnList = document.querySelectorAll(
      '.restaurant-modal-btn'
    );
    //Recorerrá la lista eliminando todas las clases de "active-modal" que tengan todos los botones
    restaurantBtnList.forEach((element) => {
      //Si algún botón tiene como clase 'active-modal' en su lista de clases
      if (element.classList.contains('active-modal')) {
        //Se le removerá de su lista de clases
        element.classList.remove('active-modal');
      }
    });
    //Se añadirá la clase "active-modal" a el botón seleccionado
    e.target.classList.add('active-modal');
    //Actualiza la variable con el valor selecciondo en el modal
    categoriaSeleccionada = e.target.textContent.split(' ').join('');
    changedVariables();
    //Se le asignará el texto de el botón en servicios a el botón de la barra de "Chips"
    placeService.textContent = e.target.textContent;
    //Esconderá la ventana
    modalRestaurant.classList.add('hide');
    //Llamará al método fetch para buscar los resultados con la categoría correspondiente al texto del botón y eliminará todos los espacios que tenga el texto del mismo
    getDishesByCategroy(placeService.textContent.split(' ').join(''));
  }
});

//Evento que al presionar un botón dentro del contenedor modal de hour le asignará la clase "active-modal" ,asignará el valor al botón original y cerrará la ventana
modalHour.addEventListener('click', (e) => {
  //Si el elemento seleccionado es un botón del contenedor de hour procederá
  if (e.target.classList.contains('hour-modal-btn')) {
    //Obtendrá todos los botones con la clase "hour-modal-btn" y los guardará en la variable
    const hourBtnList = document.querySelectorAll('.hour-modal-btn');
    //Recorrerá la lista eliminando todas las clases de "active-modal" que tengan todos los botones
    hourBtnList.forEach((element) => {
      //Si algún botón tiene como clase 'active-modal' en su lista de clases
      if (element.classList.contains('active-modal')) {
        //Se le removerá de su lista de clases
        element.classList.remove('active-modal');
      }
    });
    //Se añadirá la clase "active-modal" a el botón seleccionado
    e.target.classList.add('active-modal');
    //Recorre el arreglo verificando si dentro del arreglo contiene el horario escogido por el usuario
    arreglo.forEach((element, index) => {
      if (
        element.includes(
          e.target.textContent.split(' ').join('').substring(2, 10)
        )
      )
        //Asigna un número referente al arreglo para la identificación del horario
        periodoSeleccionado = index;
      changedVariables();
    });
    console.log(periodoSeleccionado);
    //Se le asignará el texto de el botón en horas a el botón de la barra de "Chips"
    placeHour.textContent = e.target.textContent;
    //Esconderá la ventana
    modalHour.classList.add('hide');
  }
});

//Evento que cuando se cargan los componentes del DOM hará fetch a los dishes y después los mostrará en pantalla
window.addEventListener('DOMContentLoaded', async () => {
  getDishesByCategroy('Beef');
  displayServices();
});

//Funcion que hace fetch con la categoría dada en parametros y despliega los elementos con dicha categoría en caso de que esta coincida
const getDishesByCategroy = async (selected) => {
  //Asignamos a la variable newDishes el valor Beef como default
  let newDishes = 'Beef';
  try {
    //Se guardan los platillos en la variable newDishes con formato JSON y se regresa una lista de los elementos con la categoría puesta en parámetros
    newDishes = await fetchDishes(selected);
  } catch (error) {
    // Se tirará un error informando que la categoría puesta en parámetros no es valida
    throw Error(`Hubo un error al hacer fetch con el atributo: ${selected}`);
  }
  //Se despliegan los platillos con sus correspondientes atributos en la pantalla
  displayDishes(newDishes);
};
