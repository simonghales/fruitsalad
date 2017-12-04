import {generateNewUser} from '../models/user';

export function joinAddUser(sessionKey: string, id: string, name: string, image: string, firebase: any) {

  return uploadUserImage(image, firebase)
    .then(({state, downloadURL}) => {
      return addUser(sessionKey, id, name, downloadURL, firebase);
    })

}

export function uploadUserImage(image: string, firebase: any) {
  return firebase.storage().ref('/images').putString(image, 'base64', {
    contentType: 'image/png',
  });
}

export function addUser(sessionKey: string, id: string, name: string, imageUrl: string, firebase: any) {
  return firebase.set(`/sessions/${sessionKey}/users/${id}`, generateNewUser({
    id: id,
    name: name,
    image: imageUrl,
  }));
}

export function uploadDrawingImage(image: string, firebase: any) {
  return firebase.storage().ref('/drawings').putString(image, 'base64', {
    contentType: 'image/png',
  });
}