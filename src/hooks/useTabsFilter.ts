import { useMemo, useRef, useState } from "react";

export function useTabsFilter<T>(
  data: T,
  filterFunction: (data: T, value: string) => T
) {
  const [tabsValue, setTabsValue] = useState<string>("all");
  const cache = useRef<{ [key: string]: T }>({});

  const filteredData = useMemo(() => {
    if (!cache.current[tabsValue]) {
      cache.current[tabsValue] = filterFunction(data, tabsValue);
    }
    return cache.current[tabsValue];
  }, [tabsValue, data, filterFunction]);

  return { filteredData, tabsValue, setTabsValue };
}
