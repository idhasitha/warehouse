"use client";

/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  Billboard,
  Bounds,
  Box,
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, Suspense, useEffect, useRef } from "react";
import { useAppContext } from "~/utils/lib/context/app-context";
import Floor from "./atoms/Floor";
import Zone from "./atoms/Zone";
import Aisle from "./atoms/Aisle";
import * as THREE from "three";
import Loading from "./atoms/Loading";
import { LocationBox } from "./atoms/LocationBox";

interface ThreeDPlaneProps {
  allAisle: any;
  allAreas: any;
  isAreasLoading: boolean;
  isAisleLoading: boolean;
}

const ThreeDPlane: FC<ThreeDPlaneProps> = ({
  allAisle,
  allAreas,
  isAreasLoading,
  isAisleLoading,
}: ThreeDPlaneProps) => {
  const ref = useRef<any>();

  const { selectedArea, selectedZones, selectedAisle } = useAppContext();

  const { ...gridConfig } = useControls({
    // cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
    // cellThickness: { value: 1, min: 0, max: 5, step: 0.1 },
    cellColor: "#6f6f6f",
    sectionSize: { value: 5, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 0.7, min: 0, max: 5, step: 0.1 },
    sectionColor: "#9d4b4b",
    followCamera: false,
    infiniteGrid: true,
  });

  if (isAisleLoading || isAreasLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      <div
        className="relative h-full w-full overflow-auto border"
        id="three-d-canvas"
      >
        <Canvas shadows frameloop="demand">
          <PerspectiveCamera makeDefault position={[-50, 50, -50]} fov={40} />
          <color args={["0xcccccc"]} attach="background" />
          <Grid position={[0, -0.01, 0]} {...gridConfig} args={[100]} />
          <GizmoHelper
            alignment="bottom-right" // widget alignment within scene
            margin={[80, 80]} // widget margins (X, Y)
          >
            <GizmoViewport
              axisColors={["red", "green", "blue"]}
              labelColor="black"
            />
            {/* alternative: <GizmoViewcube /> */}
          </GizmoHelper>
          <OrbitControls
            ref={ref}
            makeDefault
            position={[-30, 50, -30]}
            maxPolarAngle={1.6}
          />
          <ambientLight
            intensity={3}
            position={[-30, 50, -30]}
            // color={"#00598d"}
          />
          {Object.keys(selectedArea).length !== 0 && (
            <Floor selectedArea={selectedArea} />
          )}
          {selectedZones?.map((zone: any, index: any) => (
            <Zone key={index} zone={zone} />
          ))}
          {selectedAisle?.map((aisle: any) => (
            <>
              <Billboard
                follow
                position={[aisle.width / 2, 2.05, aisle.length / 2]}
              >
                <Text
                  fontSize={0.5}
                  outlineColor="#000000"
                  outlineOpacity={1}
                  outlineWidth="5%"
                >
                  {aisle.name}
                </Text>
              </Billboard>

              <Bounds fit clip observe margin={3.4}>
                <Aisle aisle={aisle} controls={ref} />
              </Bounds>
            </>
          ))}
        </Canvas>
      </div>
    </Suspense>
  );
};

export default ThreeDPlane;
