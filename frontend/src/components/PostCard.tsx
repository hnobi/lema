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
    <div  className="relative border-[1px] border-[#D5D7DA] rounded-lg bg-white p-6 shadow-sm h-[293px] flex flex-col">
      <button onClick={handleDelete} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors">
        <Trash2 className="w-4 h-4" data-testid="delete-button" />
      </button>
      <div className="font-medium mb-2 pr-8 text-[#535862]">{post.title}</div>
      <div className="text-sm line-clamp-9 text-[#535862]">{post.body}</div>
    </div>
  );
}

export default PostCard;