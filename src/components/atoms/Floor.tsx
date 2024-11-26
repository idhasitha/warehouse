import {
  Billboard,
  MeshReflectorMaterial,
  Plane,
  Text,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { RepeatWrapping, sRGBEncoding } from "three";
import * as THREE from "three";

interface FloorProps {
  selectedArea: any;
}

const Floor: FC<FloorProps> = ({ selectedArea }) => {
  const [roughness, normal]: any = useLoader(THREE.TextureLoader, [
    "assets/textures/terrain-roughness.jpg",
    "assets/textures/terrain-normal.jpg",
  ]);

  const texture = new THREE.TextureLoader().load(
    "assets/textures/terrain-roughness.jpg"
  );

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4); // Adjust the repeat values as needed

  useEffect(() => {
    [normal, roughness].forEach((texture: any) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
      texture.encoding = sRGBEncoding; // Use sRGBEncoding
      texture.colorSpace = sRGBEncoding; // Use sRGBEncoding
    });
    // normal.encoding = LinearEncoding;
  }, [normal, roughness]);

  return (
    <>
      <Billboard follow position={[0.5, 2.05, 0.5]}>
        <Text
          fontSize={0.5}
          outlineColor="#073763"
          outlineOpacity={1}
          outlineWidth="5%"
        >
          {selectedArea.name}
        </Text>
      </Billboard>
      <Plane
        args={[selectedArea.width, selectedArea.length]}
        rotation={[-1.5708, 0, 0]}
        position={[
          selectedArea.width / 2 + Math.round(selectedArea.x / 20 + 1),
          0.01,
          selectedArea.length / 2 + Math.round(selectedArea.y / 20 + 1),
        ]}
      >
        {/* <meshPhysicalMaterial color="#F6F4EB" transparent opacity={0.5} /> */}
        <MeshReflectorMaterial
          envMapIntensity={0}
          map={texture}
          dithering={true}
          normalMap={normal}
          // normalScale={[0.15, 0.15]}
          roughnessMap={roughness}
          roughness={0.7}
          // blur={[1000, 400]}
          mixBlur={30}
          mixStrength={80}
          mixContrast={1}
          resolution={200}
          mirror={0}
          depthScale={0.01}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.2}
        />
      </Plane>
    </>
  );
};

export default Floor;
