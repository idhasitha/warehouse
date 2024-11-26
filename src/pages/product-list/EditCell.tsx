import { api } from "~/utils/api";

export const EditCell = ({ row, table }: any) => {
  const meta = table?.options?.meta;

  const utils: any = api.useContext();

  //for update areas
  const updateProductLocationAndStatus =
    api.products.updateProductLocationAndStatusById.useMutation({
      onMutate: () => {
        utils.allUpdate.updateAll.cancel();
        const optimisticUpdate = utils.allUpdate.updateAll.getData();

        if (!optimisticUpdate) {
          utils.allUpdate.updateAll.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.allUpdate.updateAll.invalidate();
      },
    });

  const setEditedRows = (e: any) => {
    const elName = e.currentTarget.name;
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, e.currentTarget.name === "cancel");
    }
  };

  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={setEditedRows} name="cancel">
        X
      </button>{" "}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setEditedRows(e);
          updateProductLocationAndStatus.mutate({
            productId: row.original?.id,
            locationId: row.original?.productLocationId,
            movingStatus: row.original?.movingStatus,
          });
        }}
        name="done"
      >
        ✔
      </button>
    </>
  ) : (
    <button onClick={setEditedRows} name="edit">
      ✐
    </button>
  );
};

export default EditCell;
