'use client';

import { ServiceCard } from "./ServiceCard"; // Reference to your ServiceCard component
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";

export default function ServiceCards() {
    const { t } = useLanguage(); // Access translations

    const icons = [
        { key: "battery", file: "Battery.svg" },
        { key: "brake", file: "Brake.svg" },
        { key: "dashboard", file: "Dashboard.svg" },
        { key: "filter", file: "Filter.svg" },
        { key: "fuel", file: "Fuel.svg" },
        { key: "gearbox", file: "Gearbox.svg" },
        { key: "ignition", file: "Ignition.svg" },
        { key: "repairs", file: "Repairs.svg" },
        { key: "rotor", file: "Rotor.svg" },
        { key: "electric", file: "Electric.svg" },
        { key: "steering_wheel", file: "Steering wheel.svg" },
        { key: "service", file: "Service.svg" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-screen-xl mx-auto">
            {icons.map((icon, index) => (
                <ServiceCard
                    key={index}
                    service={{
                        name: t(`icons.${icon.key}.name` as keyof Translations), // Get translation for name
                        icon: icon.file,
                        description: t(`icons.${icon.key}.description` as keyof Translations), // Get translation for description
                    }}
                />
            ))}
        </div>
    );
}
