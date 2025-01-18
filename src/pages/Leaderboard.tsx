import { useEffect, useState } from "react";
import axios from "axios";
import { RowData, TableColumn } from "../types";
import PGLayout from "../components/PGLayout";
import { Table } from "../components/Table";
import topImage from "../Assets/tabletopImage.png";
import timg1 from "../Assets/timg1.png";
import timg2 from "../Assets/timg2.png";
import timg3 from "../Assets/timg3.png";
import timg4 from "../Assets/timg4.png";
import ShapeButton from "../components/ShapeButton";
import Search from "../components/Search";
import Heading from "../components/Heading";
import mobileHero from "../../public/leaderbaord-page-mobile-hero.png";
import desktopBG from "../../public/bg.png";
import mobileTableBGPattern from "../../public/mobile-leaderboard-bg-pattern.png";

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

// const columns: TableColumn<LeaderboardEntry>[] = [
//   {
//     key: "rank",
//     title: "Rank",
//     render: (value:LeaderboardEntry) => <span className="font-bold">{value}</span>,
//   },
//   {
//     key: "userId",
//     title: "User",
//     width: "1.5fr",
//     render: (_, row) => (
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <img
//             src={row.userId.profileImage}
//             alt={row.userId.twitterUsername}
//             className="min-w-[48px] min-h-[48px] w-[48px] h-[48px] object-cover border border-cyan-500/50"
//           />
//           <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
//         </div>
//         <span className="font-['Source_Code_Pro']">{row.userId.twitterUsername}</span>
//       </div>
//     ),
//   },
//   { key: "metrics.impressionsCount", title: "Impressions" },
//   { key: "metrics.tweetsCount", title: "Tweets" },
//   { key: "metrics.commentCount", title: "Comments" },
//   { key: "metrics.retweetsCount", title: "Re-Tweets" },
//   { key: "metrics.telegramMessagesCount", title: "TG Msgs" },
// ];
const columns: TableColumn<LeaderboardEntry>[] = [
  {
    key: "rank",
    title: "Rank",
    render: (value: string | number | User | Metrics) => (
      <span className="font-bold">{value as number}</span>
    ), // Type added to _
  },
  {
    key: "userId",
    title: "User",
    width: "1.5fr",
    render: (
      _: string | number | User | Metrics,
      row: LeaderboardEntry // Type added to _
    ) => (
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={row.userId.profileImage}
            alt={row.userId.twitterUsername}
            className="min-w-[48px] min-h-[48px] w-[48px] h-[48px] object-cover border border-cyan-500/50"
          />
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
        </div>
        <span className="font-['Source_Code_Pro']">
          {row.userId.twitterUsername}
        </span>
      </div>
    ),
  },
  {
    key: "metrics.impressionsCount",
    title: "Impressions",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{row.metrics.impressionsCount}</span>
    ),
  },
  {
    key: "metrics.tweetsCount",
    title: "Tweets",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{row.metrics.tweetsCount}</span>
    ),
  },
  {
    key: "TG Msgs",
    title: "Comments",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{row.metrics.telegramMessagesCount}</span>
    ),
  },
  {
    key: "metrics.retweetsCount",
    title: "Re-Tweets",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{row.metrics.retweetsCount}</span>
    ),
  },
  {
    key: "score",
    title: "score",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{row.score}</span>
    ),
  },
];

const Leaderboard = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<{
          data: { leaderBoard: LeaderboardEntry[] };
        }>("http://localhost:5000/api/v1/leaderboard/today");
        setData(response.data.data.leaderBoard);
        setFilteredData(response.data.data.leaderBoard); // Initialize with full data
      } catch (err) {
        console.error("Failed to fetch leaderboard data.", err);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((entry) =>
        entry.userId.twitterUsername
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <PGLayout bgImage={desktopBG}>
      <div className="mx-auto min-h-screen py-[50px] max-w-[1470px] w-[90%] leaderbaord-page-desktop">
        <ShapeButton
          onClick={() => {}}
          buttonText="[LOGOUT]"
          containerClassName="ml-auto mb-[10px]"
        />
        <Heading text="TARDINATORS LEADERBOARD" />
        <div className="max-w-[1194px] mx-auto">
          <Search
            containerClassName="ml-[-16px]"
            value={search}
            Onchange={(e) => setSearch(e.target.value)}
          />
          <Table
            columns={columns}
            data={filteredData ?? []}
            searchValue={search}
            className="max-w-[1294px] shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            beforeContent={
              <div className="w-full bg-[#00EEFF] px-2 pb-[2px]">
                <img className="h-[15px]" src={topImage} alt="" />
              </div>
            }
            afterContent={
              <div className="flex items-end w-full px-4 py-3 *:object-contain">
                <img className="h-[24px] w-[200px]" src={timg1} alt="" />
                <img className="h-[24px] ml-[47px]" src={timg2} alt="" />
                <img className="h-[24px] ml-[26px]" src={timg3} alt="" />
                <img
                  className="h-[26px] w-[200px] ml-auto"
                  src={timg4}
                  alt=""
                />
              </div>
            }
          />
        </div>
      </div>
    </PGLayout>
  );
};

export default Leaderboard;
