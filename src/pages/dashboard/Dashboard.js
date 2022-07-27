import React, { useState } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

// styles
import useStyles from "./styles";
import "./style.css";

// components
import mock from "./mock";
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import JobTableComponent from "./components/Table/JobTable";
import {
  useGetDoneJob,
  useGetJobPerMonth,
  useGetListJob,
  useGetNewestJob,
} from "../../hook/job";
import { useGetRejectedOffers, useGetTotalOffers } from "../../hook/offer";
import { useEffect } from "react";

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");
  const [jobDataToShow, setJobDataToShow] = useState();

  const {
    data: listJobData,
    error: listJobError,
    isLoading: isListJobLoading,
  } = useGetNewestJob();

  const {
    data: doneJobData,
    error: doneJobError,
    isLoading: isDoneJobLoading,
  } = useGetDoneJob();

  const {
    data: jobPerMonthData,
    error: jobPerMonthError,
    isLoading: isJobPerMonthLoading,
  } = useGetJobPerMonth();

  const {
    data: totalOfferData,
    error: totalOfferError,
    isLoading: isTotalOfferLoading,
  } = useGetTotalOffers();

  const {
    data: rejectedOfferData,
    error: rejectedOfferError,
    isLoading: isRejectedOfferLoading,
  } = useGetRejectedOffers();

  useEffect(() => {
    if (listJobData) {
      const showJobList = listJobData.map((j) => ({
        // This is fckin bad, just for quick dev
        // Pls dun do it like this
        id: j.id,
        title: j.title,
        recruiter: j.recruiterName,
        genre: j.genre.genreName,
        status: j.jobStatusEnum,
      }));
      setJobDataToShow(showJobList);
    }
  }, [listJobData]);

  return (
    <>
      <PageTitle title="Dashboard" />

      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Tổng số chào giá"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {!isTotalOfferLoading &&
                      totalOfferData &&
                      totalOfferData.totalOffers}
                  </Typography>
                  lượt
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            headerClass={classes.wrapHeader}
            title="Tổng công việc hoàn thành"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {!isDoneJobLoading &&
                      doneJobData &&
                      doneJobData.totalFinishedJob}
                  </Typography>
                  việc
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Tổng số chào giá bị từ chối"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {!isRejectedOfferLoading &&
                      rejectedOfferData &&
                      rejectedOfferData.totalRejectedOffers}
                  </Typography>
                  chào giá
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Công việc đã đăng tháng này"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Grid container item alignItems={"center"}>
                <Grid item xs={6}>
                  <Typography size="xl" weight="medium" noWrap>
                    {!isJobPerMonthLoading &&
                      jobPerMonthData &&
                      jobPerMonthData.jobsPerMonth}
                  </Typography>
                  việc
                </Grid>
              </Grid>
            </div>
          </Widget>
        </Grid>

        <Grid item xs={12}>
          <Widget
            title="Công việc mới nhất"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <JobTableComponent data={jobDataToShow} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
