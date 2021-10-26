export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Asosiy panel',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Yangiliklar']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Yangilik',
        route: '/news',
        icon: 'cil-globe-alt',
        items: [
          {
            name: 'Yangiliklar',
            to: '/news/newslist'
          },
          // {
          //   name: 'Kategoriyalar',
          //   to: '/news/category'
          // },
          {
            name: 'Teglar',
            to: '/news/tags'
          },
          // {
          //   name: 'Taklif qilingan yangiliklar',
          //   to: '/news/recommended-posts'
          // },
          // {
          //   name: 'Yangiliklar ko\'rinish soni',
          //   to: '/news/post-views'
          // }, 
          {
            name: 'Slayder',
            to: '/news/slider'
          },
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Xodimlar']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Xodim',
        route: '/members',
        icon: 'cil-pencil',
        items: [
          {
            name: 'Xodimlar',
            to: '/members/memberslist'
          },
          {
            name: 'Ish turlari',
            to: '/members/job-types'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Reklamalar',
        to: '/ads',
        icon: 'cil-spreadsheet',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Gazeta to\'lovi',
        to: '/payment',
        icon: 'cil-spreadsheet',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Murojaatlar',
        to: '/contactus',
        icon: 'cil-contact',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Gazetalar',
        to: '/gazeta',
        icon: 'cil-newspaper',
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Foydalanuvchilar',
        to: '/users',
        icon: 'cil-user',
      },
    ]
  }
]