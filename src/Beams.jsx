import { useGLTF, useTexture } from "@react-three/drei";

const Beams = () => {
  const { nodes } = useGLTF("/assets/models/beams.glb");

  const { beams_mask } = useTexture(["/assets/textures/beams_mask.png"]);

  const beamsGeometries = [
    nodes.beam0.geometry,
    nodes.beam1.geometry,
    nodes.beam2.geometry,
    nodes.beam3.geometry,
    nodes.beam4.geometry,
    nodes.beam5.geometry,
    nodes.beam6.geometry,
  ];
  return (
    <>
      {beamsGeometries.map((geometry, i) => (
        <Beam
          geometry={geometry}
          beams_mask={beams_mask}
          beam_index={i}
          key={i}
        />
      ))}
    </>
  );
};

function Beam({ geometry, beams_mask, beam_index }) {
  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial map={beam_index} />
    </mesh>
  );
}

export default Beams;
