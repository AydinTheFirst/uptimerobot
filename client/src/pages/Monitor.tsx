import { Table } from "flowbite-react";
import { IMonitor } from "@/http/interfaces";
import { useHttp } from "@/hooks/http";
import { DashboardLayout } from "@/layouts/Dashboard";

export const Monitor = () => {
  return (
    <DashboardLayout>
      <TableComponent />
    </DashboardLayout>
  );
};

const TableComponent = () => {
  const { data, error, isLoading } = useHttp<IMonitor[]>({
    url: "/monitors",
    method: "GET",
    body: null,
  });

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHead />
          <Table.Body className="divide-y">
            {isLoading && (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td>Error: {error.message}</td>
              </tr>
            )}
            {data?.map((monitor) => (
              <TableRow key={monitor.id} data={monitor} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

const TableHead = () => {
  return (
    <Table.Head>
      <Table.HeadCell>ID</Table.HeadCell>
      <Table.HeadCell>URL</Table.HeadCell>
      <Table.HeadCell>Method</Table.HeadCell>
      <Table.HeadCell>
        <span className="sr-only">Edit</span>
      </Table.HeadCell>
    </Table.Head>
  );
};

const TableRow = ({ data }: { data: IMonitor }) => {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>{data.id.split("-")[0]}</Table.Cell>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {data.url}
      </Table.Cell>
      <Table.Cell>{data.type}</Table.Cell>
      <Table.Cell>
        <a
          href={`/dashboard/monitors/${data.id}`}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          Edit
        </a>
      </Table.Cell>
    </Table.Row>
  );
};
