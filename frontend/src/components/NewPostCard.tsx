import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";

const NewPostCard = ({onClick}: {onClick : () => void}) => {
  return (
    <Button onClick ={onClick} className="w-full sm:w-[270px]  h-[293px] flex flex-col items-center justify-center border-2  space-x-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-100 cursor-pointer transition">
      <span>
        <CirclePlus className="w-6 h-6 text-gray-400" data-testid="plus-icon" />
      </span>
      <span className="text-[#717680] font-semibold text-sm">New Post</span>
    </Button>
  );
}

export default NewPostCard;