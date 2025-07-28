import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router";
import Pagination from "./Pagination";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

interface UsersTableProps {
  users: User[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const UsersTable = ({ users, page, setPage, totalPages }: UsersTableProps) => {
  const navigate = useNavigate();

  const sortedUsers = [...users].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  return (
    <div className="w-full p-4  space-y-6">
      <h2 className="text-header">Users</h2>
      <div className="overflow-x-auto rounded-lg border-b-0 border-[1px] border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow >
              <TableHead className="text-left px-6 py-3 text-xs font-medium text-gray-600">
                Full Name
              </TableHead>
              <TableHead className="text-left px-6 py-3 text-xs font-medium text-gray-600">
                Email Address
              </TableHead>
              <TableHead className="text-left px-6 py-3 text-xs font-medium text-gray-600">
                Address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/users/${user.id}/posts`)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/users/${user.id}/posts`);
                  }
                }}
              >
                <TableCell className="px-6 py-4 border-b text-[14px] text-gray-600 font-medium border-gray-200 whitespace-nowrap">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 border-b text-[14px] text-gray-600 font-medium border-gray-200 whitespace-nowrap">
                  {user.email}
                </TableCell>
                <TableCell
                  className="px-6 py-4 border-b border-gray-200 truncate w-[392px]"
                  title={user.address}
                >
                  {user.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} className="sm:justify-end"/>
    </div>
  );
};

export default UsersTable;