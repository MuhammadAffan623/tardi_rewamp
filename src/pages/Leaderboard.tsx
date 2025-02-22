import { useEffect, useState } from "react";
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
import profileImg from "../../public/common/profile.jpg";
import desktopBG from "../../public/bg.png";
import mobileTableBGPattern from "../../public/mobile-leaderboard-bg-pattern.png";
import { apiRequest } from "../utils/axios";
import mobileHero from "../../public/leaderbaord-page-mobile-hero.png";
import { useWallet } from "@suiet/wallet-kit";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils";

interface User {
  _id: string;
  twitterUsername?: string;
  profileImage?: string;
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

interface IGetLeaderboard {
  data: {
    leaderBoard: LeaderboardEntry[];
  };
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
    width: "80px",
    render: (value: string | number | User | Metrics) => (
      <span className="font-bold">{value as number}</span>
    ), // Type added to _
  },
  {
    key: "userId",
    title: "User",
    width: "2fr",
    render: (
      _: string | number | User | Metrics,
      row: LeaderboardEntry // Type added to _
    ) => (
      <div className="flex items-center gap-1">
        <div className="relative">
          <img
            src={row?.userId?.profileImage || profileImg}
            alt={row?.userId?.twitterUsername ?? ""}
            className="min-w-[48px] min-h-[48px] w-[48px] h-[48px] object-cover border border-cyan-500/50"
          />
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-pulse" />
        </div>
        <span
          className="font-['Source_Code_Pro'] overflow-hidden text-ellipsis whitespace-nowrap  w-[calc(240px-60px)] cursor-pointer"
          onClick={() => {
            if (row?.userId?.twitterUsername) {
              window.open(
                `https://x.com/${row?.userId?.twitterUsername}`,
                "_blank"
              );
            }
          }}
        >
          {row?.userId?.twitterUsername ?? ""}
        </span>
      </div>
    ),
  },
  {
    key: "metrics.impressionsCount",
    title: "Impressions",
    width: "15%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.metrics.impressionsCount || 0)}</span>
    ),
  },
  {
    key: "metrics.tweetsCount",
    title: "Tweets",
    width: "12%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.metrics.tweetsCount || 0)}</span>
    ),
  },
  {
    key: "TG Msgs",
    title: "Comments",
    width: "12%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.metrics.commentCount || 0)}</span>
    ),
  },
  {
    key: "metrics.retweetsCount",
    title: "Re-Tweets",
    width: "15%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.metrics.retweetsCount || 0)}</span>
    ),
  },
  {
    key: "metrics.telegramMessagesCount",
    title: "TG Msgs",
    width: "10%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.metrics.telegramMessagesCount || 0)}</span>
    ),
  },
  {
    key: "score",
    title: "score",
    width: "10%",
    render: (_: string | number | User | Metrics, row: LeaderboardEntry) => (
      <span>{formatNumber(row.score || 0)}</span>
    ),
  },
];

const Leaderboard = () => {
  const { disconnect, connected } = useWallet();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [filteredData, setFilteredData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await apiRequest<IGetLeaderboard>(
          "/leaderboard/today",
          "get"
        );
        setData(response?.data?.leaderBoard);
        setFilteredData(response?.data?.leaderBoard); // Initialize with full data
      } catch (err) {
        console.error("Failed to fetch leaderboard data.", err);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredData(
        data.filter((entry) =>
          entry?.userId?.twitterUsername
            ?.toLowerCase()
            .includes(search?.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
  }, [search, data]);

  return (
    <PGLayout bgImage={desktopBG} isHeader>
      <div className="mx-auto min-h-screen py-[50px] max-w-[1470px] w-[90%] leaderbaord-page-desktop">
        {/* <ShapeButton
          onClick={async () => {
            if (!connected) {
              navigate("/login");
            }
            localStorage.removeItem("token");
            await disconnect();
          }}
          buttonText={connected ? "[LOGOUT]" : "[LOGIN]"}
          containerClassName="ml-auto mb-[10px]"
        /> */}
        <Heading text="TARDINATORS LEADERBOARD" />
        <div className="max-w-full mx-auto">
          <Search
            containerClassName="ml-[-16px]"
            value={search}
            Onchange={(e) => setSearch(e.target.value)}
          />
          <Table
            columns={columns}
            data={filteredData ?? []}
            searchValue={search}
            className="max-w-full shadow-[0_0_30px_rgba(6,182,212,0.15)]"
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
      <div className="leaderbaord-page-mobile">
        <div
          className="leaderbaord-page-mobile-hero"
          style={{
            backgroundImage: `url(${mobileHero})`,
          }}
        >
          {/* <ShapeButton
            onClick={async () => {
              if (!connected) {
                navigate("/login");
              }
              localStorage.removeItem("token");
              await disconnect();
            }}
            buttonText={connected ? "[LOGOUT]" : "[LOGIN]"}
            btnClassName="!h-[90px]"
            containerClassName="ml-auto mb-[10px] mobile-size"
          /> */}
        </div>
        <div
          className="leaderbaord-page-mobile-table"
          style={{
            backgroundImage: `url(${mobileTableBGPattern})`,
          }}
        >
          <div className="mobile-table-item header font-bold">
            <div className="mobile-table-item--sno">Score</div>

            <div className="mobile-table-item--username">X</div>
            <div className="mobile-table-item--points">Points</div>
          </div>
          {[...filteredData].map(({ userId, score }, i) => {
            return (
              <div className="mobile-table-item font-bold cursor-pointer">
                <div className="mobile-table-item--sno">{i + 1}</div>
                <div
                  className="mobile-table-item--avatar"
                  style={{
                    backgroundImage: `url(${
                      userId?.profileImage || profileImg
                    })`,
                  }}
                ></div>
                <div
                  className="mobile-table-item--username"
                  onClick={() => {
                    if (userId?.twitterUsername) {
                      window.open(
                        `https://x.com/${userId.twitterUsername}`,
                        "_blank"
                      );
                    }
                  }}
                >
                  {userId?.twitterUsername || ""}
                </div>
                <div className="mobile-table-item--points">
                  {formatNumber(score || 0)} pts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PGLayout>
  );
};

export default Leaderboard;
