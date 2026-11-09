import { IconCard } from "../action/IconCard";
import Image from "next/image";
import { Translations } from "../../context/LanguageContext";
import { useLanguage } from "../../context/LanguageContext";

const icons = [
    { key: "service", file: "Service.svg" },
    { key: "brake", file: "Brake.svg" },
    { key: "battery", file: "Battery.svg" },
    { key: "electric", file: "Electric.svg" },
    { key: "gearbox", file: "Gearbox.svg" },
    { key: "repairs", file: "Repairs.svg" },
];

const orbit = [
    { key: "service", file: "Service.svg", place: "left-[2%] top-[10%]", caption: "below", card: "left-0 top-0 origin-top-left" },
    { key: "brake", file: "Brake.svg", place: "left-[36%] top-0", caption: "below", card: "left-0 top-0 origin-top-left" },
    { key: "battery", file: "Battery.svg", place: "right-[2%] top-[12%]", caption: "below", card: "right-0 top-0 origin-top-right" },
    { key: "electric", file: "Electric.svg", place: "bottom-[18%] left-[2%]", caption: "above", card: "bottom-0 left-0 origin-bottom-left" },
    { key: "gearbox", file: "Gearbox.svg", place: "bottom-0 left-[32%]", caption: "above", card: "bottom-0 left-0 origin-bottom-left" },
    { key: "repairs", file: "Repairs.svg", place: "bottom-[16%] right-[2%]", caption: "above", card: "bottom-0 right-0 origin-bottom-right" },
] as const;

export default function IconCards({
    onOpenServices,
    layout = "row",
}: {
    onOpenServices?: () => void;
    layout?: "row" | "orbit";
}) {
    const { t } = useLanguage();

    if (layout === "orbit") {
        return (
            <div className="absolute inset-0">
                {orbit.map((icon) => {
                    const name = t(`icons.${icon.key}.name` as keyof Translations);
                    const description = t(`icons.${icon.key}.description` as keyof Translations);
                    const points = [1, 2, 3].map((n) =>
                        t(`icons.${icon.key}.point${n}` as keyof Translations)
                    );

                    return (
                        <button
                            key={icon.key}
                            type="button"
                            onClick={onOpenServices}
                            className={`orbit-node group absolute text-left ${icon.place}`}
                        >
                            <span className="orbit-dot">
                                <Image
                                    src={`/icons/${icon.file}`}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="h-6 w-6 object-contain"
                                    unoptimized
                                />
                            </span>
                            <span className={`orbit-card p-3 ${icon.card}`}>
                                <span className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-400">
                                        <Image
                                            src={`/icons/${icon.file}`}
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="h-6 w-6 object-contain"
                                            unoptimized
                                        />
                                    </span>
                                    <span className="text-base font-semibold leading-tight">{name}</span>
                                </span>
                                <span className="mt-3 block text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                    {description}
                                </span>
                                <span className="mt-3 block space-y-2 border-t border-black/10 pt-3 text-sm text-neutral-800 dark:border-white/10 dark:text-neutral-100">
                                    {points.map((point) => (
                                        <span key={point} className="flex gap-2.5">
                                            <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400" aria-hidden />
                                            <span>{point}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <span
                                className={`orbit-caption pointer-events-none absolute left-1/2 w-24 -translate-x-1/2 text-center text-[11px] leading-tight text-neutral-600 dark:text-neutral-300 ${
                                    icon.caption === "above" ? "bottom-full mb-1.5" : "top-full mt-1.5"
                                }`}
                            >
                                {name}
                            </span>
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-between gap-2 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-center sm:gap-4 [&::-webkit-scrollbar]:hidden">
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
