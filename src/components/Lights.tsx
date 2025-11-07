const Lights = () => {
  return (
    <>
      <directionalLight intensity={2} position={[10, 10, 5]} />
      <ambientLight intensity={0.15} />
    </>
  );
};

export default Lights;
