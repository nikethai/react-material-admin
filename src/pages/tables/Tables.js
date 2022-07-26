import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

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

export default function Tables() {
  const classes = useStyles();
  return (
    <>
      <PageTitle title="Quản lý tài khoản" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Danh sách tài khoản"
            data={datatableData}
            options={{
              filterType: "checkbox",
              responsive: "stacked",
              filter: false,
              download: false,
              print: false,
            }}
            columns={["Tên", "Email", "SĐT", "Status"]}
          />
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>*/}
        {/*    <Table data={mock.table} />*/}
        {/*  </Widget>*/}
        {/*</Grid>*/}
      </Grid>
    </>
  );
}
