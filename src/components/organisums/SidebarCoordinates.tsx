"use client";

import { cn } from "~/utils/lib/utils";
import Textfield from "../atoms/Textfield";
import Button from "../atoms/Button";
import { useRouter } from "next/router";
import { type SetStateAction, useEffect, useState } from "react";
import { useAppContext } from "~/utils/lib/context/app-context";
import { api } from "~/utils/api";
import Select from "../atoms/Select";
import { toast } from "react-toastify";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function SidebarCoordinates({ className }: SidebarProps) {
  const router = useRouter();

  const {
    area,
    selectedArea,
    setSelectedArea,
    selectedZones,
    setSelectedZones,
    selectedAisle,
    setSelectedAisle,
    saveButtonIsDisabled,
    setSaveButtonIsDisabled,
  } = useAppContext();

  const utils: any = api.useContext();
  const [areaName, setAreaName] = useState<string>("");
  const [areaWidth, setAreaWidth] = useState<number>(0);
  const [areaLength, setAreaLength] = useState<number>(0);

  const [zoneName, setZoneName] = useState<string>("");
  const [optionsZones, setOptionsZones] = useState<any[]>([]);
  const [selectedZone, setSelectedZone] = useState<any>();
  const [zoneWidth, setZoneWidth] = useState<number>(selectedArea.width);
  const [zoneLength, setZoneLength] = useState<number>(selectedArea.length);

  const [aisleName, setAisleName] = useState<string>("");
  const [noOfLevels, setNoOfLevels] = useState<number>(0);
  const [noOfRacks, setNoOfRacks] = useState<number>(0);
  const [noOfLengths, setNoOfLengths] = useState<number>(0);
  const [axis, setAxis] = useState<string>("x");

  const { data: sZones, refetch } = api.zones.getZonesByAreaId.useQuery({
    areaId: selectedArea.id,
  });

  const { data: sAisle, refetch: refetchAisle } =
    api.aisles.getAisleWithLocationsByAreaId.useQuery({
      areaId: selectedArea.id,
    });

  useEffect(() => {
    if (sZones) {
      setSelectedZones(sZones);
      setOptionsZones(
        sZones.map((zone: any) => ({
          id: zone.id,
          value: zone.id,
          label: zone.name,
          ...zone,
        }))
      );
    }
  }, [sZones, setSelectedZones]);

  useEffect(() => {
    if (sAisle) {
      setSelectedAisle(sAisle);
    }
  }, [sAisle, setSelectedAisle]);

  //for add areas
  const { mutate: addNewArea, isLoading: isLoadingAddNewArea } =
    api.areas.newArea.useMutation({
      onMutate: () => {
        utils.areas.allAreas.cancel();
        const optimisticUpdate = utils.areas.allAreas.getData();

        if (!optimisticUpdate) {
          utils.areas.allAreas.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.areas.allAreas.invalidate();
        toast.success("Floor added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        refetchAisle();
      },
    });

  //for add zones
  const { mutate: addNewZone, isLoading: isLoadingAddNewZone } =
    api.zones.newZone.useMutation({
      onMutate: () => {
        utils.zones.allZones.cancel();
        const optimisticUpdate = utils.zones.allZones.getData();

        if (!optimisticUpdate) {
          utils.zones.allZones.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.zones.allZones.invalidate();
        refetch();
        toast.success("Zone added Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
    });

  //for add new aisle
  const { mutate: addNewAisle, isLoading: isLoadingAddNewAisle } =
    api.aisles.newAisle.useMutation({
      onMutate: () => {
        utils.aisles.allAisles.cancel();
        const optimisticUpdate = utils.aisles.allAisles.getData();

        if (!optimisticUpdate) {
          utils.aisles.allAisles.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.aisles.allAisles.invalidate();
        refetchAisle();
      },
    });

  //for update areas
  const updateAll = api.allUpdate.updateAll.useMutation({
    onMutate: () => {
      utils.allUpdate.updateAll.cancel();
      const optimisticUpdate = utils.allUpdate.updateAll.getData();

      if (!optimisticUpdate) {
        utils.allUpdate.updateAll.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.allUpdate.updateAll.invalidate();
      setSaveButtonIsDisabled(true);
    },
  });

  // For deleting areas
  const { mutate: deleteArea, isLoading: isLoadingDeleteArea } =
    api.areas.deleteArea.useMutation({
      onMutate: () => {
        utils.areas.allAreas.cancel();
        const optimisticUpdate = utils.areas.allAreas.getData();

        if (!optimisticUpdate) {
          utils.areas.allAreas.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.areas.allAreas.invalidate();
        refetch();
        refetchAisle();
        toast.success("Floor deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        window.location.reload();
      },
    });

  // For deleting zones
  const { mutate: deleteZone, isLoading: isLoadingDeleteZone } =
    api.zones.deleteZone.useMutation({
      onMutate: () => {
        utils.zones.allZones.cancel();
        const optimisticUpdate = utils.zones.allZones.getData();

        if (!optimisticUpdate) {
          utils.zones.allZones.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.zones.allZones.invalidate();
        refetch();
        refetchAisle();
        toast.success("Zone deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
    });

  // For deleting aisles
  const { mutate: deleteAisle, isLoading: isLoadingDeleteAisle } =
    api.aisles.deleteAisle.useMutation({
      onMutate: () => {
        utils.zones.allZones.cancel();
        const optimisticUpdate = utils.zones.allZones.getData();

        if (!optimisticUpdate) {
          utils.zones.allZones.setData(optimisticUpdate);
        }
      },
      onSettled: () => {
        utils.zones.allAisles.invalidate();
        refetchAisle();
        toast.success("Aisle deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      },
    });

  const updateAreaZonesAisles = () => {
    updateAll.mutate({
      area: selectedArea,
      zones: [...selectedZones],
      aisles: [...selectedAisle],
    });
  };

  const addZone = () => {
    if (zoneLength > 0 && zoneWidth > 0) {
      if (
        hasEnoughArea({
          x: selectedArea.x + 1,
          y: selectedArea.y + 1,
          width: zoneWidth,
          length: zoneLength,
          name: zoneName,
          areaId: selectedArea.id,
        })
      ) {
        addNewZone({
          x: selectedArea.x + 1,
          y: selectedArea.y + 1,
          width: zoneWidth,
          length: zoneLength,
          name: zoneName,
          areaId: selectedArea.id,
        });
      } else {
        toast.error("Not enough area!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Zone Length and Width must be More than 0!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const findBestPosition = (newBox: any) => {
    return { x: 2, y: 2 };
  };

  const isOverlap = (box1: any, box2: any) => {
    return (
      box1.x < box2.x + box2.width &&
      box1.x + box1.width > box2.x &&
      box1.y < box2.y + box2.length &&
      box1.y + box1.length > box2.y
    );
  };

  const hasEnoughArea = (newBox: any) => {
    const totalArea = selectedZones.reduce(
      (acc: any, box: any) => acc + box.width * box.length,
      0
    );
    const proposedArea = totalArea + newBox.width * newBox.length;
    const maxArea = selectedArea.width * selectedArea.length;

    return proposedArea <= maxArea;
  };

  const generateArrayFromNumber = (number: number) => {
    const startLetter = "A";
    const resultArray = [];

    for (let i = 0; i < number; i++) {
      resultArray.push(
        `${aisleName}${String.fromCharCode(startLetter.charCodeAt(0) + i)}`
      );
    }

    return resultArray.toString();
  };

  const padWithLeadingZeros = (num: number, totalLength: number) => {
    return String(num).padStart(totalLength, "0");
  };

  const generateProdLocation = (
    levelNames: string,
    noOfRacks: number,
    noOfLevels: number,
    noOfLengths: number
  ) => {
    // levelname-rack-level-position and one bin has 2 combinations
    const locations = levelNames.split(",").map((levelName: string) => {
      return Array.from({ length: noOfRacks }, (_, index) => index + 1).map(
        (rack: number) => {
          return Array.from(
            { length: noOfLevels },
            (_, index) => index + 1
          ).map((level: number) => {
            return Array.from(
              { length: noOfLengths },
              (_, index) => index + 1
            ).map(() => {
              return Array.from({ length: 2 }, (_, index) => index + 1).map(
                (bin: number) => {
                  return `${levelName}-${padWithLeadingZeros(
                    rack,
                    2
                  )}-${padWithLeadingZeros(level, 2)}-${bin}`;
                }
              );
            });
          });
        }
      );
    });

    return locations.flat(Infinity);
  };

  return (
    <div
      className={cn(
        "flex h-[calc(100vh-56px)] flex-col justify-between border-r border-zinc-200 px-3 pb-4",
        className
      )}
    >
      <div className="space-y-4 overflow-auto py-4">
        <div className="py-2">
          <h2 className="mb-2 text-lg font-semibold tracking-tight text-gray-700">
            Configurations
          </h2>
          <div className="border-b px-1 py-2">
            <h3 className="mb-2 px-1 text-base font-semibold tracking-tight text-gray-700">
              FLOOR
            </h3>
            <div>
              {area.map((area: any, index: any) => (
                <div className="flex w-full pb-4" key={index}>
                  <input
                    id="default-radio-1"
                    type="radio"
                    checked={area.name === selectedArea.name}
                    onChange={() => {
                      setSelectedArea(selectedArea === area.name ? {} : area);
                      refetch();
                    }}
                    name="default-radio"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  />
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {area.name}{" "}
                    <span className="text-xs text-gray-500">
                      {Math.round(area.width)}m x {Math.round(area.length)}m
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-end gap-1">
              <Textfield
                onChange={(e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setAreaName(e.target.value);
                }}
                value={areaName}
                placeholder="Area is..."
              />
              <div className="flex gap-2">
                <Textfield
                  onChange={(e: {
                    target: { value: SetStateAction<number> };
                  }) => {
                    setAreaWidth(Number(e.target.value));
                  }}
                  value={areaWidth}
                  placeholder="Width mxm"
                  type="text"
                  title="Area Width (m)"
                  pattern="[0-9]*"
                />
                <Textfield
                  onChange={(e: { target: { value: any } }) => {
                    setAreaLength(Number(e.target.value));
                  }}
                  value={areaLength}
                  placeholder="Length mxm"
                  type="text"
                  title="Area Length (m)"
                  pattern="[0-9]*"
                />
              </div>
              <Button
                className="w-fit"
                size="small"
                isLoading={isLoadingAddNewArea}
                isDisabled={
                  areaName === "" || areaWidth === 0 || areaLength === 0
                }
                onClick={() => {
                  addNewArea({
                    length: areaLength,
                    width: areaWidth,
                    name: areaName,
                    x: 1,
                    y: 1,
                  });
                  setAreaName("");
                  setAreaWidth(0);
                  setAreaLength(0);
                }}
              >
                ADD NEW FLOOR
              </Button>
              <Button
                className="w-fit"
                size="small"
                isLoading={isLoadingDeleteArea}
                onClick={() => {
                  deleteArea({ id: selectedArea.id });
                }}
                isDisabled={!selectedArea?.id}
              >
                DELETE SELECTED FLOOR
              </Button>
            </div>
          </div>
          {Object.keys(selectedArea).length !== 0 && (
            <div className="border-b px-1 py-2">
              <h3 className="mb-2 px-1 text-base font-semibold tracking-tight text-gray-700">
                ZONES
              </h3>
              <div className="mb-4 flex items-center">
                <ol className="flex flex-col flex-wrap gap-2">
                  {selectedZones?.map((zone: any, index: any) => (
                    <li key={index}>
                      <div className="flex items-center gap-1 rounded-2xl border border-blue-700 bg-blue-50 px-2 py-1 text-sm text-blue-700">
                        {zone.name}{" "}
                        <span className="text-xs text-blue-500">
                          {Math.round(zone.width)}m x{Math.round(zone.length)}m
                        </span>
                        <Button
                          className="ml-1 !border-none text-[10px]"
                          onClick={() => {
                            deleteZone({ id: zone.id });
                          }}
                          isDisabled={isLoadingDeleteZone}
                        >
                          ❌
                        </Button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Textfield
                  value={zoneName}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setZoneName(e.target.value);
                  }}
                  placeholder="Zone is..."
                />
                <div className="flex gap-2">
                  <Textfield
                    value={zoneWidth}
                    max={selectedArea.width}
                    onChange={(e: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setZoneWidth(Number(e.target.value));
                    }}
                    placeholder="Zone Width"
                    type="text"
                    title="Zone Width"
                    pattern="[0-9]*"
                  />
                  <Textfield
                    value={zoneLength}
                    max={selectedArea.length}
                    onChange={(e: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setZoneLength(Number(e.target.value));
                    }}
                    placeholder="Zone Length"
                    type="text"
                    title="Zone Length"
                    pattern="[0-9]*"
                  />
                </div>
                <Button
                  className="w-fit"
                  size="small"
                  isDisabled={zoneName === ""}
                  isLoading={isLoadingAddNewZone}
                  onClick={() => {
                    addZone();
                    setZoneName("");
                  }}
                >
                  ADD NEW ZONES
                </Button>
              </div>
            </div>
          )}
          {sZones && (
            <div className="px-1 py-1">
              <h3 className="mb-2 px-1 text-base font-semibold tracking-tight text-gray-700">
                AISLES
              </h3>
              <div className="mb-4 flex items-center">
                <ol className="flex flex-col flex-wrap gap-2">
                  {selectedAisle?.map((aisle: any, index: any) => (
                    <li key={index}>
                      <div className="flex items-center gap-1 rounded-2xl border border-orange-700 bg-orange-50 px-2 py-1 text-sm text-orange-700">
                        {aisle.name}{" "}
                        <span className="text-xs text-orange-500">
                          ( racks - {aisle.racks} | levels - {aisle.levels} )
                        </span>
                        <Button
                          className="ml-1 !border-none text-[10px]"
                          onClick={() => {
                            deleteAisle({ id: aisle.id });
                          }}
                          isDisabled={isLoadingDeleteAisle}
                        >
                          ❌
                        </Button>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Textfield
                  value={aisleName}
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => {
                    setAisleName(e.target.value);
                  }}
                  placeholder="A"
                  maxLength={1}
                />
                <Select
                  value={selectedZone}
                  options={optionsZones}
                  onChange={(value: any) => {
                    setSelectedZone(value);
                  }}
                />
                <div className="flex w-full items-center gap-2 p-2">
                  <div className=" flex items-center">
                    <input
                      defaultChecked
                      id="default-radio-1"
                      type="radio"
                      value="x"
                      onChange={(e: any) => {
                        setAxis(e.target.value);
                      }}
                      name="axis"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      X
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="y"
                      onChange={(e: any) => {
                        setAxis(e.target.value);
                      }}
                      name="axis"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Y
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Textfield
                    value={noOfLengths}
                    onChange={(e: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setNoOfLengths(Number(e.target.value));
                    }}
                    placeholder="No of Length"
                    type="number"
                    title="No of Length"
                  />
                  <Textfield
                    value={noOfLevels}
                    onChange={(e: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setNoOfLevels(Number(e.target.value));
                    }}
                    placeholder="No of Levels"
                    type="number"
                    title="No of Levels"
                    min={3}
                  />
                  <Textfield
                    value={noOfRacks}
                    onChange={(e: {
                      target: { value: SetStateAction<number> };
                    }) => {
                      setNoOfRacks(Number(e.target.value));
                    }}
                    placeholder="No of Racks"
                    type="number"
                    title="No of Racks"
                  />
                </div>
                <Button
                  className="w-fit"
                  size="small"
                  isDisabled={
                    aisleName === "" ||
                    noOfLengths === 0 ||
                    noOfLevels === 0 ||
                    noOfRacks === 0 ||
                    selectedZone === undefined
                  }
                  isLoading={isLoadingAddNewAisle}
                  onClick={() => {
                    const levelNames = generateArrayFromNumber(noOfLengths);
                    const locations = generateProdLocation(
                      levelNames,
                      noOfRacks,
                      noOfLevels,
                      noOfLengths
                    );

                    const tempLocation: any = locations;

                    addNewAisle({
                      x: selectedZone.x + 1,
                      y: selectedZone.y + 1,
                      axis: axis,
                      length: noOfLengths,
                      name: aisleName,
                      levels: noOfLevels,
                      levelNames: levelNames,
                      racks: noOfRacks,
                      zoneId: selectedZone.id,
                      areaId: selectedArea.id,
                      locations: tempLocation,
                    });
                    setAisleName("");
                    setNoOfLevels(0);
                    setNoOfRacks(0);
                    setNoOfLengths(0);
                    setSelectedZone({});
                  }}
                >
                  ADD NEW AISLE
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between border-t pt-3">
        <Button
          className="w-fit"
          size="small"
          onClick={() => {
            router.push("/");
          }}
        >
          Back
        </Button>
        <Button
          className="w-fit"
          size="small"
          onClick={updateAreaZonesAisles}
          isDisabled={saveButtonIsDisabled}
          isLoading={updateAll.isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default SidebarCoordinates;
