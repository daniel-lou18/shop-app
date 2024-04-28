import { FunctionComponentElement, ReactNode, cloneElement } from "react";

async function FilterData({
  children,
  fetchData,
}: {
  children: FunctionComponentElement<ReactNode>;
  fetchData: () => Promise<void>;
}) {
  const data = await fetchData();
  return <>{cloneElement(children, data)}</>;
}

export default FilterData;
