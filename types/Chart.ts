interface ReportChartProps {
  chartData: any;
  chartConfig: {
    [key: string]: {
      label: string;
      color: string;
    };
  };
}