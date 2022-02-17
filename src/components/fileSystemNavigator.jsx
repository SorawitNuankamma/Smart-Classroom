import * as React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export default function FileSystemNavigator() {
  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <TreeItem nodeId="1" label="เริ่มต้นการใช้งาน">
        <TreeItem nodeId="2" label="การสมัครสมาชิกและการเข้าสู่ระบบ" />
        <TreeItem nodeId="3" label="การสร้างห้องเรียน" />
        <TreeItem nodeId="4" label="การเข้าร่วมห้องเรียน" />
      </TreeItem>
      <TreeItem nodeId="5" label="การจัดการห้องเรียน">
        <TreeItem nodeId="10" label="OSS" />
        <TreeItem nodeId="6" label="MUI">
          <TreeItem nodeId="8" label="index.js" />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
}
