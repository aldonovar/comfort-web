"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="es">
            <body className="bg-madera text-crema flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center gap-6 p-12 text-center">
                    <h1 className="font-serif text-5xl">Error Crítico</h1>
                    <p className="text-crema/70 max-w-lg">
                        Ha ocurrido un error en la estructura principal del sitio.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="px-8 py-4 bg-terracota text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-terracota transition-colors"
                    >
                        Reiniciar Aplicación
                    </button>
                </div>
            </body>
        </html>
    );
}
