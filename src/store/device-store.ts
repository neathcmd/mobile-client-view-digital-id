import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { UAParser } from "ua-parser-js";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

type DeviceInfoType = {
  device_name: string;
  device_type: string;
  os: string;
  ip_address: string;
  browser: string;
  fingerprint: string;
};

type DeviceState = {
  device: DeviceInfoType | null;
  fetchDeviceInfo: () => Promise<void>;
};

export const useDeviceStore = create<DeviceState>()(
  devtools((set) => ({
    device: null,
    fetchDeviceInfo: async () => {
      try {
        const parser = new UAParser();
        const result = parser.getResult();

        // Load FingerprintJS
        const fp = await FingerprintJS.load();
        const fingerPrintResult = await fp.get();

        // Fetch IP
        let ip_address = "unknown";
        try {
          const res = await fetch("https://api.ipify.org?format=json");
          const data = await res.json();
          ip_address = data.ip;
        } catch (ipError) {
          console.error("Failed to fetch IP:", ipError);
        }

        const info: DeviceInfoType = {
          browser: result.browser?.name ?? "unknown",
          os: result.os?.name ?? "unknown",
          device_name: result.device?.vendor ?? "unknown",
          device_type: result.device?.model ?? "unknown",
          fingerprint: fingerPrintResult.visitorId,
          ip_address,
        };

        set({ device: info });
      } catch (error) {
        console.error("Failed to fetch device info:", error);
      }
    },
  }))
);
