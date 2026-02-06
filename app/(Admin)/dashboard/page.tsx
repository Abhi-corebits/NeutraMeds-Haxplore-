"use client";

import MapView from "@/components/Mapview/mapview";
import { useState } from "react";

// ─── INLINE SVG ICON ────────────────────────────────────────────
// Single reusable component. Every icon is just a `d` path string — no packages.
function Icon({ d, size = 18, color = "currentColor" }: { d: string; size?: number; color?: string }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
        >
            <path d={d} />
        </svg>
    );
}

// ─── PATH DATA FOR EVERY ICON USED ─────────────────────────────
const P = {
    dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 21a2 2 0 0 1-3.46 0",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2zM9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87zM16 3.13a4 4 0 0 1 0 7.75",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    barChart: "M18 20V10zM12 20V4zM6 20v-6z",
    fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6zM16 13H8zM16 17H8zM10 9H8z",
    logOut: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4zM16 17l5-5-5-5zM21 12H9z",
    menu: "M3 12h18zM3 6h18zM3 18h18z",
    chevRight: "M9 18l6-6-6-6z",
};

// ─── NAV ITEMS ──────────────────────────────────────────────────
const navItems: { path: keyof typeof P; label: string; id: string }[] = [
    { path: "dashboard", label: "Dashboard", id: "dashboard" },
    { path: "map", label: "Map", id: "map" },
    { path: "users", label: "Users", id: "users" },
    { path: "barChart", label: "Analytics", id: "analytics" },
    { path: "fileText", label: "Reports", id: "reports" },
    { path: "bell", label: "Notifications", id: "notifications" },
    { path: "settings", label: "Settings", id: "settings" },
];

// ─── NOTIFICATION DATA ──────────────────────────────────────────
const notifications = [
    { type: "alert", text: "New user registration from Mumbai — ID #4821" },
    { type: "info", text: "Server CPU usage crossed 78% threshold" },
    { type: "success", text: "Batch export completed successfully — 2,340 records" },
    { type: "alert", text: "Payment gateway timeout detected at 14:32 IST" },
    { type: "info", text: "Scheduled maintenance window starts in 2 hours" },
    { type: "success", text: "API response time back to normal — avg 120ms" },
    { type: "alert", text: "Unusual login attempt flagged — Account #9901" },
];

const dotColor: Record<string, string> = { alert: "#f59e0b", info: "#60a5fa", success: "#34d399" };

// ─── DASHBOARD STAT CARDS ──────────────────────────────────────
const cards = [
    { title: "Total Users" },
    { title: "Active Sessions" },
    { title: "Revenue Today" },
    { title: "Pending Tasks" },
];

// ─────────────────────────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────────────────────────
function Sidebar({ collapsed, active, setActive, onToggle }: {
    collapsed: boolean;
    active: string;
    setActive: (id: string) => void;
    onToggle: () => void;
}) {
    return (
        <aside style={{
            width: collapsed ? 72 : 180,
            minHeight: "100vh",
            background: "#0f172a",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.25s ease",
            zIndex: 10,
            flexShrink: 0,
            borderRight: "1px solid #1e293b",
        }}>

            {/* Logo + toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 18px", borderBottom: "1px solid #1e293b" }}>
                <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                    <Icon d={P.dashboard} size={18} color="#fff" />
                </div>

                {!collapsed && <span style={{ fontSize: 17, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>Admin</span>}

                <button onClick={onToggle} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
                    <Icon d={collapsed ? P.chevRight : P.menu} size={18} color="#64748b" />
                </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
                {navItems.map((item) => {
                    const active_ = active === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActive(item.id)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "10px 12px", borderRadius: 8, border: "none",
                                background: active_ ? "rgba(99,102,241,0.15)" : "transparent",
                                color: active_ ? "#a5b4fc" : "#94a3b8",
                                cursor: "pointer", fontSize: 14,
                                fontWeight: active_ ? 600 : 400,
                                transition: "background 0.15s",
                                width: "100%", textAlign: "left",
                            }}
                            onMouseEnter={(e) => { if (!active_) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                            onMouseLeave={(e) => { if (!active_) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                        >
                            <Icon d={P[item.path]} size={18} color={active_ ? "#a5b4fc" : "#94a3b8"} />
                            {!collapsed && <span>{item.label}</span>}
                        </button>
                    );
                })}
            </nav>

            {/* Logout */}
            <div style={{ padding: "12px 10px", borderTop: "1px solid #1e293b" }}>
                <button style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 12px", borderRadius: 8, border: "none",
                    background: "transparent", color: "#64748b",
                    cursor: "pointer", fontSize: 14, width: "100%",
                }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#f87171"}
                    onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#64748b"}
                >
                    <Icon d={P.logOut} size={18} color="currentColor" />
                    {!collapsed && <span>Log Out</span>}
                </button>
            </div>
        </aside>
    );
}

// ─────────────────────────────────────────────────────────────────
//  NOTIFICATION TICKER
// ─────────────────────────────────────────────────────────────────
// function Ticker() {
//     return (
//         <div style={{
//             width: "100%", background: "#1e293b",
//             borderBottom: "1px solid #334155",
//             padding: "9px 24px",
//             display: "flex", alignItems: "center", gap: 12,
//             overflow: "hidden", whiteSpace: "nowrap", flexShrink: 0,
//         }}>
//             <Icon d={P.bell} size={15} color="#60a5fa" />
//             <div style={{ overflow: "hidden", flex: 1 }}>
//                 <div style={{ display: "inline-flex", gap: 48, animation: "ticker 30s linear infinite" }}>
//                     {[...notifications, ...notifications].map((n, i) => (
//                         <span key={i} style={{ fontSize: 13, color: "#cbd5e1", display: "inline-flex", alignItems: "center", gap: 8 }}>
//                             <span style={{ width: 7, height: 7, borderRadius: "50%", background: dotColor[n.type], display: "inline-block", flexShrink: 0 }} />
//                             {n.text}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// ─────────────────────────────────────────────────────────────────
//  MAP PLACEHOLDER
// ─────────────────────────────────────────────────────────────────
function MapPlaceholder() {
    return (
        <div style={{
            minHeight: 340, background: "#1a1f2e", borderRadius: 12,
            border: "1px solid #334155", position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
        }}>
            {/* grid lines */}
            {/* <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}>
                <defs>
                    
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg> */}

            {/* badge */}
            {/* <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: "rgba(99,102,241,0.12)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <Icon d={P.map} size={24} color="#6366f1" />
                </div>
                <span style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}>Google Maps API</span>
                <span style={{ color: "#475569", fontSize: 12 }}>Replace with your &lt;GoogleMap /&gt; component</span>
            </div> */}
                {/* Overlay text */}
            <div
                className="
    absolute bottom-4 left-1/2 w-[150px] h-[30px] justify-center -translate-x-1/2 z-10
    flex items-center gap-2
    px-5 py-2.5 rounded-xl
    bg-[#0f172a]/70 backdrop-blur-lg backdrop-saturate-150
    border border-white/10
    shadow-[0_8px_30px_rgb(0,0,0,0.35)]
    text-blue-300
    pointer-events-none
  "
            >
                <Icon d={P.map} size={20} color="#60a5fa" />
                <span className="text-sm font-semibold tracking-wide">
                    Open Maps
                </span>
            </div>

            <MapView selectedDate="2026-1-23" />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
//  DASHBOARD SKELETON
// ─────────────────────────────────────────────────────────────────
function DashboardSkeleton() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
                {cards.map((c, i) => (
                    <div key={i} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: "18px 20px" }}>
                        <p style={{ margin: 0, color: "#64748b", fontSize: 13, fontWeight: 500 }}>{c.title}</p>
                        <p style={{ margin: "6px 0 0", color: "#f1f5f9", fontSize: 24, fontWeight: 700 }}>—</p>
                        <p style={{ margin: "4px 0 0", color: "#475569", fontSize: 12 }}>placeholder</p>
                    </div>
                ))}
            </div>

            {/* chart + activity */}
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16 }}>
                {/* chart box */}
                <div style={{
                    background: "#1e293b", border: "1px solid #334155", borderRadius: 12,
                    padding: 20, minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "space-between",
                }}>
                    <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>Chart / Graph</span>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={P.barChart} size={36} color="#334155" />
                    </div>
                </div>

                {/* recent activity */}
                <div style={{
                    background: "#1e293b", border: "1px solid #334155", borderRadius: 12,
                    padding: 20, minHeight: 200, display: "flex", flexDirection: "column", gap: 14,
                }}>
                    <span style={{ color: "#94a3b8", fontSize: 14, fontWeight: 600 }}>Recent Activity</span>
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#334155", flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ width: "60%", height: 10, borderRadius: 5, background: "#334155" }} />
                                <div style={{ width: "35%", height: 8, borderRadius: 4, background: "#253044", marginTop: 5 }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeNav, setActiveNav] = useState("dashboard");
    
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

            <div style={{
                display: "flex", height: "100vh",
                fontFamily: "'DM Sans', sans-serif",
                background: "#0f172a", color: "#e2e8f0", overflow: "hidden",
            }}>

                <Sidebar collapsed={collapsed} active={activeNav} setActive={setActiveNav} onToggle={() => setCollapsed(c => !c)} />

                {/* Right column */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                    {/* header */}
                    <header style={{
                        background: "#0f172a", borderBottom: "1px solid #1e293b",
                        padding: "12px 24px", display: "flex", alignItems: "center",
                        justifyContent: "space-between", flexShrink: 0,
                    }}>
                        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", letterSpacing: "-0.5px" }}>Admin Panel</h1>
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <span style={{ fontSize: 13, color: "#64748b" }}>Welcome back, Admin</span>
                            <div style={{
                                width: 34, height: 34, borderRadius: "50%",
                                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 14, fontWeight: 700, color: "#fff",
                            }}>A</div>
                        </div>
                    </header>

                    {/* ticker */}
                    {/* <Ticker /> */}

                    {/* scrollable body */}
                    <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
                        <MapPlaceholder />

                        {/* divider label */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ flex: 1, height: 1, background: "#334155" }} />
                            <span style={{ fontSize: 12, color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Dashboard</span>
                            <div style={{ flex: 1, height: 1, background: "#334155" }} />
                        </div>

                        <DashboardSkeleton />
                    </div>
                </div>
            </div>
        </>
    );
}