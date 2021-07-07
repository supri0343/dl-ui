module.exports = [
    {
        route: "/dashboard-dp/main",
        name: "Dashboard DP - Main",
        moduleId: "./modules/dashboard-dp/main/index",
        nav: true,
        title: "Main",
        auth: true,
        settings: {
          group: "dashboard-dp",
          permission: { C9: 1, B1: 1, B12: 1 },
          iconClass: "fa fa-dashboard",
        },
    },
]