import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import { useGetAllAccInfo } from "../../hook/account";

const datatableData = [
  ["Nguyễn Thùy Linh", "linhnt@fpt.edu.vn", "0123456789", "Active"],
  ["Lê Nhật Quang", "quangln@fpt.edu.vn", "0123456789", "Active"],
  ["Phạm Hoàng Minh", "minhph@fpt.edu.vn", "0123456789", "Active"],
  ["Trần Đăng Khoa", "khoatd@fpt.edu.vn", "0123456789", "Active"],
  ["Phạm Văn Linh", "linhpv@fpt.edu.vn", "0123456789", "Active"],
  ["Nguyễn Tuấn Anh", "anhnt@fpt.edu.vn", "0123456789", "Active"],
  ["Vũ Minh Đăng", "dangvm@fpt.edu.vn", "0123456789", "Active"],
  ["Phạm Kiều Trinh", "trinhpk@fpt.edu.vn", "0123456789", "Active"],
  ["Trần Anh Đạt", "datta@fpt.edu.vn", "0123456789", "Active"],
  ["Lý Minh Quang", "quanglm@fpt.edu.vn", "0123456789", "Active"],
  ["Hồ Vĩnh Tuệ", "tuehv@fpt.edu.vn", "0123456789", "Active"],
  ["Đoàn Trúc Mai Linh", "linhdtm@fpt.edu.vn", "0123456789", "Active"],
  ["Phạm Mỹ Linh", "linhpm@fpt.edu.vn", "0123456789", "Active"],
  ["Trần Anh Tài", "taita@fpt.edu.vn", "0123456789", "Active"],
  ["Đoàn Minh Tâm", "tamdm@fpt.edu.vn", "0123456789", "Active"],
];

const useStyles = makeStyles((theme) => ({
  tableOverflow: {
    overflow: "auto",
  },
}));

const columns = [
  {
    name: "fullName",
    label: "Tên",
    options: {},
  },
  {
    name: "role",
    label: "Loại tài khoản",
    options: {
      customBodyRender: (data) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
      }
    },
  },
  {
    name: "phone",
    label: "SĐT",
    options: {},
  },
  {
    name: "email",
    label: "Email",
    options: {},
  },
];

export default function Tables() {
  const classes = useStyles();

  const { data, error, isLoading } = useGetAllAccInfo();

  return (
    <>
      <PageTitle title="Quản lý tài khoản" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          {isLoading && !data ? (
            <CircularProgress />
          ) : (
            <MUIDataTable
              title="Danh sách tài khoản"
              data={data}
              columns={columns}
              options={{
                filterType: "checkbox",
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
