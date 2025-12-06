// app/contacto/page.js

import ContactoFull from "../../components/sections/ContactoFull";

export default function ContactoPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* El componente Contacto ahora maneja todo el diseño y el header */}
      <ContactoFull />
    </main>
  );
}
