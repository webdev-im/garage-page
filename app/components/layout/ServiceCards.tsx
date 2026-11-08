"use client";

import { ServiceCard } from "./ServiceCard";
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";

const services = [
    { key: "service", file: "Service.svg" },
    { key: "filter", file: "Filter.svg" },
    { key: "brake", file: "Brake.svg" },
    { key: "rotor", file: "Rotor.svg" },
    { key: "steering_wheel", file: "Steering wheel.svg" },
    { key: "battery", file: "Battery.svg" },
    { key: "electric", file: "Electric.svg" },
    { key: "dashboard", file: "Dashboard.svg" },
    { key: "ignition", file: "Ignition.svg" },
    { key: "fuel", file: "Fuel.svg" },
    { key: "gearbox", file: "Gearbox.svg" },
    { key: "repairs", file: "Repairs.svg" },
];

export default function ServiceCards() {
    const { t } = useLanguage();

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((icon) => (
                <ServiceCard
                    key={icon.key}
                    service={{
                        name: t(`icons.${icon.key}.name` as keyof Translations),
                        icon: icon.file,
                        description: t(`icons.${icon.key}.description` as keyof Translations),
                        points: [1, 2, 3].map((n) =>
                            t(`icons.${icon.key}.point${n}` as keyof Translations)
                        ),
                    }}
                />
            ))}
        </div>
    );
}
