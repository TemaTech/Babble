import { signInWithPopup } from "@firebase/auth"
import { auth, provider } from './config'

export const signIn = async () => {
  const result = await signInWithPopup(auth, provider);
  console.log(result.user.uid);
}