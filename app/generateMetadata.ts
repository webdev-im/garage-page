import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  "use server"; // ✅ Ensures this runs on the server

  const cookieStore = await cookies(); // ✅ Await cookies correctly
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en"; // ✅ Get locale dynamically

  console.log("📌 Metadata Locale:", locale); // Debugging - Check in server logs

  // ✅ Dynamically import translations based on locale
  const translations =
    locale === "lt"
      ? (await import("./locales/lt.json")).default
      : (await import("./locales/en.json")).default;

  return {
    title: translations.title || "Default Website Title",
    description: translations.description || "Default description",
    openGraph: {
      title: translations.title || "Default OG Title",
      description: translations.description || "Default OG Description",
      images: [{ url: "/default-og.jpg", alt: "Default Image Alt" }],
    },
  };
}
