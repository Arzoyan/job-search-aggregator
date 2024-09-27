import { Input } from "antd";
import React from "react";

interface MainInputProps {
    value: string;
    onChange: (location: string) => void;
    placeholder?: string
}

const MainInput: React.FC<MainInputProps> = ({ value, onChange, placeholder }) => {
    return (
        <Input
            style={{
                maxWidth: "320px",
                minWidth: "100px"
            }}
            placeholder={placeholder || "Location"}
            value={value}
            onChange={(e) => onChange(e.target.value.trim())} // Correctly typed
        />
    );
};

export default MainInput;
