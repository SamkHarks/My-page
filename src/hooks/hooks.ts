import { SectionRefs, Service } from "src/hooks/types";
import { Section } from "src/components/app/types";
import { createRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createUrl, handleNetworkError } from "src/utils/utils";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";
import configuration from "src/config/configuration.json";
import { useNotificationStore } from "src/stores/useNotificationStore";
import { OpenModalConfig, useModalStore } from "src/stores/useModalStore";

export const useRefs = (sections: Section[]): SectionRefs => {
  const refs = sections.reduce((acc, section) => {
    acc[section.id] = createRef<HTMLDivElement>();
    return acc;
  }, {} as SectionRefs);
  return refs;
};

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

type RequestOptions = {
  method: 'GET' | 'POST' | 'HEAD';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

type ServiceOptions<T> = {
  immediate?: boolean; // Whether to call the service immediately
  transformResponse?: (response: Response) => Promise<T>; // Transform the response
};

type UrlOptions = {
  baseUrl?: string
  path: string;
  //queryParams?: Record<string, string>; Add later if needed
}

const getRequestOptions = (requestOptions: RequestOptions = { method: 'GET' }): RequestInit => {
  const { body, method, ...rest } = requestOptions;
  const defaultHeaders =  method !== 'HEAD' ? { 'Content-Type': 'application/json' } : undefined;
  const headers = {
    ...defaultHeaders,
    ...rest.headers,
  };

  return {
    method,
    headers,
    ...(body && method === 'POST' && { body: JSON.stringify(body) }),
  };
};

type ServiceParams<T> = {
  urlOptions: UrlOptions;
  requestOptions?: RequestOptions;
  serviceOptions?: ServiceOptions<T>;
}

export const useService = <T>({
  urlOptions,
  requestOptions,
  serviceOptions
}: ServiceParams<T>): {
  service: Service<T>;
  callService: () => Promise<void>;
  clearService: () => void;
} => {
  const { baseUrl, path } = urlOptions;
  const { transformResponse, immediate = true } = serviceOptions ?? {};

  const asyncFunction = useCallback(async () => {
    const url = createUrl(path, baseUrl);
    const options: RequestInit = getRequestOptions(requestOptions);
    const response = await fetch(url, options);
    if (response.ok) {
      return transformResponse
        ? transformResponse(response)
        : response.json();
    }
    const errorArgs = handleNetworkError(response.status);
    throw new HandledError(errorArgs.key, errorArgs.args);
  }, [baseUrl, path, requestOptions, transformResponse]);

  const [service, callService, clearService] = useAsyncFunction<T>(asyncFunction);

  useEffect(() => {
    if (immediate) {
      callService();
    }
  }, [callService, immediate]);

  return useMemo(() => ({ service, callService, clearService }), [service, callService, clearService]);
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


export const usePreloadModalContent = (): {
  handlePress: (preloadFn: () => Promise<unknown>, modalConfig: OpenModalConfig) => Promise<void>;
  isLoading: boolean;
} => {
  const [isLoading, setLoading] = useState(false);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const openModal = useModalStore((state) => state.openModal);

  const handleOpenModal = useCallback(
    (modalConfig: OpenModalConfig) => {
      openModal(modalConfig);
    }
    , [openModal]);

  const handlePress = useCallback(
    async (preloadFn: () => Promise<unknown>, modalConfig: OpenModalConfig) => {
      if (isPreloaded) {
        handleOpenModal(modalConfig);
        return;
      }
      setLoading(true);
      preloadFn().then(() => {
        setIsPreloaded(true);
        setLoading(false);
        handleOpenModal(modalConfig);
      }).catch((_err) => {
        setLoading(false);
        addNotification('Failed to load content. Please try again', 'error');
      });
    },
    [handleOpenModal, isPreloaded, addNotification]
  );

  return {handlePress, isLoading};
}
