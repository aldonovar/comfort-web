// app/contacto/page.js

import Contacto from "../../components/sections/Contacto";

export default function ContactoPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* El componente Contacto ahora maneja todo el diseño y el header */}
      <Contacto />
    </main>
  );
}
