import { useEffect } from "react";
import { Section } from "src/common/types/sections/types";


export const useHeaderObserver = (
  data: HTMLElement[], setTitleId: React.Dispatch<React.SetStateAction<"home" | "about" | "skills" | "contact">>
): void => {
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    let maxEntry: IntersectionObserverEntry | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!maxEntry || entry.intersectionRatio > maxEntry.intersectionRatio) {
              maxEntry = entry;
            } else if (maxEntry.target === entry.target) {
              maxEntry = entry;
            } else if (entries.find(e => e.target.id === maxEntry?.target.id && !e.isIntersecting)) {
              maxEntry = entry;
            }
          }
        });
        if (maxEntry) {
          setTitleId((prev) => {
            if (maxEntry && prev !== maxEntry.target.id) {
              return maxEntry.target.id as unknown as Section['id'];
            }
            return prev;
          }
          );
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );


    data.forEach((element) => observer.observe(element));

    return () => {
      // Unobserve all elements when the component unmounts
      data.forEach((element) => observer.unobserve(element));
      // Disconnect the observer when the component unmounts
      observer.disconnect();
    };
  }, [data, setTitleId]);
};