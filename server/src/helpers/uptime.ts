import { logModel } from "@/mongodb/log";
import { IMonitor, monitorModel } from "@/mongodb/monitor";
import axios, { AxiosResponse } from "axios";
import { uuid } from "./utils";
import chalk from "chalk";

const defaults = {
  timeout: 5000,
  interval: 5000,
  method: "GET",
  type: "http",
};

const http = axios.create({
  timeout: defaults.timeout,
  method: defaults.method,
  validateStatus: () => true,
});

export class Uptime {
  cache: Map<string, IMonitor>;
  constructor() {
    this.cache = new Map();
  }

  async ping(url: string) {
    const monitor = this.cache.get(url);
    if (!monitor) return;

    console.log(
      chalk.yellow(
        `Pinging ${monitor.url} every ${this.msToMinutes(
          monitor.interval / (1000 * 60)
        )} minutes.`
      )
    );

    const startedAt = Date.now();

    try {
      const res = await http({
        url: monitor.url,
        method: monitor.method,
        timeout: monitor.timeout * 1000 || defaults.timeout,
      });

      await this.log(monitor.id, startedAt, res);
    } catch (error: any) {
      console.error(error);
      const response = error.response || {
        status: 500,
        statusText: "Internal Server Error",
      };

      await this.log(monitor.id, startedAt, response);
    }
  }

  log = async (
    monitorId: string,
    startedAt: number,
    res: AxiosResponse<any, any>
  ) => {
    console.log(monitorId, "pinged.");
    const log = await logModel.create({
      id: uuid(),
      monitorId,
      ok: res.status < 400,
      statusText: res.statusText,
      status: res.status,
      startedAt,
      endedAt: Date.now(),
      headers: JSON.stringify(res.headers) || "{}",
    });

    return log;
  };

  async start() {
    const monitors = await monitorModel.find();
    monitors.forEach((monitor) => {
      this.cache.set(monitor.url, monitor);
      console.log(monitor.interval);

      setInterval(
        () => this.ping(monitor.url),
        this.msToMinutes(monitor.interval)
      );

      this.ping(monitor.url);
    });
  }

  addMonitor(monitor: IMonitor) {
    this.cache.set(monitor.url, monitor);
    setInterval(
      () => this.ping(monitor.url),
      this.msToMinutes(monitor.interval)
    );
  }

  removeMonitor(url: string) {
    this.cache.delete(url);
  }

  msToMinutes(ms: number) {
    return ms * 1000 * 60;
  }
}

export const uptime = new Uptime();
