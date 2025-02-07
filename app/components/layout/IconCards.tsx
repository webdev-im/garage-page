import { IconCard } from "../action/IconCard";
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";

export default function IconCards() {
  const { t } = useLanguage(); // ✅ Get translations

  const icons = [
    { key: "battery", file: "Battery.svg" },
    { key: "brake", file: "Brake.svg" },
    { key: "dashboard", file: "Dashboard.svg" },
    { key: "electric", file: "Electric.svg" },
    { key: "filter", file: "Filter.svg" },
    { key: "fuel", file: "Fuel.svg" },
    { key: "gearbox", file: "Gearbox.svg" },
    { key: "ignition", file: "Ignition.svg" },
    { key: "repairs", file: "Repairs.svg" },
    { key: "rotor", file: "Rotor.svg" },
    { key: "service", file: "Service.svg" },
    { key: "steering_wheel", file: "Steering wheel.svg" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {icons.map((icon, index) => (
        <IconCard
          key={index}
          icon={{
            name: t(`icons.${icon.key}.name` as keyof Translations), // ✅ Type assertion
            file: icon.file,
            description: t(`icons.${icon.key}.description` as keyof Translations), // ✅ Type assertion
          }}
        />


      ))}
    </div>
  );
}
