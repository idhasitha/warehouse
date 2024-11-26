import { Billboard, Box, Text } from "@react-three/drei";
import { FC } from "react";

interface ZoneProps {
  zone: any;
}

const Zone: FC<ZoneProps> = ({ zone }) => {
  return (
    <>
      <Billboard
        follow
        position={[
          zone.width / 2 + Math.round(zone.x),
          5.05,
          zone.length / 2 + Math.round(zone.y),
        ]}
      >
        <Text
          fontSize={0.5}
          outlineColor="#000000"
          outlineOpacity={1}
          outlineWidth="5%"
        >
          {zone.name}
        </Text>
      </Billboard>
      <Box
        args={[zone.width, 0.5, zone.length]}
        position={[
          zone.width / 2 + Math.round(zone.x),
          0.05,
          zone.length / 2 + Math.round(zone.y),
        ]}
      >
        <meshPhysicalMaterial
          color="#749BC2"
          transparent
          opacity={0.5}
        />
      </Box>
    </>
  );
};

export default Zone;
