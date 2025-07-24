import { Link, useParams } from "react-router";
import PostCard, { type Post } from "@/components/PostCard";
import NewPostCard from "@/components/NewPostCard";
import { ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import { deletePost, fetchUserById } from "@/services/user";


const UserPosts = () => {
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
			if (userId) {
				queryClient.invalidateQueries({ queryKey: [key] });
			}
		},
	});

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading users.</p>;

	if (!data || !data.posts || !data.user) {
		return <p>No posts found for this user.</p>;
	}

	const { posts, user } = data;

	return (
		<div className="min-h-screen">
			<div className="max-w-5xl mx-auto py-12 px-4">
				<div className="mb-6">
					<Link to="/" className="text-[#535862] font-semibold text-sm hover:underline flex items-center">
						<span className="mr-2"><ArrowLeft /></span> Back to Users
					</Link>
					<h1 className="text-3xl font-semibold my-4">{user.name}</h1>
					<div className="text-gray-500">
						{user.email} &middot; {posts?.length} Posts
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<NewPostCard />
					{posts.map((post: Post) => (
						<PostCard key={post.id} post={post} handleDelete={() => deletePostMutation.mutate(String(post.id))}/>
					))}
				</div>
			</div>
		</div>
	);
}
export default UserPosts;
