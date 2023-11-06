module.exports = [
  {
    route: "/customs/monitoring-in",
    name: "customs-report-in",
    moduleId: "./modules/customs/monitoring-in/index",
    nav: true,
    title: "Laporan Pemasukan",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T1: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-expenditure-good",
    name: "customs-report-expenditure-good",
    moduleId: "./modules/customs/monitoring-barang-jadi/index",
    nav: true,
    title: "Laporan Pengeluaran Barang Jadi",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1  },
      permission: { T2: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-out",
    name: "customs-report-out",
    moduleId: "./modules/customs/monitoring-out/index",
    nav: true,
    title: "Laporan Pengeluaran",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1  },
      permission: { T3: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/traceable-in",
    name: "customs-report-in",
    moduleId: "./modules/customs/traceable-in/index",
    nav: true,
    title: "Laporan Traceable Masuk",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T4: 1 },
      iconClass: "fa fa-dashboard",
    },
  },

  {
    route: "/customs/traceable-out",
    name: "customs-report-out",
    moduleId: "./modules/customs/traceable-out/index",
    nav: true,
    title: "Laporan Traceable Keluar",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T5: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/wip",
    name: "customs-report-in",
    moduleId: "./modules/customs/laporan-wip-position/index",
    nav: true,
    title: "Laporan Posisi WIP",
    auth: true,
    settings: {
      group: "customs",
      // permission : {"C9": 1,"B6": 1,"B1": 1},
      permission: { T6: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/bc-23",
    name: "bc-23",
    moduleId: "./modules/customs/laporan-bc-23/index",
    nav: true,
    title: "Laporan BC 23",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T7: 1 },
      iconClass: "fa fa-dashboard",
    },
  },

  {
    route: "/customs/beacukai_temp",
    name: "customs-beacukaitemp",
    moduleId: "./modules/customs-report/beacukai_temp/index",
    nav: true,
    title: "Posting BC-23 dan BC-27",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"PG": 1,"B1": 1 },
      permission: { T8: 1 },
      iconClass: "fa fa-dashboard",
    },
  },

  {
    route: "/customs/posting-BC-ceisa",
    name: "customs-posting-BC-Ceisa",
    moduleId: "./modules/customs-report/posting-BC-ceisa/index",
    nav: true,
    title: "Posting BC dari Ceisa",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"PG": 1,"B1": 1 },
      permission: { T19: 1 },
      iconClass: "fa fa-dashboard",
    },
  },

  {
    route: "/customs/realization-bom",
    name: "monitoring-realization-bom",
    moduleId: "./modules/customs/realization_bom/index",
    nav: true,
    title: "Laporan Monitoring BOM (Bill of Material)",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T9: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pemasukan-tc-kecil",
    name: "monitoring-pemasukan-tc-kecil",
    moduleId: "./modules/customs/tc-kecil-in/index",
    nav: true,
    title: "Laporan Monitoring Pemasukan Aval TC Kecil",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T10: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pengeluaran-tc-kecil",
    name: "monitoring-pengeluaran-tc-kecil",
    moduleId: "./modules/customs/tc-kecil-out/index",
    nav: true,
    title: "Laporan Monitoring Pengeluaran Aval TC Kecil",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1 },
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T11: 1 },
      iconClass: "fa fa-dashboard",
    },
  },

  {
    route: "/customs/pemasukan-sampah-sapuan",
    name: "monitoring-pemasukan-sampah-sapuan",
    moduleId: "./modules/customs/sapuan-in/index",
    nav: true,
    title: "Laporan Monitoring Pemasukan Aval Sampah Sapuan",
    auth: true,
    settings: {
      group: "customs",
      // permission: { "C9": 1,"PG": 1,"B1": 1 ,"C2A":1 },
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T12: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pengeluaran-sampah-sapuan",
    name: "monitoring-pengeluaran-sampah-sapuan",
    moduleId: "./modules/customs/sapuan-out/index",
    nav: true,
    title: "Laporan Monitoring Pengeluaran Aval Sampah Sapuan",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      // permission: { "C9": 1,"B6": 1,"B1": 1 },
      permission: { T13: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pemasukan-aval-besar",
    name: "monitoring-pemasukan-aval-besar",
    moduleId: "./modules/customs/aval-besar-in/index",
    nav: true,
    title: "Laporan Monitoring Pemasukan Aval Besar",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T14: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pengeluaran-aval-besar",
    name: "monitoring-pengeluaran-aval-besar",
    moduleId: "./modules/customs/aval-besar-out/index",
    nav: true,
    title: "Laporan Monitoring Pengeluaran Aval Besar",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T15: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pemasukan-aval-komponen",
    name: "monitoring-pemasukan-aval-komponen",
    moduleId: "./modules/customs/aval-komponen-in/index",
    nav: true,
    title: "Laporan Monitoring Pemasukan Aval Komponen",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T16: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/pengeluaran-aval-komponen",
    name: "monitoring-pengeluaran-aval-komponen",
    moduleId: "./modules/customs/aval-komponen-out/index",
    nav: true,
    title: "Laporan Monitoring Pengeluaran Aval Komponen",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T17: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/motitoring_tracebleIn-BUM",
    name: "motitoring_tracebleIn-BUM",
    moduleId: "./modules/customs/motitoring_tracebleIn-BUM/index",
    nav: true,
    title: "Monitoring Penggunaan BUM",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T18: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-production/monitoring-cutting",
    name: "monitoring-production/monitoring-cutting",
    moduleId:
      "./modules/customs/monitoring-production/monitoring-cutting/index",
    nav: true,
    title: "Monitoring Cutting Out",
    auth: true,
    settings: {
      group: "customs",
      subGroup: "Monitoring Produksi",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T20: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-production/monitoring-loading",
    name: "monitoring-production/monitoring-loading",
    moduleId:
      "./modules/customs/monitoring-production/monitoring-loading/index",
    nav: true,
    title: "Monitoring Loading",
    auth: true,
    settings: {
      group: "customs",
      subGroup: "Monitoring Produksi",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T21: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-production/monitoring-sewing",
    name: "monitoring-production/monitoring-sewing",
    moduleId: "./modules/customs/monitoring-production/monitoring-sewing/index",
    nav: true,
    title: "Monitoring Sewing Out",
    auth: true,
    settings: {
      group: "customs",
      subGroup: "Monitoring Produksi",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T22: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-production/monitoring-finishing",
    name: "monitoring-production/monitoring-finishing",
    moduleId:
      "./modules/customs/monitoring-production/monitoring-finishing/index",
    nav: true,
    title: "Monitoring Finishing Out",
    auth: true,
    settings: {
      group: "customs",
      subGroup: "Monitoring Produksi",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T23: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/monitoring-production/monitoring-expenditure-good",
    name: "monitoring-production/monitoring-expenditure-good",
    moduleId:
      "./modules/customs/monitoring-production/monitoring-expenditure-good/index",
    nav: true,
    title: "Monitoring Barang Jadi",
    auth: true,
    settings: {
      group: "customs",
      subGroup: "Monitoring Produksi",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T24: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/log-histories",
    name: "log-histories",
    moduleId: "./modules/customs/log-histories/index",
    nav: true,
    title: "Log History",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T25: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/log-histories-dms",
    name: "log-histories-dms",
    moduleId: "./modules/customs/log-histories-dms/index",
    nav: true,
    title: "Log History DMS",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T26: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/customs/unpost-bc",
    name: "unpost-bc",
    moduleId: "./modules/customs/unpost-bc/index",
    nav: true,
    title: "Unpost Data TPB/PEB",
    auth: true,
    settings: {
      group: "customs",
      // permission: {  "C9": 1,"PG": 1,"B1": 1 ,"C2A":1},
      permission: { T27: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
