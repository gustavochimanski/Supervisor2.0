// src/utils/dashboardCardUtils.tsx
import { TotaisGeraisMeta } from "@/app/(private)/(dashboard)/types/typeMetas";
import React from "react";

export const getProgressColor = (percentual: number) => {
  if (percentual >= 100) return "bg-green-500";
  if (percentual >= 60) return "bg-blue-500";
  if (percentual >= 30) return "bg-yellow-500";
  return "bg-red-500";
};

export const getProgressColorInverted = (percentual: number) => {
  if (percentual >= 95) return "bg-red-500";
  if (percentual >= 70) return "bg-yellow-500";
  if (percentual >= 40) return "bg-blue-500";
  return "bg-green-500";
};

export const getProgressColorLucro = (percentual: number) => {
  console.log(percentual)
  if (percentual >= 95) return "bg-green-500";
  if (percentual >= 75) return "bg-blue-500";
  if (percentual >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

export const getProgressBar = (progresso: number, labelProgress: string, invertido = false, lucro = false) => {
  const percentual = Math.min(Math.round(progresso * 100), 999);
  const cor = lucro
  ? getProgressColorLucro(percentual)
  : invertido
    ? getProgressColorInverted(percentual)
    : getProgressColor(percentual);


  return (
    <div className="mt-2 w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{labelProgress}</span>
        <span className="font-medium">{percentual}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${cor} transition-all duration-500 ease-in-out`}
          style={{ width: `${Math.min(percentual, 100)}%` }}
        />
      </div>
    </div>
  );
};

export const getProgressValue = (metas: TotaisGeraisMeta[], tipo: TotaisGeraisMeta["tipo"]) => {
  return metas.find((meta) => meta.tipo === tipo)?.valorMeta ?? 0;
};
