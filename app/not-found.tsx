// app/not-found.js
import { redirect } from "next/navigation";

export default function NotFound() {
  // Cualquier ruta que no exista redirige al home
  redirect("/");
}
