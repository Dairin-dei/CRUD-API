import { createServer, IncomingMessage, ServerResponse } from 'http';

import {
  getAllUsers,
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
  sentErrorMessage,
} from './controllers/userController';

export const myServer = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    if (request.url === '/api/users' && request.method === 'GET') {
      getAllUsers(response);
    } else if (
      request.url?.match(/\/api\/users\/.*/) &&
      request.method === 'GET'
    ) {
      getUser(request, response);
    } else if (request.url === '/api/users' && request.method === 'POST') {
      createNewUser(request, response);
    } else if (
      request.url?.match(/\/api\/users\/.*/) &&
      request.method === 'PUT'
    ) {
      updateUser(request, response);
    } else if (
      request.url?.match(/\/api\/users\/.*/) &&
      request.method === 'DELETE'
    ) {
      deleteUser(request, response);
    } else {
      sentErrorMessage(response);
    }
  }
);
