/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 public/assets/models/rack.glb -t 
*/

import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    customizable_warehouse_racksample2: THREE.Mesh
  }
  materials: {}
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function Rack(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('assets/models/rack.glb') as GLTFResult
  // Create a material for the original mesh
  const originalMaterial = new THREE.MeshBasicMaterial({ color: '#639dd1' });

  // Create a material for the outline
  const outlineMaterial = new THREE.MeshBasicMaterial({ color: '#1e4263', side: THREE.BackSide });
  return (
    <group {...props} dispose={null} >
      <mesh geometry={nodes.customizable_warehouse_racksample2.geometry} material={originalMaterial} position={[0.5, 0, 0.13]} scale={[0.029, 0.025, 0.018]} >
        <meshBasicMaterial attach="material" color={'#639dd1'} />
      </mesh>
     {/* Outline mesh */}
     <mesh geometry={nodes.customizable_warehouse_racksample2.geometry} material={outlineMaterial} position={[0.5, 0, 0.13]} scale={[0.030, 0.026, 0.019]} />
    </group>
  )
}

useGLTF.preload('assets/models/rack.glb')
