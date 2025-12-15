(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/trading/frontend/src/components/PriceChart.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PriceChart",
    ()=>PriceChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/chart.js/dist/chart.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/react-chartjs-2/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chartjs$2d$plugin$2d$zoom$2f$dist$2f$chartjs$2d$plugin$2d$zoom$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/trading/frontend/node_modules/chartjs-plugin-zoom/dist/chartjs-plugin-zoom.esm.js [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Title"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Filler"], __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$chartjs$2d$plugin$2d$zoom$2f$dist$2f$chartjs$2d$plugin$2d$zoom$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const PriceChart = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(19);
    if ($[0] !== "7963860edb02b36f6dfdee9a36117b5c42828f3a421609661ba3dabcce465532") {
        for(let $i = 0; $i < 19; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7963860edb02b36f6dfdee9a36117b5c42828f3a421609661ba3dabcce465532";
    }
    const { data } = t0;
    let t1;
    bb0: {
        if (!data) {
            let t2;
            if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
                t2 = {
                    labels: [],
                    datasets: []
                };
                $[1] = t2;
            } else {
                t2 = $[1];
            }
            t1 = t2;
            break bb0;
        }
        let prices;
        let t2;
        if ($[2] !== data) {
            const labels = data.map(_temp);
            prices = data.map(_temp2);
            t2 = [
                ...labels,
                ...Array(15).fill("")
            ];
            $[2] = data;
            $[3] = prices;
            $[4] = t2;
        } else {
            prices = $[3];
            t2 = $[4];
        }
        const paddedLabels = t2;
        let t3;
        if ($[5] !== prices) {
            t3 = [
                {
                    label: "Price",
                    data: prices,
                    borderColor: "#4f46e5",
                    backgroundColor: _temp3,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    fill: true,
                    tension: 0.1,
                    spanGaps: false
                }
            ];
            $[5] = prices;
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        let t4;
        if ($[7] !== paddedLabels || $[8] !== t3) {
            t4 = {
                labels: paddedLabels,
                datasets: t3
            };
            $[7] = paddedLabels;
            $[8] = t3;
            $[9] = t4;
        } else {
            t4 = $[9];
        }
        t1 = t4;
    }
    const chartData = t1;
    let t2;
    let t3;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            duration: 1000,
            easing: "linear"
        };
        t3 = {
            display: false
        };
        $[10] = t2;
        $[11] = t3;
    } else {
        t2 = $[10];
        t3 = $[11];
    }
    let t4;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            grid: t3,
            ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 6,
                color: "#94a3b8",
                font: {
                    size: 11
                }
            },
            border: {
                display: false
            }
        };
        $[12] = t4;
    } else {
        t4 = $[12];
    }
    let t5;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            color: "#f1f5f9"
        };
        $[13] = t5;
    } else {
        t5 = $[13];
    }
    let t6;
    let t7;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            x: t4,
            y: {
                position: "right",
                grid: t5,
                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 11
                    },
                    callback: _temp4
                },
                border: {
                    display: false
                }
            }
        };
        t7 = {
            display: false
        };
        $[14] = t6;
        $[15] = t7;
    } else {
        t6 = $[14];
        t7 = $[15];
    }
    let t8;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            responsive: true,
            maintainAspectRatio: false,
            animation: t2,
            scales: t6,
            plugins: {
                legend: t7,
                tooltip: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    titleColor: "#0f172a",
                    bodyColor: "#334155",
                    borderColor: "#e2e8f0",
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: _temp5,
                        title: _temp6
                    },
                    titleFont: {
                        size: 13,
                        weight: "bold"
                    },
                    bodyFont: {
                        size: 12
                    }
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: "x"
                    },
                    pan: {
                        enabled: true,
                        mode: "x"
                    }
                }
            },
            interaction: {
                mode: "nearest",
                axis: "x",
                intersect: false
            }
        };
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    const options = t8;
    let t9;
    if ($[17] !== chartData) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-[500px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-full w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$trading$2f$frontend$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Line"], {
                    data: chartData,
                    options: options
                }, void 0, false, {
                    fileName: "[project]/trading/frontend/src/components/PriceChart.jsx",
                    lineNumber: 219,
                    columnNumber: 134
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/trading/frontend/src/components/PriceChart.jsx",
                lineNumber: 219,
                columnNumber: 103
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/trading/frontend/src/components/PriceChart.jsx",
            lineNumber: 219,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[17] = chartData;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    return t9;
};
_c = PriceChart;
function _temp(d) {
    const date = new Date(d.time * 1000);
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function _temp2(d_0) {
    return d_0.close;
}
function _temp3(context) {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(79, 70, 229, 0.2)");
    gradient.addColorStop(1, "rgba(79, 70, 229, 0)");
    return gradient;
}
function _temp4(value) {
    return `$${value.toFixed(2)}`;
}
function _temp5(context_0) {
    return `$${context_0.parsed.y.toFixed(2)}`;
}
function _temp6(context_1) {
    return context_1[0].label;
}
var _c;
__turbopack_context__.k.register(_c, "PriceChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/trading/frontend/src/components/PriceChart.jsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/trading/frontend/src/components/PriceChart.jsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=trading_frontend_src_components_PriceChart_jsx_bb1b6a39._.js.map