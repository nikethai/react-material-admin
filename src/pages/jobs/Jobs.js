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
    ["Student Management System", "Hệ thống quản lý học sinh, sinh viên", "0123456789", "Active"],
    ["Hospital Management System", "Hệ thống quản lý bệnh viện", "0123456789", "Active"],
    ["Hotel Management System", "Hệ thống quản lý khách sạn", "0123456789", "Active"],
    ["Storage Management System", "Hệ thống quản lý kho", "0123456789", "Active"],
    ["Restaurant Management System", "Hệ thống quản lý nhà hàng", "0123456789", "Active"],
    ["Gym Management System", "Hệ thống quản lý phòng gym", "0123456789", "Active"],
    ["Retailer Management System", "Hệ thống quản lý bán lẻ", "0123456789", "Active"],
    ["Parking Lot Management System", "Hệ thống quản lý bãi xe", "0123456789", "Active"],
    ["Bank Management System", "Hệ thống quản lý ngân hàng", "0123456789", "Active"],
    ["Real Estate Management System", "Hệ thống quản lý bất động sản", "0123456789", "Active"],
    ["Apartment Management System", "Hệ thống quản lý căn hộ", "0123456789", "Active"],
    ["Car Rental Management System", "Hệ thống quản lý thuê xe hơi", "0123456789", "Active"],
    ["Motorcycle Management System", "Hệ thống quản lý thuê xe máy", "0123456789", "Active"],
    ["Bike Rental Management System", "Hệ thống quản lý thuê xe đạp", "0123456789", "Active"],
    ["Canteen Management System", "Hệ thống quản lý căn tin", "0123456789", "Active"],
];

const useStyles = makeStyles(theme => ({
    tableOverflow: {
        overflow: 'auto'
    }
}))

export default function Jobs() {
    const classes = useStyles();
    return (
        <>
            <PageTitle title="Quản lý bài đăng" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Danh sách bài đăng"
                        data={datatableData}
                        columns={["Tên", "Miêu tả", "SĐT", "Status"]}
                        options={{
                            filterType: "checkbox",
                            responsive: "stacked",
                            filter: false,
                            download: false,
                            print: false,
                        }}
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
