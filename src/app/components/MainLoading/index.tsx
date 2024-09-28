import { Spin } from "antd";
import React from "react";

const MainLoading: React.FC = () => {
    return (
        <div
            data-testid="loading"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
            }}
        >
            <Spin />
        </div>
    );
};

export default MainLoading;
