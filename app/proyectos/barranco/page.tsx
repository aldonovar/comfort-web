import ProjectTemplate from "@/components/templates/ProjectTemplate";

export default function BarrancoPage() {
    return (
        <ProjectTemplate
            title="Loft Barranco"
            location="Barranco, Lima"
            year="2023"
            description="Minimalismo cálido en un espacio histórico. Respetamos la arquitectura original de la casona barranquina, integrando elementos modernos y funcionales. La luz natural es la protagonista de este diseño."
            mainImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop"
            gallery={[
                "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1920&auto=format&fit=crop"
            ]}
        />
    );
}
