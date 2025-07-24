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
    <div className="w-full p-4">
      <h2 className="text-4xl font-semibold mb-8 text-left">Users</h2>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left px-6 py-4 font-medium text-gray-700">
                Full Name
              </TableHead>
              <TableHead className="text-left px-6 py-4 font-medium text-gray-700">
                Email Address
              </TableHead>
              <TableHead className="text-left px-6 py-4 font-medium text-gray-700">
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
                <TableCell className="px-6 py-4 border-b border-gray-200">
                  {user.name}
                </TableCell>
                <TableCell className="px-6 py-4 border-b border-gray-200">
                  {user.email}
                </TableCell>
                <TableCell
                  className="px-6 py-4 border-b border-gray-200 truncate max-w-[392px]"
                  title={user.address}
                >
                  {user.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default UsersTable;