import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiujnf3-gDeYmeaVdSBiFPLk3FrK2MPow",
  authDomain: "chat-app-24ff5.firebaseapp.com",
  projectId: "chat-app-24ff5",
  storageBucket: "chat-app-24ff5.appspot.com",
  messagingSenderId: "387772116568",
  appId: "1:387772116568:web:dc370a7e3054fd7f43e42d",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
export default db;
