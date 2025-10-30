import React from 'react';

export const InventorySkeleton = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      {/* Building Selection Skeleton */}
      <div>
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>

      {/* Wing Selection Skeleton */}
      <div>
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>

      {/* Room Selection Skeleton */}
      <div>
        <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
        <div className="h-6 w-64 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-slate-700/50 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-4 py-2"><div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-2"><div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-2"><div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-2"><div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-2"><div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
      <td className="px-4 py-2"><div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded"></div></td>
    </tr>
  );
};