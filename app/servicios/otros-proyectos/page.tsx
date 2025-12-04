import ServiceTemplate from "@/components/templates/ServiceTemplate";

export default function OtrosProyectosPage() {
    return (
        <ServiceTemplate
            title="Proyectos Especiales"
            subtitle="A Medida"
            description="¿Tienes una idea única? Nosotros la hacemos realidad. Desde piscinas y jacuzzis hasta jardines verticales y remodelaciones interiores completas."
            image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
            features={[
                "Piscinas y Jacuzzis",
                "Jardines Verticales",
                "Remodelación de Interiores",
                "Mobiliario a medida",
                "Domótica y Automatización",
                "Consultoría de Diseño"
            ]}
        />
    );
}
