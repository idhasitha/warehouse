import { FC, useEffect, useState } from "react";
import { Rack } from "./Rack";
import { Box, Text, useBounds } from "@react-three/drei";
import { LocationBox } from "./LocationBox";
import Annotations from "../molecules/Annotations";
import { api } from "~/utils/api";

interface AisleProps {
  aisle: any;
  controls: any;
}

const Aisle: FC<AisleProps> = ({ aisle, controls }) => {
  const apis = useBounds();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);

  const { data: sProduct } = api.products.productByLocationId.useQuery(
    {
      locationId: selectedLocationId,
    },
    {
      enabled: selectedLocationId !== null,
    }
  );

  return Array.from({ length: aisle.racks }, (_, index) => index * 2).map(
    (rack, index) => {
      return Array.from({ length: aisle.length }, (_, index) => index + 1).map(
        (l, i) => {
          switch (aisle.levels) {
            case 3:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[i]}
                    </Text>
                    <meshBasicMaterial
                      color="#00598d"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.25,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 0.5
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location &&
                            temp.id === selectedLocationId && (
                              <Annotations
                                position={[
                                  aisle.axis === "x"
                                    ? aisle.x +
                                      0.5 +
                                      (rackNo - 1) * 2 +
                                      (position - 1)
                                    : charToNumber + (aisle.x - 1) + 0.5,
                                  0.43 + (levelTemp - 1) * 1.25,
                                  aisle.axis === "x"
                                    ? charToNumber + (aisle.y - 1) + 0.5
                                    : aisle.y +
                                      0.5 +
                                      (rackNo - 1) * 2 +
                                      (position - 1),
                                ]}
                                controls={controls}
                                productLocation={temp}
                                product={sProduct ? sProduct[0] : {}}
                                setSelectedLocationId={setSelectedLocationId}
                                setSelectedLocation={setSelectedLocation}
                              />
                            )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 4:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            1.2 + 0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            1.2 + 0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[i]}
                    </Text>
                    <meshBasicMaterial
                      // color="#00598d"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.25,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 0.5
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />

                          {sProduct &&
                            sProduct[0]?.productLocationId === temp.id && (
                              <Annotations
                                position={[
                                  aisle.axis === "x"
                                    ? aisle.x +
                                      0.5 +
                                      (rackNo - 1) * 2 +
                                      (position - 1)
                                    : charToNumber + (aisle.x - 1) + 0.5,
                                  0.43 + (levelTemp - 1) * 1.25,
                                  aisle.axis === "x"
                                    ? charToNumber + (aisle.y - 1) + 0.5
                                    : aisle.y +
                                      0.5 +
                                      (rackNo - 1) * 2 +
                                      (position - 1),
                                ]}
                                controls={controls}
                                productLocation={temp}
                                product={sProduct ? sProduct[0] : {}}
                                setSelectedLocationId={setSelectedLocationId}
                                setSelectedLocation={setSelectedLocation}
                              />
                            )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 5:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            2.4 + 0.07,
                            l + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            2.4 + 0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[i]}
                    </Text>
                    <meshBasicMaterial
                      color="#ffffff"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      console.log(
                        sProduct && sProduct[0]?.productLocationId === temp.id
                      );

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.25,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 1
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location && (
                            <Annotations
                              position={[
                                aisle.axis === "x"
                                  ? aisle.x +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1)
                                  : charToNumber + (aisle.x - 1) + 0.5,
                                0.43 + (levelTemp - 1) * 1.25,
                                aisle.axis === "x"
                                  ? charToNumber + (aisle.y - 1) + 1
                                  : aisle.y +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1),
                              ]}
                              controls={controls}
                              productLocation={temp}
                              product={sProduct ? sProduct[0] : {}}
                              setSelectedLocationId={setSelectedLocationId}
                              setSelectedLocation={setSelectedLocation}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 6:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            3.5,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            3.5,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[1]}
                    </Text>
                    <meshBasicMaterial
                      color="#00598d"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) * 1.2,
                              0.43 + (levelTemp - 1) * 1.2,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) * 1.24
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location && (
                            <Annotations
                              position={[
                                aisle.axis === "x"
                                  ? aisle.x +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1)
                                  : charToNumber + (aisle.x - 1) * 1.2,
                                0.43 + (levelTemp - 1) * 1.2,
                                aisle.axis === "x"
                                  ? charToNumber + (aisle.y - 1) * 1.04
                                  : aisle.y +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1),
                              ]}
                              controls={controls}
                              productLocation={temp}
                              product={sProduct ? sProduct[0] : {}}
                              setSelectedLocationId={setSelectedLocationId}
                              setSelectedLocation={setSelectedLocation}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 7:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            3.5,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            3.5,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            4.7,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            4.7,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[i]}
                    </Text>
                    <meshBasicMaterial
                      color="#00598d"
                      // transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.2,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 0.5
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location && (
                            <Annotations
                              position={[
                                aisle.axis === "x"
                                  ? aisle.x +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1)
                                  : charToNumber + (aisle.x - 1) + 0.5,
                                0.43 + (levelTemp - 1) * 1.2,
                                aisle.axis === "x"
                                  ? charToNumber + (aisle.y - 1) + 0.5
                                  : aisle.y +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1),
                              ]}
                              controls={controls}
                              productLocation={temp}
                              product={sProduct ? sProduct[0] : {}}
                              setSelectedLocationId={setSelectedLocationId}
                              setSelectedLocation={setSelectedLocation}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 8:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            3.5,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            3.5,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            5.8 + 0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            5.8 + 0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames}
                    </Text>
                    <meshBasicMaterial
                      color="#00598d"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.2,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 0.5
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location && (
                            <Annotations
                              position={[
                                aisle.axis === "x"
                                  ? aisle.x +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1)
                                  : charToNumber + (aisle.x - 1) + 0.5,
                                0.43 + (levelTemp - 1) * 1.2,
                                aisle.axis === "x"
                                  ? charToNumber + (aisle.y - 1) + 0.5
                                  : aisle.y +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1),
                              ]}
                              controls={controls}
                              productLocation={temp}
                              product={sProduct ? sProduct[0] : {}}
                              setSelectedLocationId={setSelectedLocationId}
                              setSelectedLocation={setSelectedLocation}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
            case 9:
              return (
                <>
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            3.5,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            3.5,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Rack
                    rotation={aisle.axis === "x" ? [0, -1.5708, 0] : [0, 0, 0]}
                    key={index}
                    position={
                      aisle.axis === "x"
                        ? [
                            rack + Math.round(aisle.x) + 1,
                            6.9 + 0.07,
                            l - 0.5 + Math.round(aisle.y),
                          ]
                        : [
                            l + Math.round(aisle.x) - 0.5,
                            6.9 + 0.07,
                            rack + Math.round(aisle.y) + 1,
                          ]
                    }
                  />
                  <Box
                    args={[0.9, 1, 0.1]}
                    rotation={
                      aisle.axis === "x" ? [0, -1.5708, 0] : [0, 3.14159, 0]
                    }
                    position={
                      aisle.axis === "x"
                        ? [aisle.x, 3 + 0.07, l - 0.5 + Math.round(aisle.y)]
                        : [l - 0.5 + Math.round(aisle.x), 3 + 0.07, aisle.y]
                    }
                  >
                    <Text
                      fontSize={0.5}
                      position={[0, 0, 0.1]}
                      outlineColor="#000000"
                      outlineOpacity={1}
                      outlineWidth="5%"
                    >
                      {aisle.levelNames.split(",")[i]}
                    </Text>
                    <meshBasicMaterial
                      color="#00598d"
                      transparent
                      opacity={1}
                    />
                  </Box>
                  {aisle.ProductLocation.map((temp: any, j: any) => {
                    if (temp.isFilled === true) {
                      const locationArray = temp.location.split("-");
                      const levelName = locationArray[0];
                      const rackNo = parseInt(locationArray[1]);
                      const levelTemp = parseInt(locationArray[2]);
                      const position = parseInt(locationArray[3]);

                      const charToNumber =
                        levelName[1].toLowerCase().charCodeAt(0) - 96;

                      return (
                        <>
                          <LocationBox
                            key={temp.id}
                            locationId={temp?.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.delta <= 2 && apis?.refresh(e.object).fit();
                              setSelectedLocation(temp?.location);
                              setSelectedLocationId(temp?.id);
                            }}
                            position={[
                              aisle.axis === "x"
                                ? aisle.x +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1)
                                : charToNumber + (aisle.x - 1) + 0.5,
                              0.43 + (levelTemp - 1) * 1.2,
                              aisle.axis === "x"
                                ? charToNumber + (aisle.y - 1) + 0.5
                                : aisle.y +
                                  0.5 +
                                  (rackNo - 1) * 2 +
                                  (position - 1),
                            ]}
                            rotation={
                              aisle.axis === "x" ? [0, 0, 0] : [0, -1.5708, 0]
                            }
                          />
                          {selectedLocation === temp.location && (
                            <Annotations
                              position={[
                                aisle.axis === "x"
                                  ? aisle.x +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1)
                                  : charToNumber + (aisle.x - 1) + 0.5,
                                0.43 + (levelTemp - 1) * 1.2,
                                aisle.axis === "x"
                                  ? charToNumber + (aisle.y - 1) + 0.5
                                  : aisle.y +
                                    0.5 +
                                    (rackNo - 1) * 2 +
                                    (position - 1),
                              ]}
                              controls={controls}
                              productLocation={temp}
                              product={sProduct ? sProduct[0] : {}}
                              setSelectedLocationId={setSelectedLocationId}
                              setSelectedLocation={setSelectedLocation}
                            />
                          )}
                        </>
                      );
                    }
                  })}
                </>
              );
              break;
          }
        }
      );
    }
  );
};

export default Aisle;
