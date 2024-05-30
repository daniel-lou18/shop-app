import { ReactNode } from "react";

type SidebarProps = {
  children: ReactNode;
};
function Sidebar({ children }: SidebarProps) {
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">{children}</nav>
  );
}

export default Sidebar;
