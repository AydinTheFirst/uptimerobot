import { useHttp } from "@/hooks/http";
import { MonitorLayout } from "@/layouts/Monitor";
import { useParams } from "react-router-dom";
import { ILog, IMonitor } from "@/http/interfaces";
import { Loader } from "@/components/Loader";
import { Badge, Button, ButtonGroup } from "flowbite-react";
import { FaCopy, FaEdit, FaPause, FaPlay, FaTrash } from "react-icons/fa";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export const ViewMonitor = () => {
  const id = useParams<{ id: string }>().id;

  const { data, isLoading } = useHttp<IMonitor>({
    url: `/monitors/${id}`,
    method: "GET",
    body: null,
  });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <MonitorLayout>
      <div className="row g-3">
        <div className="col-12">
          <h3 className="text-2xl font-bold">{data.name ?? "My Monitor"}</h3>
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-green-500 underline hover:text-green-400"
          >
            {data.url}
          </a>
        </div>
        <div className="col-12">
          <ButtonGroup>
            <Button color="gray" size={"sm"}>
              <FaPause className="mr-2" />
              Pause
            </Button>
            <Button color="gray" size={"sm"}>
              <FaEdit className="mr-2" />
              Edit
            </Button>
            <Button color="gray" size={"sm"}>
              <FaCopy className="mr-2" />
              Clone
            </Button>
            <Button color="red" size={"sm"}>
              <FaTrash className="mr-2" />
              Delete
            </Button>
          </ButtonGroup>
        </div>
        <Chart />
        <Console />
      </div>
    </MonitorLayout>
  );
};

const Chart = () => {
  const id = useParams<{ id: string }>().id;
  const { data, isLoading } = useHttp<ILog[]>({
    url: `/monitors/${id}/logs`,
    method: "GET",
    body: null,
  });

  useEffect(() => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: "line",
      },
      series: [
        {
          name: "Response Time (ms)",
          data:
            data?.map((log) => log.endedAt - log.startedAt).slice(0, 100) ?? [],
        },
      ],
      xaxis: {
        categories:
          data?.map((log) => new Date(log.startedAt).toLocaleString()) ?? [],
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, [data]);

  if (isLoading || !data) {
    return <Loader />;
  }
  return (
    <div className="col-12">
      <div id="chart"></div>
    </div>
  );
};

const Console = () => {
  const id = useParams<{ id: string }>().id;
  const { data, isLoading } = useHttp<ILog[]>({
    url: `/monitors/${id}/logs`,
    method: "GET",
    body: null,
  });

  const logs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logs.current) return;
    console.log(logs.current.scrollHeight);
    logs.current.scroll({
      top: logs.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="col-12">
      <div className="rounded bg-gray-900 p-3">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-lg font-bold">Console</h4>
          <Badge color="red">Offline</Badge>
        </div>
        <br />

        <div ref={logs} className="h-96 overflow-hidden overflow-y-auto">
          {data.map((log) => (
            <>
              <div className="flex items-center justify-between gap-1 font-bold">
                <span>
                  {log.ok ? (
                    <FaPlay className="text-green-500" />
                  ) : (
                    <FaPause className="text-red-500" />
                  )}
                </span>
                <span>{log.id.split("-")[0]}</span>
                <span className="text-yellow-500">{log.status}</span>
                <span className="text-blue-500">
                  Responded in {log.endedAt - log.startedAt}ms
                </span>
              </div>
              <br />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
