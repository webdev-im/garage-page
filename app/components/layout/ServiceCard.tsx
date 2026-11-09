import Image from "next/image";

export function ServiceCard({
    service,
}: {
    service: { name: string; icon: string; description: string; points: string[] };
}) {
    return (
        <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 text-left text-neutral-900 transition duration-200 hover:border-yellow-500/70 dark:border-white/10 dark:bg-neutral-900 dark:text-white dark:hover:border-yellow-400/70">
            <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400">
                    <Image
                        src={`/icons/${service.icon}`}
                        alt=""
                        width={32}
                        height={32}
                        className="h-7 w-7 object-contain"
                        unoptimized
                    />
                </div>
                <h3 className="text-lg font-semibold leading-tight">
                    {service.name}
                </h3>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                {service.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-black/10 pt-4 text-sm text-neutral-800 dark:border-white/10 dark:text-neutral-100">
                {service.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                        <span
                            className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400"
                            aria-hidden
                        />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}
