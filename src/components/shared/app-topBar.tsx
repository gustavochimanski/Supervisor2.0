import { Power, User } from "lucide-react";
import { SearchComponent } from "../shared/searchComponent";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { logout } from "@/services/Auth/authenticate";
import { useMediaQuery, useTheme } from "@mui/material";
import Image from 'next/image';



const TopBarComponent = () => {

  const theme = useTheme();
  // Considera mobile se a largura da tela for menor que o breakpoint "sm" (600px por padrão)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <div className="fixed right-0 h-10 w-full bg-sidebar z-0 flex items-center justify-end ">
      {/* FUNDO PARA LOGO NÃO MEXA */}
 
      {/* BUTTONS SIDEBAR */}
      <div className="flex items-center gap-4 justify-end mr-2 ">
        {isMobile && (
          <Image src="/logo.jpg" alt="logo" className=" m-auto" width={20} height={20} />
        )}
       <SearchComponent className="flex gap-4  md:w-1/2" />
       <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant={"secondary"}><User/></Button></DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuLabel>Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User/>Conta</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}><Power/>Logout </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        
      </div>
    </div>
  );
}

export default TopBarComponent;

  