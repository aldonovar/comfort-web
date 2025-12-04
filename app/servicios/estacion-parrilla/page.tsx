import ServiceTemplate from "@/components/templates/ServiceTemplate";

export default function ParrillaPage() {
    return (
        <ServiceTemplate
            title="Estación de Parrilla"
            subtitle="Gastronomía Social"
            description="El corazón de tus reuniones. Diseñamos estaciones de parrilla funcionales y estéticas, equipadas con lo mejor para que te conviertas en el anfitrión perfecto."
            image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop"
            features={[
                "Barras de granito o cuarzo",
                "Parrillas de acero inoxidable 304",
                "Sistema de extracción de humos",
                "Cajas chinas y hornos empotrados",
                "Espacios de almacenamiento optimizados",
                "Iluminación escénica"
            ]}
        />
    );
}
