import { useEffect } from "react";

export const useInterSectionObserver = (data: Element[]): void => {
  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (target instanceof HTMLElement) {
            if (entry.isIntersecting) {
              // Observe items only once
              target.addEventListener(
                "transitionend",
                (event: TransitionEvent) => {
                  if (
                    event.propertyName === "opacity" ||
                    event.propertyName === "transform"
                  ) {
                    observer.unobserve(target);
                  }
                },
                { once: true },
              );
              target.classList.add("animate");
            }
          }
        });
      },
      {
        rootMargin: "-5px",
      },
    );
    // Observe each section element
    Object.values(data).forEach((item) => {
      observer.observe(item);
    });
    return () => {
      // Disconnect the observer when the component unmounts
      Object.values(data).forEach((item) => {
        observer.unobserve(item);
      });
      observer.disconnect();
    };
  }, [data]);
};