import React from "react";
import { SectionRefs, Service } from "./types";
import { Section } from "../App";

export const useRefs = (sections: Section[]): SectionRefs => {
  const refs = sections.reduce((acc, section) => {
    acc[section.id] = React.createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);
  return refs;
};

export const useScroll = () => {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      let progress = (currentScroll / totalScroll) * 100;
      progress = Math.min(100, Math.max(0, progress));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollProgress;
};

export const useInterSectionObserver = (data: Element[]) => {
  React.useEffect(() => {
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

export const useAcyncFunction = <T>(
  asyncFunction: () => Promise<T>,
): [Service<T>, () => Promise<void>, () => void] => {
  const [service, setService] = React.useState<Service<T>>({ state: "IDLE" });
  const isMounted = useIsMounted();
  const clearService = React.useCallback(
    () => setService({ state: "IDLE" }),
    [],
  );
  const callService = React.useCallback(async () => {
    setService({ state: "LOADING" });
    try {
      const data = await asyncFunction();
      if (isMounted.current) {
        setService({ state: "SUCCESS", data });
      }
    } catch (error) {
      if (isMounted.current) {
        setService({
          state: "FAILURE",
          error: error instanceof Error ? error : new Error(),
        });
      }
    }
  }, [asyncFunction, isMounted]);
  return [service, callService, clearService];
};

const useIsMounted = () => {
  const isMounted = React.useRef(true);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

const getBaseUrl = () => "/data";

export const useFetchData = <T>(path: string) => {
  const baseUrl = getBaseUrl();
  const fetchData = React.useCallback(async () => {
    const response = await fetch(`${baseUrl}/${path}`);
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Failed to fetch data from path: ${path}`);
  }, [path, baseUrl]);
  const [service, callService] = useAcyncFunction<T>(fetchData);

  React.useEffect(() => {
    callService();
  }, [callService]);

  return React.useMemo(() => service, [service]);
};

export const useHeaderObserver = (data: HTMLElement[], setTitleId: React.Dispatch<React.SetStateAction<"home" | "about" | "skills" | "contact">>) => {
  React.useEffect(() => {
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
