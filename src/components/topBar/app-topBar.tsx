import { LogOut, Power, User } from "lucide-react";
import { SearchComponent } from "../shared/searchComponent";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { logout } from "@/services/AuthService";


const TopBarComponent = () => {
  return (
    <div className="fixed top-0 left-0 w-full md:ml-12 bg-sidebar h-10 z-0 flex items-center ">
      {/* FUNDO PARA LOGO NÃO MEXA */}
      <div className="bg-sidebar w-10 h-10 flex justify-center">
        <img src="../../../logo.jpg" alt="Logo" className="h-6 my-2 "/>
      </div>

      {/* BUTTONS SIDEBAR */}
      <div className="flex gap-4  items-center ml-auto">
       <SearchComponent className="flex gap-4 mx-4 md:w-1/2" />
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

  