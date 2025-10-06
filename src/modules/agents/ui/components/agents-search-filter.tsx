import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsSearchFilters = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [search, setSearch] = useState(filters.search ?? "");

  const debouncedUpdate = useDebouncedCallback((value: string) => {
    setFilters({ search: value });
  }, 500);

  useEffect(() => {
    setSearch(filters.search ?? "");
  }, [filters.search]);

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[12.5rem] pl-7"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          debouncedUpdate(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            debouncedUpdate.cancel();
            setFilters({ search });
          }
        }}
      />
      <SearchIcon
        className="size-4 absolute left-2 top-1/2 -translate-y-1/2 
        text-muted-foreground"
      />
    </div>
  );
};
