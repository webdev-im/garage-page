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
            onClick={onOpenServices}
            className="flex w-20 shrink-0 flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-neutral-700 transition hover:bg-black/5 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/10 dark:hover:text-white"
        >
            <Image
                src={`/icons/${icon.file}`}
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 object-contain dark:invert"
                unoptimized
            />
            <span className="w-full truncate text-center text-[11px] leading-tight">{icon.name}</span>
        </button>
    );
}
