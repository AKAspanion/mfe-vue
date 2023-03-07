import React from "react";
import { Link } from "react-router-dom";

export function Page1() {
  return (
    <div style={{ padding: 16, background: "#d4f5fe" }}>
      <div>Page 1 from React</div>
      <Link to="/page-2">Go to Page 2</Link>
    </div>
  );
}
