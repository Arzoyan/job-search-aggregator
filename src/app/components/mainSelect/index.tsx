import { Select } from "antd";
import React from "react";

// Extracting Option from Select
const { Option } = Select;

// Define types for props
interface MainSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string, value: string }[],
    placeholder?: string
}

// MainSelect component
const MainSelect: React.FC<MainSelectProps> = ({ value, onChange, options, placeholder }) => {
    return (
        <Select
            style={{
                maxWidth: "200px",
                minWidth: "100px",
            }}
            placeholder={placeholder || ""}
            value={value}
            onChange={(value: string) => onChange(value)} // Correctly typed
        >
            {options.map(item => {
                return <Option value={item.value} key={item.value}>{item.label}</Option>
            })}
        </Select>
    );
};

export default MainSelect;
