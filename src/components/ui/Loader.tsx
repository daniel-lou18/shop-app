import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="fixed z-40 inset-0 flex justify-center items-center w-full h-full">
      <Loader2 className="size-24 animate-spin" />
    </div>
  );
}

export default Loader;
