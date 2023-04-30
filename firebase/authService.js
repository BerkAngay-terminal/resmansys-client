import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "./clientApp";

const auth = getAuth(firebase);


async function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage }
    });
}


const authService = {
  signIn
}

export default authService;