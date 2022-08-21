//Importación de módulos necesarios para la funcionalidad de este módulo
import fetchServices from './fetchServices.js';
import getElement from './getElement.js';

//Obtenemos el contenedor de servicios
const servicesContainer = getElement('restaurant-btns');

//Función que desplegará los botónes de las categorías que actualmente existen en al API en forma de botones y asignar a el elemento seleccionado la clase active modal
export const displayServices = async (selected) => {
  //Obtendrá los resultados en formato JSON de las categorias
  const services = await fetchServices();
  //Asignará un texto en formato HTML a la variable con la estructura debida
  const servicesHTML = services
    .map((service) => {
      //Destructuración de valores a service para obtener su categoría
      const { strCategory } = service;
      // Si la categoría tiene el mismo nombre que el texto del botón seleccionado se asignará como activo con la clase "active-modal"
      let activo = strCategory == selected ? 'active-modal' : '';
      //Regresa la estructura del botón con su respectiva categoría
      return `<button class="modal-btn col my-2 restaurant-modal-btn ${activo}">
              ${strCategory}
            </button>`;
    })
    .join('');
  //Se asignará la estructura al contenedor modal y representará las categorías por botones
  servicesContainer.innerHTML = servicesHTML;
};

export default displayServices;
