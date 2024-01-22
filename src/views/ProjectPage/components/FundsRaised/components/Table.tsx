import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { IconSearch } from "@/assets/icons";

export default function TableRaised() {
    const [filterValue, setFilterValue] = React.useState("");

    const onClear = React.useCallback(()=>{
        setFilterValue("")
      },[])

    const onSearchChange = React.useCallback((value: any) => {
        if (value) {
          setFilterValue(value);
        } else {
          setFilterValue("");
        }
      }, []);

  return (
    <div className="">
    <div className="">
      <Input
      variant="bordered"
      size="sm"
      radius="none" 
        isClearable
        className="w-full"
        placeholder="Search by name..."
        startContent={<IconSearch />}
        value={filterValue}
        onClear={() => onClear()}
        onValueChange={onSearchChange}
      />
    </div>
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader className="text-[#000]">
        <TableColumn>Donor</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Amount</TableColumn>
        <TableColumn>Number</TableColumn>
        <TableColumn>Link</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
  );
}
