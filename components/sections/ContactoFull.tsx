"use client";

import { useState } from "react";
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
        console.log("Form Submitted", formData);
        alert("Gracias. Nos pondremos en contacto pronto.");
    };

    return (
        <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden">

            {/* Background Decor (Subtle & Organic) */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-terracota/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--text-primary)]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-[1400px] mx-auto relative z-10">

                {/* Header - Editorial Style */}
                <div className="mb-24 md:mb-32">
                    <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">Contacto</span>
                    <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight">
                        Hablemos de <br />
                        <span className="text-terracota italic opacity-80">vuestra visión.</span>
                    </h1>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Info (Minimalist sidebar) */}
                    <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                        <div>
                            <p className="text-lg text-[var(--text-primary)]/70 leading-relaxed font-light">
                                Estamos listos para escuchar. Cada gran proyecto comienza con un simple "hola".
                            </p>
                        </div>

                        <div className="space-y-8 border-t border-[var(--text-primary)]/10 pt-8">
                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">Estudio</h3>
                                <p className="text-sm leading-relaxed">
                                    Av. La Mar 1234, Of. 501 <br />
                                    Miraflores, Lima
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">Directo</h3>
                                <div className="flex flex-col gap-2 text-sm font-medium">
                                    <a href="mailto:contacto@comfortstudioperu.com" className="hover:text-terracota transition-colors">contacto@comfortstudioperu.com</a>
                                    <a href="tel:+51936230958" className="hover:text-terracota transition-colors">+51 936 230 958</a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs uppercase tracking-widest font-bold mb-4 opacity-50">Social</h3>
                                <div className="flex gap-4 text-sm">
                                    <a href="#" className="hover:text-terracota transition-colors underline decoration-transparent hover:decoration-terracota underline-offset-4">Instagram</a>
                                    <a href="#" className="hover:text-terracota transition-colors underline decoration-transparent hover:decoration-terracota underline-offset-4">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Open Form (No Container) */}
                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="space-y-12">

                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="group space-y-4">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-50 group-focus-within:opacity-100 group-focus-within:text-terracota transition-all">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Tu nombre completo"
                                        required
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-4 text-xl md:text-2xl placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="group space-y-4">
                                    <label className="text-xs uppercase tracking-widest font-bold opacity-50 group-focus-within:opacity-100 group-focus-within:text-terracota transition-all">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="+51..."
                                        required
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-4 text-xl md:text-2xl placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="group space-y-4">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-50 group-focus-within:opacity-100 group-focus-within:text-terracota transition-all">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-4 text-xl md:text-2xl placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="group space-y-4">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-50 group-focus-within:opacity-100 group-focus-within:text-terracota transition-all">Interés</label>
                                <div className="relative">
                                    <select
                                        name="interest"
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-4 text-xl md:text-2xl text-[var(--text-primary)] focus:border-terracota outline-none transition-colors appearance-none cursor-pointer"
                                        onChange={handleChange}
                                    >
                                        <option value="Proyecto Integral" className="bg-[var(--bg-primary)]">Proyecto Integral de Terraza</option>
                                        <option value="Techo Sol y Sombra" className="bg-[var(--bg-primary)]">Techo Sol y Sombra</option>
                                        <option value="Estación de Parrilla" className="bg-[var(--bg-primary)]">Estación de Parrilla</option>
                                        <option value="Otro" className="bg-[var(--bg-primary)]">Otro</option>
                                    </select>
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">↓</span>
                                </div>
                            </div>

                            <div className="group space-y-4">
                                <label className="text-xs uppercase tracking-widest font-bold opacity-50 group-focus-within:opacity-100 group-focus-within:text-terracota transition-all">Mensaje</label>
                                <textarea
                                    name="message"
                                    rows={2}
                                    placeholder="Cuéntanos brevemente sobre tu espacio..."
                                    className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-4 text-xl md:text-2xl placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors resize-none"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-4 text-lg font-serif italic text-[var(--text-primary)] hover:text-terracota transition-colors duration-300"
                                >
                                    <span className="w-16 h-16 rounded-full border border-[var(--text-primary)]/20 group-hover:border-terracota flex items-center justify-center transition-colors">
                                        <span className="text-xl">→</span>
                                    </span>
                                    <span>Enviar Solicitud</span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
