import React from "react";
import { TableColumn, RowData, UserData } from "../types";

interface User {
  _id: string;
  twitterUsername: string;
  profileImage: string;
  isWhiteListed: boolean;
}

interface Metrics {
  impressionsCount: number;
  tweetsCount: number;
  retweetsCount: number;
  telegramMessagesCount: number;
  spaceAttendedCount: number;
  commentCount: number;
}

interface LeaderboardEntry {
  _id: string;
  userId: User;
  metrics: Metrics;
  leaderboardType: string;
  rank: number;
  score: number;
  createdAt: string;
  updatedAt: string;
}
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: LeaderboardEntry[];
  searchValue?: string;
  searchKeys?: (keyof T)[];
  className?: string;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
}

export const Table =  <T,>({
  columns,
  data,
  searchValue: searchTerm = "",
  className,
  beforeContent,
  afterContent,
}:TableProps<T>) => {
  const filteredData = data;
  // const filteredData = searchTerm
  //   ? data.filter((item) =>
  //       searchKeys.some((key) =>
  //         String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     )
  //   : data;

  return (
    <div className={` ${className}`}>
      <div className=" overflow-hidden bg-[rgba(0,77,100,0.51)] border border-[#00EEFF] shadow-[0px_0px_44.1px_rgba(0,238,255,0.62),_0px_0px_7.8px_rgba(0,238,255,0.59)] backdrop-blur-sm box-border ">
        {/* Before Header */}
        <div>{beforeContent}</div>
        {/* Header */}
        <div
          className="grid py-[16px] px-[10px] lg:px-[50px] bg-[rgba(0,0,0,0.34)] !pr-[10px] "
          style={{
            gridTemplateColumns: columns
              .map((col) => col.width || "1fr")
              .join(" "),
          }}
        >
          {columns.map((column) => (
            <div
              key={column.key as string}
              className=" text-center font-['Source_Code_Pro'] uppercase tracking-wider font-[800] text-[24px] text-white py-4 table-col-header-title"
            >
              {column.title}
            </div>
          ))}
        </div>

        {/* Body */}
        <div>
          {filteredData?.map((row: any, index: number) => (
            <div
              key={index}
              className={`grid justify-center items-center  transition-all pl-[10px] lg:pl-[50px] !pr-[10px] border-[3px] border-transparent duration-200 *:hover:text-[#75FF86] hover:border-[#75FF86]  ${
                index % 2 === 0 ? "bg-[#0098BA]  " : "bg-[#071F0A00] "
              }`}
              style={{
                gridTemplateColumns: columns
                  .map((col) => col.width || "1fr")
                  .join(" "),
              }}
            >
              {columns.map((column) => (
                <div
                  key={column.key as string}
                  className="px-1 lg:px-4 py-3 text-center text-white font-['Source_Code_Pro'] font-bold text-[20px] overflow-hidden text-ellipsis whitespace-nowrap "
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom gradient line */}
        <div>{afterContent}</div>
      </div>
    </div>
  );
};
