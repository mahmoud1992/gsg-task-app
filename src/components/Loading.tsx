import React from "react";

const Loading: React.FC = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <div
                style={{
                    width: "40px",
                    height: "40px",
                    border: "4px solid #ccc",
                    borderTop: "4px solid #000",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                }}
            />
            <style>
                {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
            </style>
        </div>
    );
};

export default Loading;
