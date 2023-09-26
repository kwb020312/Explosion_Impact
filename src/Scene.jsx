import { useGLTF, useTexture } from "@react-three/drei";
import { data as fragmentsShader } from "./fragments-shader";
import { NodeToyMaterial } from "@nodetoy/react-nodetoy";

const Scene = () => {
  const { nodes } = useGLTF("/assets/models/scene.glb");

  const [
    ground,
    ground2,
    ground_debris,
    pipes_and_rover,
    astronauts_white,
    astronauts_orange,
    fragments,
    debris,
  ] = useTexture([
    "/assets/textures/ground.png",
    "/assets/textures/ground2.png",
    "/assets/textures/ground_debris.png",
    "/assets/textures/pipes_and_rover.png",
    "/assets/textures/astronauts_white.png",
    "/assets/textures/astronauts_orange.png",
    "/assets/textures/fragments.png",
    "/assets/textures/debris.png",
  ]);
  return (
    <>
      <mesh geometry={nodes.ground.geometry}>
        <meshBasicMaterial map={ground} />
      </mesh>
      <mesh geometry={nodes.ground.geometry}>
        <NodeToyMaterial data={fragmentsShader} />
      </mesh>
      <mesh geometry={nodes.ground2.geometry}>
        <meshBasicMaterial map={ground2} />
      </mesh>
      <mesh geometry={nodes.ground_debris.geometry}>
        <meshBasicMaterial map={ground_debris} />
      </mesh>
      <mesh geometry={nodes.pipes_and_rover.geometry}>
        <meshBasicMaterial map={pipes_and_rover} />
      </mesh>
      <mesh geometry={nodes.astronauts_white.geometry}>
        <meshBasicMaterial map={astronauts_white} />
      </mesh>
      <mesh geometry={nodes.astronauts_orange.geometry}>
        <meshBasicMaterial map={astronauts_orange} />
      </mesh>
      <mesh geometry={nodes.fragments.geometry}>
        <meshBasicMaterial map={fragments} />
      </mesh>
      <mesh geometry={nodes.debris.geometry}>
        <meshBasicMaterial map={debris} />
      </mesh>
      <mesh geometry={nodes.astronauts_visors.geometry}>
        <meshStandardMaterial roughness={0} metalness={1} color={"#b68432"} />
      </mesh>
    </>
  );
};

export default Scene;
