"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "./TranslationProvider";

export function T({ children }: { children: string }) {
  const { language, translate } = useTranslation();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    if (language === "en") {
      setTranslated(children);
      return;
    }

    let cancelled = false;
    translate(children).then((result) => {
      if (!cancelled) setTranslated(result);
    });

    return () => {
      cancelled = true;
    };
  }, [children, language, translate]);

  return <>{translated}</>;
}
