import ServiceTemplate from "@/components/templates/ServiceTemplate";

export default function TerrazasPage() {
    return (
        <ServiceTemplate
            title="Diseño de Terrazas"
            subtitle="Arquitectura Exterior"
            description="Transformamos azoteas y patios en oasis privados. Desde la conceptualización hasta la ejecución, cuidamos cada detalle para crear un espacio de relax y entretenimiento único."
            image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
            features={[
                "Diseño 3D fotorrealista",
                "Optimización del espacio",
                "Selección de mobiliario y acabados",
                "Paisajismo integrado",
                "Gestión integral de obra",
                "Entrega llave en mano"
            ]}
        />
    );
}
