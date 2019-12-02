// tslint:disable:no-console
import axios from 'axios';
import { veServices } from './ve';

const responseSuccess: (options: any) => (response: any) => any =
(options) => (response) => {
  if (response.data.success) {
    // Devolver solamente los datos
    return response.data;
  }

  // Si es un mensaje con errores es porque es un error de validacion
  // y lo deberia de tratar el formulario correspondiente
  if (!response.data.errors) {
    // Notificar del error producido
    options.core.emit('message.show', {
      type: 'error',
      title: 'js.services.response_error', // I18n.t('js.services.response_error'),
      message: response.data.message,
    });
  }
};

const responseError: (options: any) => (error: any) => any =
(options) => (error) => {
  console.group('Services.responseError');
  if (error.response) {
    // The request was made, but the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
  console.groupEnd();

  // Notificar del error producido
  options.core.emit('message.show', {
    type: 'error',
    title: 'js.services.request_error', // I18n.t('js.services.request_error'),
    message: error.message,
  });
  return Promise.reject(error);
};

const services: (
  options: {
    core: any,
  },
) => any =
(options) => {
  // Add a response interceptor
  if (options) { // TODO : Cleanup (this is a hack)
    axios.interceptors.response.use(responseSuccess(options), responseError(options));
  }

  return {
    ve: veServices(),
  };
};

export default services;
