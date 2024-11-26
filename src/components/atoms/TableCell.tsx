import { useEffect, useState } from "react";
import Select from "~/components/atoms/Select";
import { api } from "~/utils/api";

export const TableCell = ({ getValue, row, column, table }: any): any => {
  const initialValue: any = getValue();
  const tableMeta = table?.options?.meta;
  const [searchVal, setSearchVal] = useState("");

  const {
    data: productLocations,
    isLoading,
    isFetching,
  } = api.products.productLocationForDropdown.useQuery({
    search: searchVal,
  });

  const [value, setValue] = useState({
    id: initialValue,
    value: initialValue,
    label: initialValue,
  });

  const [options, setOptions] = useState<any>([]);

  const movingStatus = ["SLOW", "MEDIUM", "FAST", "NONMOVING"];

  useEffect(() => {
    if (column.id === "movingStatus") {
      const tempOptions = movingStatus.map((movStatus: string) => ({
        id: movStatus,
        value: movStatus,
        label: movStatus,
      }));
      setOptions(tempOptions);
    }
  }, []);

  useEffect(() => {
    if (column.id === "ProductLocation_location") {
      const tempOptions = productLocations?.map((productLocation: any) => ({
        id: productLocation.id,
        value: productLocation.id,
        label: productLocation.location,
        ...productLocation,
      }));
      setOptions(tempOptions);
    }
  }, [productLocations]);

  useEffect(() => {
    setValue({
      id: row.original.ProductLocation?.id,
      value: row.original.ProductLocation?.isFilled,
      label: initialValue,
    });
  }, [initialValue, row.original.id]);

  return (
    <div className="w-[135px]">
      {tableMeta?.editedRows[row.id] ? (
        <Select
          value={value}
          isLoading={
            column.id === "ProductLocation_location" &&
            (isLoading || isFetching)
          }
          onChange={(value: any) => {
            setValue(value);
            tableMeta?.updateData(
              row.index,
              column.id,
              column.id === "ProductLocation_location" ? value : value.value
            );
          }}
          onInputChange={(newValue: any) => setSearchVal(newValue)}
          options={options}
        />
      ) : (
        <>
          {column.id === "ProductLocation_location" && (
            <div className="line-clamp-1 w-[400px] text-left">
              {value?.label}
            </div>
          )}
          {column.id === "movingStatus" && (
            <div className="text-center">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  value?.label === "MEDIUM"
                    ? "bg-yellow-100 text-yellow-800"
                    : value?.label === "FAST"
                    ? "bg-green-100 text-green-800"
                    : value?.label === "SLOW"
                    ? "bg-red-100 text-red-800"
                    : "bg-slate-300 text-slate-800"
                }`}
              >
                {value?.label}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TableCell;
