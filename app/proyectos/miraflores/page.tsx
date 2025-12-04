import ProjectTemplate from "@/components/templates/ProjectTemplate";

export default function MirafloresPage() {
    return (
        <ProjectTemplate
            title="Casa Miraflores"
            location="Miraflores, Lima"
            year="2024"
            description="Una reforma integral de azotea frente al mar. El objetivo fue maximizar las vistas panorámicas manteniendo la privacidad. Se utilizó una paleta de colores neutros y materiales naturales como madera y piedra para conectar con el entorno costero."
            mainImage="https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1920&auto=format&fit=crop"
            gallery={[
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop"
            ]}
        />
    );
}
