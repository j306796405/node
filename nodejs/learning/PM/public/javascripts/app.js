var app = {
    models: {},
    collections: {},
    views: {},
    routers: {},
    tpl: {
        public: ['header'],
        list: ['list','listData'],
        create: ['create','upload','uploadCreateData','uploadEditData'],
        detail: ['detail','upload','uploadCreateData','uploadEditData']
    },
    tplCached: {},
    pagesHeader: {
        list: { btnTxt:'添加项目' , txtLink: '#list', btnLink: '#create', ico:'ico-plus' , pageTitle:'项目列表页' },
        detail: { btnTxt:'添加项目' , txtLink: '#list', btnLink: '#create', ico:'ico-plus' , pageTitle:'项目列表页' },
        create: { btnTxt:'添加项目' , txtLink: '#list', btnLink: '#create', ico:'ico-plus' , pageTitle:'项目列表页' }
    },
    proTypeIcon: {
        '变更': 'images/update.png',
        '项目': 'images/project.png',
        '团队': 'images/team.png'
    }
}
