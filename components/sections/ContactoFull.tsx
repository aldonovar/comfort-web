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
        <section className="relative h-screen min-h-[800px] flex items-center bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-terracota/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[var(--text-primary)]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Left Column: Header + Info (Compact) */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-10">

                        {/* Header */}
                        <div>
                            <span className="block text-terracota text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Contacto</span>
                            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight mb-6">
                                Hablemos de <br />
                                <span className="text-terracota italic opacity-90">vuestra visión.</span>
                            </h1>
                            <p className="text-sm md:text-base text-[var(--text-primary)]/70 leading-relaxed font-light max-w-md">
                                Cada gran proyecto comienza con un simple "hola". Estamos listos para escuchar.
                            </p>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-8 border-t border-[var(--text-primary)]/10 pt-8">

                            {/* Direct */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-50">Directo</h3>
                                <div className="flex flex-col gap-1 text-sm font-medium">
                                    <a href="mailto:contacto@comfortstudioperu.com" className="hover:text-terracota transition-colors">contacto@comfortstudioperu.com</a>
                                    <a href="tel:+51936230958" className="hover:text-terracota transition-colors">+51 936 230 958</a>
                                    <a
                                        href="https://wa.me/51936230958"
                                        target="_blank"
                                        className="text-terracota hover:underline decoration-terracota underline-offset-4 mt-1 inline-block"
                                    >
                                        WhatsApp Corporativo →
                                    </a>
                                </div>
                            </div>

                            {/* Reunion */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-50">Reunión</h3>
                                <a
                                    href="https://calendly.com/comfortstudioperu/30min"
                                    target="_blank"
                                    className="group inline-flex items-center gap-3 px-4 py-3 bg-[var(--text-primary)]/5 hover:bg-terracota/10 border border-[var(--text-primary)]/10 hover:border-terracota/30 rounded-lg transition-all duration-300"
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-xs font-bold uppercase tracking-wider group-hover:text-terracota">Agendar Cita</span>
                                </a>
                            </div>



                            {/* Social */}
                            <div className="space-y-2">
                                <h3 className="text-[10px] uppercase tracking-widest font-bold opacity-50">Social</h3>
                                <div className="flex gap-4 text-xs font-medium">
                                    <a href="https://www.instagram.com/comfortstudiop/" target="_blank" className="hover:text-terracota transition-colors">Instagram</a>
                                    <a href="https://www.facebook.com/comfortstudioperu" target="_blank" className="hover:text-terracota transition-colors">Facebook</a>
                                    <a href="https://www.tiktok.com/@comfortstudio7" target="_blank" className="hover:text-terracota transition-colors">TikTok</a>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Compact Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)]/50 p-8 md:p-12 rounded-[2rem] border border-[var(--text-primary)]/5 backdrop-blur-sm">

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="group space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 group-focus-within:text-terracota group-focus-within:opacity-100 transition-all">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-2 text-lg placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="group space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 group-focus-within:text-terracota group-focus-within:opacity-100 transition-all">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-2 text-lg placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="group space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 group-focus-within:text-terracota group-focus-within:opacity-100 transition-all">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-2 text-lg placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="group space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 group-focus-within:text-terracota group-focus-within:opacity-100 transition-all">Interés</label>
                                    <div className="relative">
                                        <select
                                            name="interest"
                                            className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-2 text-lg text-[var(--text-primary)] focus:border-terracota outline-none transition-colors appearance-none cursor-pointer"
                                            onChange={handleChange}
                                        >
                                            <option value="Proyecto Integral" className="bg-[var(--bg-primary)]">Proyecto Integral</option>
                                            <option value="Techo Sol y Sombra" className="bg-[var(--bg-primary)]">Techo Sol y Sombra</option>
                                            <option value="Estación de Parrilla" className="bg-[var(--bg-primary)]">Parrilla / BBQ</option>
                                            <option value="Otro" className="bg-[var(--bg-primary)]">Otro</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="group space-y-1 mb-10">
                                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50 group-focus-within:text-terracota group-focus-within:opacity-100 transition-all">Detalles</label>
                                <textarea
                                    name="message"
                                    rows={2}
                                    className="w-full bg-transparent border-b border-[var(--text-primary)]/20 py-2 text-lg placeholder:text-[var(--text-primary)]/20 focus:border-terracota outline-none transition-colors resize-none"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-4 text-base font-serif italic text-[var(--text-primary)] hover:text-terracota transition-colors duration-300"
                                >
                                    <span className="w-12 h-12 rounded-full border border-[var(--text-primary)]/20 group-hover:border-terracota flex items-center justify-center transition-colors">
                                        <span className="text-lg">→</span>
                                    </span>
                                    <span>Enviar Mensaje</span>
                                </button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
