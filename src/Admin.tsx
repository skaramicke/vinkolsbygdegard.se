// Admin.js
import React from "react";
import CMS from "netlify-cms-app";

export default function Admin() {
  CMS.init();
  return <div id="nc-root" />;
}
