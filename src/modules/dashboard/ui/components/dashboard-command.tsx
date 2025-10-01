import { Dispatch, SetStateAction } from "react";
import { CommandItem, CommandList } from "cmdk";

import { CommandInput, CommandResponsiveDialog } from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
