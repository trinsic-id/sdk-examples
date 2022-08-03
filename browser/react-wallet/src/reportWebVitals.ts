import {ReportHandler} from "web-vitals";

export default function reportWebVitals(onPerfEntry: Function | undefined = undefined): void {
  if (onPerfEntry) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry as ReportHandler);
      getFID(onPerfEntry as ReportHandler);
      getFCP(onPerfEntry as ReportHandler);
      getLCP(onPerfEntry as ReportHandler);
      getTTFB(onPerfEntry as ReportHandler);
    });
  }
}