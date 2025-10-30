import { Service } from "src/components/serviceData/types";
import { Section } from "src/types/sections/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import configuration from "src/config/configuration.json";
import { OpenModalConfig, useModalStore } from "src/stores/useModalStore";
import { useTranslation } from "react-i18next";


export const useScroll = (): number => {
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
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

export const useAsyncFunction = <T>(
  asyncFunction: () => Promise<T>,
): [Service<T>, () => Promise<void>, () => void] => {
  const [service, setService] = useState<Service<T>>({ state: "IDLE" });
  const isMounted = useIsMounted();
  const clearService = useCallback(
    () => setService({ state: "IDLE" }),
    [],
  );
  const callService = useCallback(async () => {
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
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export const useConfiguration = (): {
  baseUrls: Omit<typeof configuration["baseUrls"], 'dev' | 'prod'> & { baseUrl: string };
  paths: typeof configuration["paths"];
} => {
  const {dev, prod, ...restBaseUrls} = configuration.baseUrls;
  const env = (process.env.NODE_ENV ?? 'production');
  const baseUrls = {...restBaseUrls, baseUrl: env === 'production' ? prod : dev};
  const paths = configuration.paths;
  return { baseUrls, paths };
}


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

export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(!!((navigator.maxTouchPoints || 'ontouchstart' in document.documentElement)));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsTouchDevice(event.matches);
    };

    setIsTouchDevice(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return isTouchDevice;
};


export const usePreloadModalContent = (): (modalConfig: OpenModalConfig) => void => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const openModal = useModalStore((state) => state.openModal);
  const setPreloading = useModalStore((state) => state.setPreloading);

  return useCallback(
    (modalConfig: OpenModalConfig) => {
      setPreloading(!isPreloaded);
      openModal(modalConfig);
      setIsPreloaded(true);
  }, [openModal, setPreloading, isPreloaded]);
}

export const useTranslatedSectionId = (
): (id: Section['id']) => string => {
  const { t } = useTranslation("sections");
  const translatedSections = useMemo(
    () => ({
      home: t('home'),
      contact: t('contact'),
      skills: t('skills'),
      about: t('about'),
    }),
    [t]
  );

  return (id: Section['id']) => translatedSections[id];
}
