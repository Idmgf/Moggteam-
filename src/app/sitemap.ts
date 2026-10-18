import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_APP_URL ?? "https://YOUR-DOMAIN.kz"; return ["/","/register","/login","/rewards","/rules","/privacy"].map((path)=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:"weekly",priority:path==="/"?1:.6})); }
