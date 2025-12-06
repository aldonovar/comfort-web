"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactoFull() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        interest: "Proyecto Integral",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for actual submission logic
        console.log("Form Submitted", formData);
        alert("Gracias. Nos pondremos en contacto pronto.");
    };

    return (
        <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 bg-primary text-primary overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracota/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                {/* Left Column: Info */}
                <div className="flex flex-col justify-center h-full">
                    <span className="text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">Concierge</span>
                    <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
                        Inicia tu <br />
                        <span className="text-terracota italic">transformación.</span>
                    </h1>
                    <p className="text-lg text-primary/70 leading-relaxed mb-12 max-w-md">
                        Cada proyecto comienza con una conversación. Cuéntanos tu visión y nosotros diseñaremos el camino para hacerla realidad.
                    </p>

                    <div className="space-y-8">
                        <div>
                            <h3 className="font-serif text-xl mb-2">Visítanos</h3>
                            <p className="text-sm text-primary/60 leading-relaxed">
                                Av. La Mar 1234, Oficina 501 <br />
                                Miraflores, Lima - Perú
                            </p>
                        </div>

                        <div>
                            <h3 className="font-serif text-xl mb-2">Contacto Directo</h3>
                            <div className="flex flex-col gap-2 text-sm text-primary/60">
                                <a href="mailto:contacto@comfortstudioperu.com" className="hover:text-terracota transition-colors">contacto@comfortstudioperu.com</a>
                                <a href="tel:+51936230958" className="hover:text-terracota transition-colors">+51 936 230 958</a>
                            </div>
                        </div>

                        <div className="pt-8">
                            <a
                                href="https://wa.me/51936230958"
                                target="_blank"
                                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-terracota hover:text-primary transition-colors"
                            >
                                <span>Chatear en WhatsApp</span>
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-white/5 dark:bg-white/5 border border-primary/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-primary/60">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-transparent border-b border-primary/20 py-3 text-primary focus:border-terracota outline-none transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-primary/60">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full bg-transparent border-b border-primary/20 py-3 text-primary focus:border-terracota outline-none transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-primary/60">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-transparent border-b border-primary/20 py-3 text-primary focus:border-terracota outline-none transition-colors"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-primary/60">Interés</label>
                            <select
                                name="interest"
                                className="w-full bg-transparent border-b border-primary/20 py-3 text-primary focus:border-terracota outline-none transition-colors appearance-none"
                                onChange={handleChange}
                            >
                                <option value="Proyecto Integral">Proyecto Integral de Terraza</option>
                                <option value="Techo Sol y Sombra">Techo Sol y Sombra</option>
                                <option value="Estación de Parrilla">Estación de Parrilla</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-primary/60">Mensaje</label>
                            <textarea
                                name="message"
                                rows={4}
                                className="w-full bg-transparent border-b border-primary/20 py-3 text-primary focus:border-terracota outline-none transition-colors resize-none"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-terracota text-white py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white transition-colors duration-300"
                            >
                                Enviar Solicitud
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </section>
    );
}
