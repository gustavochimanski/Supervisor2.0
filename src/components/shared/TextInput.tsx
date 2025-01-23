// src/client/components/inputs/TextInput.tsx

import React from "react";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, placeholder }) => (
  <div className="flex items-center space-x-4">
    <label className="w-1/2">{label}</label>
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-1/2"
    />
  </div>
);

export default TextInput;
