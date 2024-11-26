"use client";

import { cn } from "~/utils/lib/utils";
import Button from "../atoms/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "../atoms/Select";
import { useAppContext } from "~/utils/lib/context/app-context";
import { api } from "~/utils/api";

interface SidebarProps {
  className?: string;
  allAreas?: any;
}

export function Sidebar({ className, allAreas }: SidebarProps) {
  const router = useRouter();

  const {
    selectedZones,
    setSelectedZones,
    selectedArea,
    setSelectedArea,
    selectedAisle,
    setSelectedAisle,
  } = useAppContext();

  const [floors, setFloors] = useState<any[]>([]);

  useEffect(() => {
    if (allAreas) {
      const floors = allAreas.map((area: any) => {
        return {
          value: area.id,
          label: area.name,
          ...area,
        };
      });
      setFloors(floors);
    }
  }, [allAreas]);

  const { data: sZones } = api.zones.getZonesByAreaId.useQuery({
    areaId: selectedArea.id,
  });

  const { data: sAisle } =
    api.aisles.getAisleWithLocationsByAreaId.useQuery({
      areaId: selectedArea.id,
    });

  useEffect(() => {
    if (sZones) {
      setSelectedZones(sZones);
    }
  }, [sZones, setSelectedZones]);

  useEffect(() => {
    if (sAisle) {
      setSelectedAisle(sAisle);
    }
  }, [sAisle, setSelectedAisle]);

  return (
    <div
      className={cn(
        "px-3 flex h-[calc(100vh-56px)] items-center border-r border-zinc-200 pb-12 flex-col",
        className
      )}
    >
      <div className="border-b pb-4 flex flex-col justify-left w-full">
        <h2 className="mb-2 text-lg font-semibold tracking-tight">Discover</h2>
        <Button
          className="flex justify-center"
          onClick={() => {
            router.push("/coordinatesPlane");
          }}
          size="small"
        >
          Add new Area/Zone/Aisle 2D
        </Button>
      </div>
      <div className=" py-4 flex flex-col w-full border-b">
        <h2 className="mb-1 font-sans text-base font-medium tracking-tight">
          Floors
        </h2>
        <div className="flex flex-col gap-2">
          <Select
            value={selectedArea}
            options={floors}
            placeholder="Select Floor..."
            onChange={(sFloor: any) => {
              setSelectedArea(sFloor);
            }}
          />
        </div>
      </div>
      {selectedZones && (
        <div className="py-4 flex flex-col w-full border-b">
          <h2 className="mb-1 font-sans text-sm font-medium tracking-tight">
            Zones
          </h2>

          <div className="flex flex-wrap gap-1">
            {selectedZones?.map((zone: any, index: any) => (
              <div className="flex " key={index}>
                <span className="rounded-sm border border-blue-700 bg-blue-50 px-2 py-[1px] text-sm text-blue-700">
                  {zone.name}{" "}
                  <span className="text-xs text-blue-500">
                    {zone.width}m x{zone.length}m
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedZones && (
        <div className="py-4 flex flex-col w-full">
          <h2 className="mb-1 font-sans text-sm font-medium  tracking-tight">
            Aisles
          </h2>

          <div className="flex flex-wrap gap-1">
            {selectedAisle?.map((aisle: any, index: any) => (
              <div className="flex " key={index}>
                <span className="rounded-sm border border-orange-700 bg-orange-50 px-2 py-[1px] text-sm text-orange-700">
                  {aisle.name}{" "}
                  <span className="text-xs text-orange-500">
                    ( racks - {aisle.racks} | levels - {aisle.levels} )
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
