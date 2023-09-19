import { useState } from "react";
import { database, googleProvider } from "../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const Login = () =>{
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const SignIn = async() => {
    try{
      await createUserWithEmailAndPassword(database, email, Password)
    }catch(err){
      console.error(err);
    }
  };

  const SignInWithGoogle = async() => {
    try{
      await signInWithPopup(database, googleProvider);
    }catch(err){
      console.error(err);
    }
  };

  const logOut = async() => {
    try{
      await signOut(database );
    }catch(err){
      console.error(err);
    }
  };

  return(
    <div>
      <input placeholder="Email.." onChange={(e)=> setEmail(e.target.value)}/>
      <input placeholder="Password.." type= "password" onChange={(e)=> setPassword(e.target.value)}/>
      <button onClick = {SignIn}>Sign In</button>
      <button onClick = {SignInWithGoogle}>Sign in with google</button>
      <button onClick = {logOut}>LogOut</button>
    </div>
  )

}