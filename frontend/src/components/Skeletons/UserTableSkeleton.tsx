// components/UserTableSkeleton.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTableSkeleton = ({ rows = 6 }: { rows?: number }) => {
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
            {Array.from({ length: rows }).map((_, idx) => (
              <TableRow key={idx}>
                <TableCell className="px-6 py-4 border-b border-gray-200">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell className="px-6 py-4 border-b border-gray-200">
                  <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                </TableCell>
                <TableCell className="px-6 py-4 border-b border-gray-200">
                  <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTableSkeleton;
