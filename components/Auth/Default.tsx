// "use client"
//
// import { useState } from "react";
// import {supabase} from "@/utils/supabase";
//
// const Auth = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//
//   const handleLogin = async () => {
//     try {
//       setIsLoading(true);
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       alert("Login successful!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   const handleSignUp = async () => {
//     try {
//       setIsLoading(true);
//       const { error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       if (error) throw error;
//       alert("Sign up successful!");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//
//   return (
//     <div>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin} disabled={isLoading}>
//         Login
//       </button>
//       <button onClick={handleSignUp} disabled={isLoading}>
//         Sign Up
//       </button>
//     </div>
//   );
// };
//
// export default Auth;