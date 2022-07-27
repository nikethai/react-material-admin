import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip,
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  PUBLISHED: "Chưa xác nhận",
  ACCEPTED: "Đang thực hiện",
  DONE: "Đã hoàn thành",
  BANNED: "Việc bị khoá",
  REQUEST_FOR_COMPLETE: "Yêu cầu hoàn thành",
};

const toVNeseKey = {
  id: "Mã",
  title: "Tên",
  recruiter: "Nhà tuyển dụng",
  genre: "Loại",
  status: "Trạng thái",
};

export default function JobTableComponent({ data }) {
  const classes = useStyles();

  if (!data) {
    return <></>;
  }
  var keys = Object.keys(data[0]).map((i) => {
    return toVNeseKey[i].toUpperCase() || i.toUpperCase();
  });
  keys.shift(); // delete "id" key

  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {/*{data.map(({ id, name, email, product, price, date, city, status }) => (*/}
        {data.map(({ id, title, recruiter, genre, status }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{title}</TableCell>
            <TableCell className="pl-3 fw-normal">{recruiter}</TableCell>
            <TableCell className="pl-3 fw-normal">{genre}</TableCell>
            <TableCell>
              <Chip
                label={states[status]}
                classes={{ root: classes[states[status]] }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
