import { FaSearch, FaTrash, FaTv } from "react-icons/fa";
import { Badge, Button, TextInput } from "flowbite-react";
import { Loader } from "@/components/Loader";
import { useHttp } from "@/hooks/http";
import { DashboardLayout } from "./Dashboard";
import { IMonitor } from "@/http/interfaces";
export const MonitorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>
      <div className="row g-5">
        <div className="col-md-4">
          <ListMonitors />
        </div>
        <div className="col-md-8">{children}</div>
      </div>
    </DashboardLayout>
  );
};

const ListMonitors = () => {
  const monitors = useHttp<IMonitor[]>({
    url: "/monitors",
    method: "GET",
    body: null,
  });

  if (monitors.isLoading || !monitors.data) {
    return <Loader />;
  }

  return (
    <>
      <div className="row g-3">
        <div className="col-12 flex justify-between">
          <h3 className="flex items-center gap-1 text-xl font-bold">
            <FaTv className="mr-2" />
            Monitors
          </h3>
          <Button color="green" size={"xs"} pill>
            Add new monitor
          </Button>
        </div>
        <div className="col-12 flex gap-1">
          <TextInput
            type="search"
            icon={FaSearch}
            sizing={"sm"}
            className="w-full"
          />
          <Button color="red" size={"xs"}>
            <FaTrash />
          </Button>
        </div>
        <div className="col-12 rounded bg-gray-900 p-3">
          <div className="flex flex-col gap-3">
            {monitors.data.map((monitor) => (
              <MonitorCard key={monitor.id} data={monitor} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const MonitorCard = ({ data }: { data: IMonitor }) => {
  return (
    <a
      href={`/dashboard/monitors/${data.id}`}
      className="rounded-lg border-b border-gray-500 p-3 hover:bg-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <h5 className="font-bold">{data.name ?? "My Monitor"}</h5>
          <p className="text-sm font-semibold text-green-500">{data.url}</p>
        </div>
        <div>
          <Badge color="green" size="sm">
            {data.type}
          </Badge>
        </div>
      </div>
    </a>
  );
};
