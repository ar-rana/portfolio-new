const BgGradient = () => {
  return (
    <div
      aria-hidden
      className="app-top-breath pointer-events-none fixed inset-x-0 top-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse at top center, rgba(242,242,238,0.22) 0%, rgba(89,129,133,0.26) 34%, rgba(89,129,133,0.12) 52%, rgba(23,23,23,0) 80%)",
        filter: "blur(1px)",
      }}
    />
  );
};

export default BgGradient;
