import { v4 as uuid } from 'uuid';
import { USERS } from '../data';
import { IUser } from '../interfaces';

export function findAllUsersInDataBase() {
  return new Promise((resolve, reject) => {
    resolve(USERS);
  });
}

export function findUserByIdInDataBase(id: string) {
  return new Promise((resolve, reject) => {
    const userIndex = USERS.findIndex((item) => item.id === id);
    resolve(USERS[userIndex]);
  });
}

export function createNewUserInDatabase(
  username: string,
  age: string,
  hobbies: string[]
) {
  return new Promise((resolve, reject) => {
    const newUser: IUser = {
      id: uuid(),
      username,
      age: Number(age),
      hobbies,
    };
    USERS.push(newUser);
    resolve(newUser);
  });
}

export function updateUserInDatabase(
  userId: string,
  username: string,
  age: string,
  hobbies: string[]
) {
  return new Promise((resolve, reject) => {
    const userIndex = USERS.findIndex((item) => item.id === userId);
    const updateUser: IUser = {
      id: USERS[userIndex].id,
      username: username || USERS[userIndex].username,
      age: Number(age) || USERS[userIndex].age,
      hobbies: hobbies || USERS[userIndex].hobbies,
    };
    USERS.splice(userIndex, 1, updateUser);
    console.log('update users', USERS);
    resolve(updateUser);
  });
}

export function removeUserFromDatabase(user: IUser) {
  const userIndex = USERS.findIndex((item) => item.id === user.id);
  return new Promise((resolve, reject) => {
    USERS.splice(userIndex, 1);
    resolve(true);
  });
}
