import { useState } from "react";
import UsersTable from "@/components/UserTable";
import { fetchUsers } from "@/services/user";
import { useQuery } from '@tanstack/react-query';
import type { IUser } from "@/types/user";
import UserTableSkeleton from "@/components/Skeletons/UserTableSkeleton";

const Users = () => {
	const [page, setPage] = useState(1);

	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['users', page],
		queryFn: () => fetchUsers(page, 4),
	});

  	if (isLoading) return <p className="h-screen text-6xl flex justify-center items-center">fetching users...</p>;

	if (error) return <p>Error loading users.</p>;

	const users = data.users.map((user: IUser) => ({
		...user,
		address: user.street && user.city && user.state && user.zipcode
			? `${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`
			: "",
	}));


	return (
		<div className="min-h-screen">
			<div className="max-w-5xl mx-auto py-12 px-4">
			{isFetching ? <UserTableSkeleton /> :
      
      <UsersTable
					users={users}
					page={page}
					setPage={setPage}	
					totalPages={data.totalPages}
				/>
        }
        
			</div>
		</div>
	);
};

export default Users;
