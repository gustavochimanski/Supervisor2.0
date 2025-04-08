"use client";

import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Circle } from "lucide-react";

import { nfceColumns } from "./columns";
import mockCupons from "./mockCupons.json";

const ComponentCentralNFCE = () => {
  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Central NFCE</CardTitle>
          <CardDescription />
        </CardHeader>

        <CardContent className="font-semibold flex justify-between gap-4 pb-0 mb-0">
          {/* Filtros */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-20">
              <h1>Empresa</h1>
              <Input />
            </div>
            <div className="flex flex-col gap-1 w-40">
              <h1>Pdvs</h1>
              <Input />
            </div>
            <div className="flex flex-col gap-1 w-32">
              <h1>Série</h1>
              <Input />
            </div>
            <div className="flex flex-col text-center gap-1 w-10">
              <h1>Sit</h1>
              <Input className="text-center" />
            </div>
            <div className="flex flex-col gap-1 w-32">
              <h1>Data inicial</h1>
              <Input />
            </div>
            <div className="flex flex-col gap-1 w-32">
              <h1>Data final</h1>
              <Input />
            </div>
          </div>

          {/* Legenda */}
          <div className="mr-10 flex flex-col text-sm">
            <h1 className="text-end font-semibold mb-1">Legenda</h1>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-green-700 fill-green-700" />
                <span>Autorizado</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span>Pendente</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-red-300 fill-red-300" />
                <span>Cancelado</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="w-4 h-4 text-orange-400 fill-orange-400" />
                <span>Inutilizado</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardContent className="p-0 flex-1 overflow-hidden">
          <DataTableComponentMui
            rows={mockCupons}
            columns={nfceColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ComponentCentralNFCE;
