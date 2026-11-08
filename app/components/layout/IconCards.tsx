import { IconCard } from "../action/IconCard";
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";

const icons = [
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

export default function IconCards({ onOpenServices }: { onOpenServices?: () => void }) {
    const { t } = useLanguage();

    return (
        <div className="flex w-full items-center gap-1 overflow-x-auto px-2 py-2 [scrollbar-width:none] lg:justify-center lg:overflow-visible lg:px-4 [&::-webkit-scrollbar]:hidden">
            {icons.map((icon) => (
                <IconCard
                    key={icon.key}
                    onOpenServices={onOpenServices}
                    icon={{
                        name: t(`icons.${icon.key}.name` as keyof Translations),
                        file: icon.file,
                    }}
                />
            ))}
        </div>
    );
}
