"use client";
import React, { useRef, type ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { api } from "~/utils/api";
import Button from "~/components/atoms/Button";

type Props = {
  products: [];
  isLoading: boolean;
};

function ProductImportExport({ products, isLoading }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const utils: any = api.useContext();

  const exportProductsExcel = (products: any[]) => {
    const data = products.map((product) => {
      const { ProductLocation, ...rest } = product;

      return {
        ...rest,
        location: ProductLocation?.location,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "Products.xlsx");
  };

  const updateLocations =
    api.products.updateManyProductLocationsStatusByName.useMutation({
      onMutate: () => {
        utils.allUpdate.updateAll.cancel();
        const optimisticUpdate = utils.allUpdate.updateAll.getData();

        if (!optimisticUpdate) {
          utils.allUpdate.updateAll.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.products.allProductsWithLocation.invalidate();
      },
    });

  const importProductsFromExcel = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        const wb: any = XLSX.read(readerEvent?.target?.result);
        const sheets = wb.SheetNames;

        if (sheets) {
          const rows: any[] = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]]);

          if (rows) {
            const products: { id: number; location: string; movingStatus: "SLOW" | "MEDIUM" | "FAST" | "NONMOVING" }[] = rows.map(
              (row: { id: any; location: any; movingStatus: any }) => {
                return {
                  id: row.id,
                  location: row.location || "",
                  movingStatus: row.movingStatus || ""
                };
              }
            );

            updateLocations.mutate({ products });
          }
        }
      };

      reader.readAsArrayBuffer(file);
    }

    // Reset file input
    event.target.value = "";
  };

  const handleImportProductsClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        isDisabled={isLoading}
        onClick={() => exportProductsExcel(products)}
        className="px-4 py-2"
      >
        Export Products
      </Button>
      <input
        className="h-0 w-0"
        style={{ visibility: "hidden" }}
        ref={inputRef}
        type="file"
        onChange={importProductsFromExcel}
      />
      <Button
        isDisabled={isLoading}
        onClick={handleImportProductsClick}
        className="px-4 py-2"
      >
        Import Products
      </Button>
    </div>
  );
}

export default ProductImportExport;
