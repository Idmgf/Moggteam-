"use client";

import { usePathname } from "next/navigation";

export default function Loading() {
	const pathname = usePathname();
	if (pathname === "/") return <div className="home-loading" aria-hidden="true" />;
	return <div className="page"><div className="shell"><div className="empty">…</div></div></div>;
}
