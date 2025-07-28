import { Link, useParams } from "react-router";
import PostCard, { type Post } from "@/components/PostCard";
import NewPostCard from "@/components/NewPostCard";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { deletePost, fetchUserById } from "@/services/user";
import { toast } from "react-toastify";
import NewPostModal from "@/components/NewPostModal";
import { useState } from "react";


const UserPosts = () => {
	const [open, setOpen] = useState(false);
	const { userId } = useParams();
	const queryClient = useQueryClient();
	const key: QueryKey = ['posts', userId];

	const { data, isLoading, error } = useQuery({
		queryKey: [key],
		queryFn: () => fetchUserById(userId as string),
		enabled: !!userId,
	});

	const deletePostMutation = useMutation({
		mutationFn: (postId: string) => deletePost(postId),
		onSuccess: () => {
			toast.error("Post deleted successfully");
			if (userId) {
				queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});
	const handleOpenNewPost = () => setOpen(true);
	const handleCloseNewPost = () => setOpen(false);


	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading users.</p>;

	if (!data || !data.posts || !data.user) {
		return <p>No posts found for this user.</p>;
	}

	const { posts, user } = data;

	return (
		<div className="min-h-screen">
			<div className="max-w-5xl mx-auto py-12 px-4 space-y-6">
				<div className="space-y-4">
					<Link to="/" className="text-gray-600 font-semibold text-sm flex items-center">
						<span className="mr-2"><ArrowLeft /></span> Back to Users
					</Link>
					<h1 className="text-4xl font-medium text-gray-900">{user.name}</h1>
					<div className="text-gray-600 text-sm font-normal">
						{user.email} &middot; {posts?.length} Posts
					</div>
				</div>
				<div className="flex flex-wrap gap-x-[23px] gap-y-6">
					<NewPostCard  onClick={handleOpenNewPost}/>
					{posts.map((post: Post) => (
						<PostCard key={post.id} post={post} handleDelete={() => deletePostMutation.mutate(String(post.id))}/>
					))}
				</div>
			</div>
			<NewPostModal open={open} onClose={ handleCloseNewPost} userId={userId || ""} />
		</div>
	);
}
export default UserPosts;
