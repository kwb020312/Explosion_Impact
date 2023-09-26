import {
  MeshTransmissionMaterial,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useMemo } from "react";
import { DoubleSide, Vector3 } from "three";

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
  const { vectors, initialPositionAttribute } = useMemo(() => {
    let vectors = [];

    const initialPositionAttribute = geometry.clone().getAttribute("position");

    for (let i = 0; i < initialPositionAttribute.count; i++) {
      let vector = new Vector3();
      vector.fromBufferAttribute(initialPositionAttribute, i);

      const idx = vectors.findIndex((vec, i) => {
        if (vec.x === vector.x && vec.y === vector.y && vec.z === vector.z)
          return true;
      });

      if (idx === -1) vectors.push(vector);
    }

    vectors.sort((a, b) => a.y - b.y);

    return { vectors, initialPositionAttribute };
  }, []);

  const isEven = beam_index % 2 === 0;
  const color = isEven ? "#fff7ed" : "#feedd7";
  const emissive = isEven ? [0.025, 0.011, 0.01] : [0.035, 0.0195, 0.01];
  return (
    <mesh geometry={geometry}>
      <MeshTransmissionMaterial
        alphaToCoverage={true}
        transparent={true}
        alphaMap={beams_mask}
        side={DoubleSide}
        envMapIntensity={0}
        roughness={0.2}
        ior={1.5}
        thickness={0.205}
        transmission={1}
        chromaticAberration={1}
        anisotropy={10}
        color={color}
        emissive={emissive}
      />
    </mesh>
  );
}

export default Beams;
