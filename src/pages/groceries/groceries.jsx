import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import GlobalLayout from "../../components/Layouts/GlobalLayout.jsx";
import "./groceries.css";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";

import { Dropdown } from "primereact/dropdown";
import DataViewer from "../../components/dataViewer/dataViewer.jsx";

function Groceries() {
  return (
    <GlobalLayout>
      <DataViewer />
    </GlobalLayout>
  );
}

export default Groceries;
