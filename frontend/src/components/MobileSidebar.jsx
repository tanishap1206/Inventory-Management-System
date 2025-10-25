// src/components/MobileSidebar.jsx
import React from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ open, onClose, active, onNavigate, role }) {
  return (
    <div className={clsx("fixed inset-0 z-40 lg:hidden", open ? "" : "pointer-events-none")}>
      <div
        className={clsx(
          "absolute inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "absolute left-0 top-0 h-full w-64 transform transition-transform duration-300 ease-out bg-white dark:bg-slate-800 shadow-lg",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
      >
        <Sidebar active={active} onNavigate={onNavigate} role={role} />
      </div>
    </div>
  );
}