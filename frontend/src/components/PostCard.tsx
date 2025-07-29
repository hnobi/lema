import { Trash2 } from "lucide-react";

export interface Post {
  id: number;
  title: string;
  body: string;     
}
 interface PostCardProps {
  post: Post,
  handleDelete?: () => void;
}   

const PostCard = ({ post, handleDelete = () => {} }: PostCardProps) =>{

  return (
    <div  className="w-full sm:w-[270px]  h-[293px] shadow-card relative border-[1px] border-gray-300 rounded-lg bg-white p-6 shadow-sm flex flex-col">
      <button onClick={handleDelete} className=" text-6 absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors cursor-pointer">
        <Trash2 className="w-3 h-3" data-testid="delete-button" />
      </button>
      <div className="text-[18px] font-medium mb-4 pr-8 text-gray-600">{post.title}</div>
      <div className="text-sm line-clamp-7 text-gray-600">{post.body}</div>
    </div>
  );
}

export default PostCard;