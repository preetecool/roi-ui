"use client";
import LineChart from "@/registry/brook/ui/charts/line-chart";
import styles from "./line-chart-demo.module.css";

const data = [
  { date: 1990, value: 27.7, type: "CANADA" },
  { date: 1991, value: 28.0, type: "CANADA" },
  { date: 1992, value: 28.4, type: "CANADA" },
  { date: 1993, value: 28.7, type: "CANADA" },
  { date: 1994, value: 29.0, type: "CANADA" },
  { date: 1995, value: 29.3, type: "CANADA" },
  { date: 1996, value: 29.6, type: "CANADA" },
  { date: 1997, value: 29.9, type: "CANADA" },
  { date: 1998, value: 30.2, type: "CANADA" },
  { date: 1999, value: 30.4, type: "CANADA" },
  { date: 2000, value: 30.7, type: "CANADA" },
  { date: 2001, value: 31.0, type: "CANADA" },
  { date: 2002, value: 31.4, type: "CANADA" },
  { date: 2003, value: 31.6, type: "CANADA" },
  { date: 2004, value: 31.9, type: "CANADA" },
  { date: 2005, value: 32.2, type: "CANADA" },
  { date: 2006, value: 32.6, type: "CANADA" },
  { date: 2007, value: 32.9, type: "CANADA" },
  { date: 2008, value: 33.2, type: "CANADA" },
  { date: 2009, value: 33.6, type: "CANADA" },
  { date: 2010, value: 34.0, type: "CANADA" },
  { date: 2011, value: 34.3, type: "CANADA" },
  { date: 2012, value: 34.7, type: "CANADA" },
  { date: 2013, value: 35.1, type: "CANADA" },
  { date: 2014, value: 35.4, type: "CANADA" },
  { date: 2015, value: 35.7, type: "CANADA" },
  { date: 2016, value: 36.1, type: "CANADA" },
  { date: 2017, value: 36.5, type: "CANADA" },
  { date: 2018, value: 37.0, type: "CANADA" },
  { date: 2019, value: 37.6, type: "CANADA" },
  { date: 2020, value: 38.0, type: "CANADA" },
  { date: 2021, value: 38.2, type: "CANADA" },
  { date: 2022, value: 38.9, type: "CANADA" },
  { date: 2023, value: 39.6, type: "CANADA" },
  { date: 2024, value: 40.0, type: "CANADA" },
  { date: 2025, value: 40.1, type: "CANADA" },

  { date: 1990, value: 57.2, type: "UK" },
  { date: 1991, value: 57.4, type: "UK" },
  { date: 1992, value: 57.6, type: "UK" },
  { date: 1993, value: 57.7, type: "UK" },
  { date: 1994, value: 57.9, type: "UK" },
  { date: 1995, value: 58.0, type: "UK" },
  { date: 1996, value: 58.2, type: "UK" },
  { date: 1997, value: 58.3, type: "UK" },
  { date: 1998, value: 58.5, type: "UK" },
  { date: 1999, value: 58.7, type: "UK" },
  { date: 2000, value: 59.0, type: "UK" },
  { date: 2001, value: 59.1, type: "UK" },
  { date: 2002, value: 59.3, type: "UK" },
  { date: 2003, value: 59.6, type: "UK" },
  { date: 2004, value: 60.0, type: "UK" },
  { date: 2005, value: 60.4, type: "UK" },
  { date: 2006, value: 60.8, type: "UK" },
  { date: 2007, value: 61.3, type: "UK" },
  { date: 2008, value: 61.8, type: "UK" },
  { date: 2009, value: 62.3, type: "UK" },
  { date: 2010, value: 62.8, type: "UK" },
  { date: 2011, value: 63.3, type: "UK" },
  { date: 2012, value: 63.7, type: "UK" },
  { date: 2013, value: 64.1, type: "UK" },
  { date: 2014, value: 64.6, type: "UK" },
  { date: 2015, value: 65.1, type: "UK" },
  { date: 2016, value: 65.6, type: "UK" },
  { date: 2017, value: 66.0, type: "UK" },
  { date: 2018, value: 66.4, type: "UK" },
  { date: 2019, value: 66.8, type: "UK" },
  { date: 2020, value: 67.9, type: "UK" },
  { date: 2021, value: 67.0, type: "UK" },
  { date: 2022, value: 67.5, type: "UK" },
  { date: 2023, value: 68.3, type: "UK" },
  { date: 2024, value: 69.0, type: "UK" },
  { date: 2025, value: 69.8, type: "UK" },
];

export default function LineChartDemo() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Population Growth (1990-2025)</h3>
      <div className={styles.chartContainer}>
        <LineChart
          data={data}
          showXAxis={true}
          showYAxis={true}
          showXGrid={false}
          showPoints={false}
          animated
          ticks={[1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025]}
        />
      </div>
    </div>
  );
}
