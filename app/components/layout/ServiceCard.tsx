import Image from "next/image";

export function ServiceCard({
    service,
}: {
    service: { name: string; icon: string; description: string; points: string[] };
}) {
    return (
        <article className="flex h-full flex-col rounded-2xl border border-white/15 bg-neutral-950/80 p-5 text-left transition duration-200 hover:border-yellow-400/80 dark:border-black/10 dark:bg-white dark:hover:border-neutral-900">
            <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 dark:bg-neutral-900">
                    <Image
                        src={`/icons/${service.icon}`}
                        alt=""
                        width={32}
                        height={32}
                        className="h-7 w-7 object-contain dark:invert"
                        unoptimized
                    />
                </div>
                <h3 className="text-lg font-semibold leading-tight text-white dark:text-neutral-900">
                    {service.name}
                </h3>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-300 dark:text-neutral-600">
                {service.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-gray-100 dark:border-black/10 dark:text-neutral-800">
                {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                        <span
                            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 dark:bg-neutral-900"
                            aria-hidden
                        />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
