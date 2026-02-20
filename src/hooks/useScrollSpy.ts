import { useState, useEffect } from "react";

export function useScrollSpy(ids: string[], offset = 80): string {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return activeId;
}
