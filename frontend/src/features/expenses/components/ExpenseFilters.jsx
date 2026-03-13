import React from "react";

import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EXPENSE_DEPARTMENTS } from "@/features/expenses/services/expenses";

const ExpenseFilters = ({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <Input
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search expenses (name, vendor, notes, department)"
          disabled={disabled}
        />
      </div>

      <div className="w-full overflow-x-auto">
        <ToggleGroup
          type="single"
          variant="outline"
          spacing={0}
          value={department}
          onValueChange={(value) => {
            if (!value) {
              onDepartmentChange?.("all");
              return;
            }
            onDepartmentChange?.(value);
          }}
          disabled={disabled}
          className="w-max"
        >
          <ToggleGroupItem value="all" aria-label="All departments">
            All
          </ToggleGroupItem>
          {EXPENSE_DEPARTMENTS.map((item) => (
            <ToggleGroupItem key={item} value={item} aria-label={`${item} department`}>
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};

export default ExpenseFilters;
