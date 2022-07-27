import React, { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import { useGetListJob } from "../../hook/job";

const states = {
  PUBLISHED: "Đã đăng việc",
  ACCEPTED: "Đang thực hiện",
  DONE: "Đã hoàn thành",
  BANNED: "Việc bị khoá",
  REQUEST_FOR_COMPLETE: "Yêu cầu hoàn thành",
};

const columns = [
  {
    name: "title",
    label: "Tên",
    options: {},
  },
  {
    name: "recruiter",
    label: "Nhà tuyển dụng",
    options: {},
  },
  {
    name: "genre",
    label: "Loại",
    options: {},
  },
  {
    name: "status",
    label: "Trạng thái",
    options: {
      customBodyRender: (data) => {
        return states[data];
      },
    },
  },
];

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

export default function Jobs() {
  const classes = useStyles();
  const [jobDataToShow, setJobDataToShow] = useState();

  const { data, error, isLoading } = useGetListJob();

  useEffect(() => {
    if (data) {
      const showJobList = data.data.map((j) => ({
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
  }, [data]);

  return (
    <>
      <PageTitle title="Quản lý bài đăng" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading && !data ? (
            <CircularProgress color="secondary" />
          ) : (
            <MUIDataTable
              title="Danh sách bài đăng"
              data={jobDataToShow}
              columns={columns}
              options={{
                count: data.totalCount,
                page: data.pageNo,
                rowsPerPage: data.pageSize,
                rowsPerPageOptions: [],
                filterType: "checkbox",
                serverSide: true,
                responsive: "stacked",
                filter: false,
                selectableRows: false,
                download: false,
                print: false,
              }}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
