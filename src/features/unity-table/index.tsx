import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { EditIcon, HeartIcon, HeartOffIcon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import dayjs from 'dayjs';
import { getFilterTranslation } from '@/lib/helpers';

import EditUnity from '../unity-modify/edit-unity';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { IListItem } from '@/types/list';

export const columns: ColumnDef<IListItem>[] = [
  {
    accessorKey: 'name',
    header: 'Назва',
    cell: ({ row }) => (
      <div className='w-full max-w-[50%] truncate'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => getFilterTranslation(row.getValue('status')),
  },
  {
    accessorKey: '_creationTime',
    header: 'Дата створення',
    cell: ({ row }) =>
      dayjs(row.getValue('_creationTime')).format('DD.MM.YYYY'),
  },
  {
    accessorKey: 'rate',
    header: 'Оцінка',
    cell: ({ row }) => {
      const rateValue: number | undefined = row.getValue('rate');

      return (
        <span>
          {rateValue}
          {rateValue ? '/10' : '-'}
        </span>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const unity = row.original;

      return (
        <EditUnity unityId={unity._id} listItem={unity}>
          <EditIcon />
        </EditUnity>
      );
    },
  },
];

export default function UnityTable({ list }) {
  const table = useReactTable({
    data: list,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='w-full' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
