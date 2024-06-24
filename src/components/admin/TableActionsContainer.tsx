import { ReactNode } from "react";

type TableActionsContainerProps = {
  children?: ReactNode;
  portalContainerId: string;
};

async function TableActionsContainer({
  children,
  portalContainerId,
}: TableActionsContainerProps) {
  return (
    <>
      <div className="flex gap-4 flex-1 pb-4">
        <div
          className="flex items-center relative min-w-[300px] max-w-[500px] bg-white"
          id={portalContainerId}
        ></div>
        {children}
      </div>
    </>
  );
}

export default TableActionsContainer;
