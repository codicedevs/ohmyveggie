import React from "react";

const UnderConstruction = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fafafa",
        opacity: 0.8,
      }}
    >
      <h1 style={{ color: "#a80874" }}>EN MANTENIMIENTO</h1>
      <img
        src={"/images/Under Construcction.png"}
        alt="Under Construction"
        width={200}
      />
      <p
        style={{
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.5,
          padding: 30,
          textAlign: "center",
          color: "#a80874",
        }}
      >
        Estamos realizando cambios para que tengas una mejor experiencia con
        nuestro sitio
        <br />
        ¡Gracias por comprender!
      </p>
    </div>
  );
};

export default UnderConstruction;
