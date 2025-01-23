import { Loader, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import DataTableNew from "../data-table-new";
import { ColumnDef } from "@tanstack/react-table";
import { isUndefined } from "lodash";

type TableWithSearchProps<TData, TValue> = {
  searchPlaceholder: string,
  onSearchQueryChange?: (query: string) => void
  searchQuery?: string
  isLoading: boolean,
  createUrl?: string,
  createLabel?: string
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}

const TableWithSearch =<TData, TValue> ({
  searchPlaceholder,
  onSearchQueryChange,
  searchQuery,
  isLoading,
  createLabel,
  createUrl,
  columns,
  data
}: TableWithSearchProps<TData, TValue>) => (
  <div className="flex flex-1 flex-col items-stretch gap-4">
          <div className='flex flex-row items-center gap-4 justify-between'>
            <div className="flex flex-row items-center gap-4">
              {!isUndefined(searchQuery) && onSearchQueryChange && <Input
                type="search"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                value={searchQuery}
                className="max-w-sm"
              />}
              {isLoading && <Loader className='animate-spin' />}
            </div>

            {createUrl && createLabel && <Button asChild>
              <Link to={createUrl}>
                {createLabel}
                <Plus />
              </Link>
            </Button>}
          </div>
          <DataTableNew
            data={data || []}
            columns={columns}
          />
        </div>
)

export default TableWithSearch
