const menuList = [
    {
        title: 'Home', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
    },
    {
        title: 'Products',
        key: '/products',
        icon: 'appstore',
        children: [
            // 子菜单列表
            {
                title: 'Categories',
                key: '/category',
                icon: 'bars',
            },
            {
                title: 'Product',
                key: '/product',
                icon: 'tool',
            },
        ],
    },
    {
        title: 'User',
        key: '/user',
        icon: 'user',
    },
    {
        title: 'Role',
        key: '/role',
        icon: 'safety',
    },
    {
        title: 'Charts',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: 'Bar Chart',
                key: '/charts/bar',
                icon: 'bar-chart',
            },
            {
                title: 'Line Chart',
                key: '/charts/line',
                icon: 'line-chart',
            },
            {
                title: 'Pie Chart',
                key: '/charts/pie',
                icon: 'pie-chart',
            },
        ],
    },
];

export default menuList;
