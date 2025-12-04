import ServiceTemplate from "@/components/templates/ServiceTemplate";

export default function TechoSolSombraPage() {
    return (
        <ServiceTemplate
            title="Techo Sol y Sombra"
            subtitle="Exteriores"
            description="Creamos estructuras que equilibran luz y protección, permitiéndote disfrutar de tu terraza en cualquier momento del día. Diseños personalizados que se integran con la arquitectura de tu hogar."
            image="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop"
            features={[
                "Madera Huayruro selecta",
                "Policarbonato alveolar de alta resistencia",
                "Acabado con barniz marino UV",
                "Diseño bioclimático",
                "Iluminación LED integrada",
                "Garantía estructural de 5 años"
            ]}
        />
    );
}
