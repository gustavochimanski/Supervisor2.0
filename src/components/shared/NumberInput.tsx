// src/client/components/inputs/NumberInput.tsx

import React from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ label, value, onChange, placeholder }) => (
  <div className="flex items-center space-x-4">
    <label className="w-1/2">{label}</label>
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      className="w-1/2"
    />
  </div>
);

export default NumberInput;
