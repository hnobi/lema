import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

const NewPostCard = () => {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#D5D7DA] rounded-lg h-[293px] bg-white hover:bg-gray-100 cursor-pointer transition">
      <Button variant="ghost" size="icon" className="pointer-events-none">
        <CirclePlus className="w-8 h-8 text-gray-400" data-testid="plus-icon" />
      </Button>
      <span className="text-[#717680] font-semibold text-sm">New Post</span>
    </div>
  );
}

export default NewPostCard;