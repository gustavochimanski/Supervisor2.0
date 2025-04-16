// app/(private)/cadastros/components/tabs/usuarios/ComponentMainUsuarios.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DataTableComponentMui from "@/components/shared/table/mui-data-table";
import { getColumnsUsuarios, getPermissaoUsuarioColumns } from "./columnsUsuarios";
import { Button } from "@/components/ui/button";
import { CircleCheck, CirclePlus, CircleX } from "lucide-react";

const ComponentUsuarios = () => {
  const [editModel, setEditModel] = useState<any>(null);


  const [usuarios, setUsuarios] = useState([
    { codigo: 1, nome: "João da Silva" },
    { codigo: 2, nome: "Maria Oliveira" },
  ]);

  const [permissoes, setPermissoes] = useState([
    { id: 1, nome: "Administrador" },
    { id: 2, nome: "Financeiro" },
    { id: 3, nome: "Estoquista" },
  ]);

  const handleEditar = (id: number) => {
    const usuario = usuarios.find((u) => u.codigo === id);
    setEditModel(usuario || null);
  };
  

  const handleExcluirUsuario = (id: number) => {
    console.log("Excluir usuário", id);
    setUsuarios((prev) => prev.filter((u) => u.codigo !== id));
  };

  const handleExcluirPermissao = (id: number) => {
    console.log("Excluir permissão", id);
    setPermissoes((prev) => prev.filter((p) => p.id !== id));
  };

  const usuarioColumns = getColumnsUsuarios(handleEditar, handleExcluirUsuario, setEditModel);

  const permissaoColumns = getPermissaoUsuarioColumns(handleExcluirPermissao);

  return (
    <div className="flex flex-row md:flex-row w-full overflow-auto h-full gap-4">
      {/* Card: Usuários */}
      <Card className="flex-1 h-full">
        <CardHeader>
          <CardTitle>Cadastro de Usuários</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 h-full">
          <DataTableComponentMui
            rows={usuarios}
            columns={usuarioColumns}
            getRowId={(row) => row.codigo}
          />
        </CardContent>
        <CardFooter>
          <Button>Adicionar Usuário</Button>
        </CardFooter>
      </Card>

      {/* Card: Permissões */}
      <Card
        className={`flex-1 h-full ${
          !editModel ? "opacity-60 pointer-events-none select-none" : ""
        }`}
      >
        <CardHeader>
          <CardTitle>Permissões do Usuário</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 h-full">
          <DataTableComponentMui
            rows={permissoes}
            columns={permissaoColumns}
            getRowId={(row) => row.id}
          />
        </CardContent>
        <CardFooter className="gap-4">
          <Button variant={"secondary"} disabled={!editModel}><CirclePlus/>Adicionar</Button>
          <Button variant={"secondaryDestructive"} disabled={!editModel} onClick={() => setEditModel(false)}><CircleX/>Cancelar</Button>
          <Button disabled={!editModel}><CircleCheck/>Gravar</Button>
        </CardFooter>
      </Card>

    </div>
  );
};

export default ComponentUsuarios;
