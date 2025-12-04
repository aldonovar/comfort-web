import ProjectTemplate from "@/components/templates/ProjectTemplate";

export default function SanIsidroPage() {
    return (
        <ProjectTemplate
            title="Oficinas San Isidro"
            location="San Isidro, Lima"
            year="2024"
            description="Terraza ejecutiva de alto tránsito. Un espacio diseñado para la desconexión y el networking corporativo. Materiales de alta durabilidad y bajo mantenimiento, con un diseño sobrio y elegante."
            mainImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
            gallery={[
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1920&auto=format&fit=crop"
            ]}
        />
    );
}
