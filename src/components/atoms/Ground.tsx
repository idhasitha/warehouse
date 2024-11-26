import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { FC, useEffect } from "react";
import { RepeatWrapping, TextureLoader, sRGBEncoding } from "three";
import * as THREE from "three";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GroundProps {
  area: any;
}

const Ground: FC<GroundProps> = ({ area }) => {
  const [roughness, normal]: any = useLoader(TextureLoader, [
    "assets/textures/terrain-roughness.jpg",
    "assets/textures/terrain-normal.jpg",
  ]);

  const texture = new TextureLoader().load(
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
    <mesh
      rotation-x={-Math.PI * 0.5}
      castShadow
      receiveShadow
      position={[area.y, 0, area.x]}
    >
      <planeGeometry
        args={[Math.round(area.height / 50), Math.round(area.width / 50)]}
      />
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
    </mesh>
  );
};

export default Ground;
