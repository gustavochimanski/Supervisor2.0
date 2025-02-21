// InfoSection.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface InfoSectionProps {
  dadosMeioPgto: { id: number | string; descricao?: string };
  setDescricao: (descricao: string) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ dadosMeioPgto, setDescricao }) => {
  return (
    <div>
      <div className="flex justify-center md:justify-normal gap-2  font-sans">
        <div className="flex flex-col gap-1 items-center">
          <CardTitle>Id</CardTitle>
          <Input
            id="id"
            value={dadosMeioPgto.id.toString()}
            className="w-12 text-center bg-slate-300"
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <CardTitle>Descrição</CardTitle>
          <Input
            id="descricao"
            value={dadosMeioPgto.descricao || ""}
            onChange={(evt) => setDescricao(evt.target.value)}
            className="w-full md:w-52"
          />
        </div>
      </div>
      
    </div>
  );
};

export default InfoSection;
