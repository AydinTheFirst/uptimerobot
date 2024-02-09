import { Avatar, Sidebar } from "flowbite-react";
import { FaBell, FaChartPie, FaTv } from "react-icons/fa";

interface SideProps {
  visible: boolean;
}

export const DashboardSide = ({ visible }: SideProps) => {
  return (
    <>
      <Sidebar
        className={`fixed left-0 top-0 z-40 h-full w-[260px] border-e transition-all dark:border-gray-700`}
        style={{ marginLeft: visible ? "0" : "-260px" }}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex">
            <Profile />
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FaChartPie} href="/dashboard">
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item icon={FaTv} href="/dashboard">
              Monitors
            </Sidebar.Item>
            <Sidebar.Item icon={FaBell} href="/dashboard/webhooks">
              Webhooks
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

const Profile = () => {
  const user = {
    displayName: "John Doe",
    email: "",
  };
  return (
    <Avatar rounded>
      <div className="space-y-1 font-medium dark:text-white">
        <div>{user?.displayName}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {user?.email}
        </div>
      </div>
    </Avatar>
  );
};
