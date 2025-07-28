// components/UserTableSkeleton.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loader from "../Loader";

const UserTableSkeleton = () => {
  return (
    <div className="w-full p-4">
      <h2 className="text-header mb-6">Users</h2>
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
            <TableRow>
              <TableCell colSpan={3} className="h-[332px]">
                <div className="flex justify-center items-center w-full h-full">
                  <Loader />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
