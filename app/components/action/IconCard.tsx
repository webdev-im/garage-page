import Image from "next/image";

export function IconCard({
    icon,
    onOpenServices,
}: {
    icon: { name: string; file: string };
    onOpenServices?: () => void;
}) {
    return (
        <button
            type="button"
            title={icon.name}
            aria-label={icon.name}
            onClick={onOpenServices}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition hover:bg-white/15 dark:hover:bg-black/10"
        >
            <Image
                src={`/icons/${icon.file}`}
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 object-contain invert dark:invert-0"
                unoptimized
            />
        </button>
    );
}
