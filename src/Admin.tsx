// Admin.tsx
import React from "react";
import CMS from "decap-cms-app";

export default function Admin() {
  CMS.init();
  return <div id="nc-root" />;
}
