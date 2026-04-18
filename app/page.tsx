import { redirect } from "next/navigation";

// La raíz redirige al dashboard.
// Si el usuario no está autenticado, el middleware lo manda a /sign-in.
export default function Home() {
  redirect("/dashboard");
}
