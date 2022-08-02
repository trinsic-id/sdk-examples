import {ReportHandler} from "web-vitals";

export default function reportWebVitals(onPerfEntry: Function | undefined = undefined): void {
  if (onPerfEntry) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(<ReportHandler>onPerfEntry);
      getFID(<ReportHandler>onPerfEntry);
      getFCP(<ReportHandler>onPerfEntry);
      getLCP(<ReportHandler>onPerfEntry);
      getTTFB(<ReportHandler>onPerfEntry);
    });
  }
}