"use client";

import React, { FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Loading from "./atoms/Loading";
import { Group, Layer, Line, Stage } from "react-konva";
import Rectangle from "./atoms/Rectangle";
import Drawer from "./molecules/Drawer";
import ProdList from "./organisums/ProdList";
import Modal from "./molecules/Modal";
import AddProdLocation from "./organisums/AddProdLocation";
import { useAppContext } from "~/utils/lib/context/app-context";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  levels: number;
}

interface CoordinatesProps {
  allAreas: any;
  allZones: any;
  allAisles: any;
  isZonesLoading?: boolean;
  isAisleLoading?: boolean;
  isAreasLoading?: boolean;
}

export const CoordinatesPlane: FC<CoordinatesProps> = ({
  allAreas,
  isZonesLoading,
  isAreasLoading,
}: CoordinatesProps) => {
  const utils: any = api.useContext();
  const [areas, setAreas] = useState<any[]>([]);
  const [aisle, setAisle] = useState<any[]>([]);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [selectedAType, setSelectedType] = React.useState<string>("");
  const [isOpen, setIsOpen] = useState<any>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProd, setSelectedProd] = useState<any>({});
  const [prodLocationData, setProdLocationData] = useState({});

  const layerRef = React.useRef<any>();

  const {
    selectedArea,
    selectedZones,
    selectedAisle,
    setSelectedArea,
    setSelectedZones,
    setSelectedAisle,
    setSaveButtonIsDisabled,
  } = useAppContext();

  // draw grid lines
  const verticalRegion = [];
  const horizontalRegion = [];

  // Create vertical grid lines
  for (let x = 0; x <= 4000; x += 20) {
    verticalRegion.push(
      <Line key={`vertical_${x}`} points={[x, 0, x, 4000]} stroke="lightgray" />
    );
  }

  // Create horizontal grid lines
  for (let y = 0; y <= 4000; y += 20) {
    horizontalRegion.push(
      <Line
        key={`horizontal_${y}`}
        points={[0, y, 4000, y]}
        stroke="lightgray"
      />
    );
  }

  useEffect(() => {
    setAreas(allAreas);
  }, [allAreas]);

  //for update areas
  const updateArea = api.areas.updateArea.useMutation({
    onMutate: () => {
      utils.areas.allAreas.cancel();
      const optimisticUpdate = utils.areas.allAreas.getData();

      if (!optimisticUpdate) {
        utils.areas.allAreas.setData(optimisticUpdate);
      }
    },
    onSettled: () => {
      utils.areas.allAreas.invalidate();
    },
  });

  const addLocation = () => {
    // console.log(prodLocationData, selectedProd);
  };

  // area de-select
  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId("");
      setSelectedType("");
    }
  };

  //when press delete button delete area is selected
  // useEffect(() => {
  //   const handleDelete = (e: any) => {
  //     if (e.keyCode === 8 && selectedId) {
  //       if (selectedAType === "area") {
  //         deleteArea.mutate({ id: selectedId });
  //       } else deleteAisle.mutate({ id: selectedId });
  //     }
  //   };
  //   window.addEventListener("keydown", handleDelete);
  //   return () => {
  //     window.removeEventListener("keydown", handleDelete);
  //   };
  // }, [selectedId]);

  const generateArrayFromNumber = (number: number, aisleName: string) => {
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
    // levelName-rack-level-position and one bin has 2 combinations
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
            ).map((position: number) => {
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

    return [...new Set(locations.flat(Infinity))];
  };

  if (isAreasLoading ?? isZonesLoading) return <Loading />;

  return (
    <div className="h-full">
      <div className="container flex h-full w-full flex-col items-start justify-start gap-4 overflow-scroll border border-red-500 bg-white">
        <Stage
          width={4000}
          height={4000}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer
            ref={layerRef}
            onDragEnd={(e) => {
              const target = e.target;
              const targetRect = e.target.getClientRect();
              const layer = layerRef.current;

              layer.children.forEach(function (group: any) {
                if (group === target) {
                  return;
                }
                // if (haveIntersection(group.getClientRect(), targetRect)) {
                //   group.findOne('.fillShape').fill('red');
                // } else {
                //   group.findOne('.fillShape').fill('grey');
                // }
              });

              // detect overlapping selected zone with other zone and change color accordingly
            }}
          >
            {verticalRegion}
            {horizontalRegion}

            <Rectangle
              isSelected={`${selectedArea.id}-floor` === selectedId}
              shapeProps={{
                fill: "#00598d",
                height: Number(selectedArea.length) * 20,
                width: Number(selectedArea.width) * 20,
                opacity: 0.1,
                shadowBlur: 1,
                draggable: true,
                x: selectedArea.x * 20,
                y: selectedArea.y * 20,
                id: selectedArea.id,
                name: selectedArea.name,
              }}
              onSelect={() => {
                setSelectedId(`${selectedArea.id}-floor`);
                setSelectedType("area");
              }}
              onChange={(newAttrs) => {
                setSelectedArea((prev: any) => {
                  return {
                    ...prev,
                    x: newAttrs.x,
                    y: newAttrs.y,
                    width: newAttrs.width,
                    length: newAttrs.height,
                  };
                });
                setSaveButtonIsDisabled(false);
                // updateArea.mutate(newAttrs);
              }}
            />
            <Group draggable>
              {selectedZones?.map((zone: any, i: number) => {
                return (
                  <Rectangle
                    key={zone.id}
                    isSelected={`${zone.id}-zone` === selectedId}
                    shapeProps={{
                      fill: "blue",
                      height: Number(zone.length) * 20,
                      width: Number(zone.width) * 20,
                      opacity: 0.1,
                      shadowBlur: 1,
                      draggable: true,
                      x: zone.x * 20,
                      y: zone.y * 20,
                      id: zone.id,
                      name: zone.name,
                    }}
                    onSelect={() => {
                      setSelectedId(`${zone.id}-zone`);
                      setSelectedType("zone");
                    }}
                    onChange={(newAttrs) => {
                      // updateArea.mutate(newAttrs);

                      setSelectedZones((prev: any) => {
                        return prev.map((item: any) => {
                          if (item.id === zone.id) {
                            return {
                              ...item,
                              x: newAttrs.x,
                              y: newAttrs.y,
                              width: newAttrs.width,
                              length: newAttrs.height,
                            };
                          }
                          return item;
                        });
                      });
                      setSaveButtonIsDisabled(false);
                    }}
                  />
                );
              })}
            </Group>

            {selectedAisle?.map((aisle: any, i: number) => {
              return (
                <Rectangle
                  key={aisle.id}
                  isSelected={`${aisle.id}-aisle` === selectedId}
                  shapeProps={{
                    fill: "orange",
                    height:
                      aisle.axis === "x"
                        ? Number(aisle.length) * 20
                        : Number(aisle.racks) * 40,
                    width:
                      aisle.axis === "x"
                        ? Number(aisle.racks) * 40
                        : Number(aisle.length) * 20,
                    opacity: 0.3,
                    shadowBlur: 1,
                    draggable: true,
                    x: aisle.x * 20,
                    y: aisle.y * 20,
                    id: aisle.id,
                  }}
                  onSelect={() => {
                    setSelectedId(`${aisle.id}-aisle`);
                    setSelectedType("aisle");
                  }}
                  onChange={(newAttrs) => {
                    // updateArea.mutate(newAttrs);

                    setSelectedAisle((prev: any) => {
                      return prev.map((item: any) => {
                        if (item.id === aisle.id) {
                          const tempLocations: any = generateProdLocation(
                            generateArrayFromNumber(
                              aisle.axis === "x"
                                ? Math.round(newAttrs.height)
                                : Math.round(newAttrs.width),
                              item.name
                            ),
                            aisle.axis === "x"
                              ? Math.round(newAttrs.width) / 2
                              : Math.round(newAttrs.height) / 2,
                            item.levels,
                            aisle.axis === "x"
                              ? Math.round(newAttrs.height)
                              : Math.round(newAttrs.width)
                          );

                          return {
                            ...item,
                            x: newAttrs.x,
                            y: newAttrs.y,
                            length:
                              aisle.axis === "x"
                                ? Math.round(newAttrs.height)
                                : Math.round(newAttrs.width),
                            levelNames: generateArrayFromNumber(
                              aisle.axis === "x"
                                ? Math.round(newAttrs.height)
                                : Math.round(newAttrs.width),
                              item.name
                            ),
                            racks:
                              aisle.axis === "x"
                                ? Math.round(newAttrs.width) / 2
                                : Math.round(newAttrs.height) / 2,
                            locations: tempLocations || [],
                          };
                        }
                        return {
                          ...item,
                          locations:
                            item.ProductLocation.map(
                              (prod: any) => prod.location
                            ) || [],
                        };
                      });
                    });
                    setSaveButtonIsDisabled(false);
                  }}
                />
              );
            })}

            <Group
              draggable
              onDragEnd={(e) => {
                // console.log(e.target.className);
              }}
            ></Group>
          </Layer>
        </Stage>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <ProdList
          setShowModal={setShowModal}
          setSelectedProd={setSelectedProd}
        />
      </Drawer>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={selectedProd.title}
        submitData={addLocation}
      >
        <AddProdLocation
          product={selectedProd}
          areas={areas}
          aisle={aisle}
          setProdLocationData={setProdLocationData}
          prodLocationData={prodLocationData}
        />
      </Modal>
    </div>
  );
};

export default CoordinatesPlane;
