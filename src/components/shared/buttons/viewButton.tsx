// components/ViewButton.tsx
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewButtonProps {
  onClick: () => void;
  className?: string;
}

export const ViewButton = ({ onClick, className }: ViewButtonProps) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className={`text-blue-700 ${className ?? ""}`}
  >
    <Eye size={18} />
  </Button>
);
