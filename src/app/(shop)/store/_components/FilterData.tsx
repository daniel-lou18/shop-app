import { ReactNode } from "react";

async function FilterData({
  children,
  fetchData,
}: {
  children: ReactNode;
  fetchData: () => void;
}) {
  const data = await fetchData();
  return <div>FilterData</div>;
}

export default FilterData;
