
import { cn } from "@/lib/utils";
import { Bed, Wrench, Trash, Calendar, Clock, CheckCheck } from "lucide-react";

type RoomStatus = "vacant" | "occupied" | "reserved" | "maintenance" | "cleaning" | "checkout";

interface StatusBadgeProps {
  status: RoomStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getIcon = () => {
    switch (status) {
      case "vacant":
        return <Bed size={14} />;
      case "occupied":
        return <CheckCheck size={14} />;
      case "reserved":
        return <Calendar size={14} />;
      case "maintenance":
        return <Wrench size={14} />;
      case "cleaning":
        return <Trash size={14} />;
      case "checkout":
        return <Clock size={14} />;
      default:
        return null;
    }
  };
  
  const getLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  return (
    <span className={cn(`status-badge status-badge-${status}`, className)}>
      {getIcon()}
      {getLabel()}
    </span>
  );
}
