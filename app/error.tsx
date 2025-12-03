"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-madera text-crema p-6 text-center">
            <h2 className="font-serif text-4xl mb-4">Algo salió mal</h2>
            <p className="text-crema/70 mb-8 max-w-md">
                Ocurrió un error inesperado al cargar esta sección.
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-terracota text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-terracota transition-colors"
            >
                Intentar de nuevo
            </button>
        </div>
    );
}
