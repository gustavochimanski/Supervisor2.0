
import LeftZeroInput from "@/components/shared/Inputs/LeftZeroInput";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { CircleArrowRight, CircleX, XIcon } from "lucide-react";
import { useState } from "react";

import { useModalStore } from "@/store/useModalStore";


const ModalProcessarPdv = () => {

  const {isReprocessarPdvModalOpen,closeReprocessarPdv} = useModalStore()
  
  const [empresa, setEmpresa] = useState<string>("");
  console.log(empresa)
  
  if (!isReprocessarPdvModalOpen) return null;

  return (
    <Modal onClose={closeReprocessarPdv}>
      <Card>
        <CardHeader>
          <CardTitle>Processar Pdv</CardTitle>
        </CardHeader>

        <CardContent className="flex gap-4 ">
            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Empresa</label>
              <LeftZeroInput  maxLength={3} className="w-20" placeholder="Empresa" onFormattedChange={(val) => setEmpresa(val)} value={empresa} />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Nome Empresa</label>
              <Input placeholder="Nome Empresa" disabled />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-muted-foreground mb-1">Caixa</label>
              <Input placeholder="Caixas" />
            </div>
        </CardContent>

        <CardContent className="h-[50vh] px-8 overflow-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore placeat officia, perspiciatis iure nobis hic consequuntur, nemo id, similique soluta pariatur magnam error beatae nulla culpa tempore corrupti deleniti! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic blanditiis commodi dolorem nobis veritatis iusto architecto minima quia facere? Quidem reiciendis dolore ea ut molestiae suscipit perspiciatis et, nisi consectetur.
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button variant={"outline"} onClick={closeReprocessarPdv}>
            <CircleX/> Cancelar
          </Button>
          <Button >
            <CircleArrowRight/>Enviar
          </Button>
        </CardFooter>
      </Card>
    </Modal>
  );
};

export default ModalProcessarPdv;
