import React from "react";
import { Link } from "react-router-dom";

export function Page2() {
  return (
    <div style={{ padding: 16, background: "#aeecfd" }}>
      <div>Page 2 from React</div>
      <Link to="/page-1">Go to Page 1</Link>
    </div>
  );
}
