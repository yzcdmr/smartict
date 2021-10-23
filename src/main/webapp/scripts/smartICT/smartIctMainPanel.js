function CntSmartIctMainPanel() {
    this.scope = null;
    this.controller = true;
    this.view = new ViewSmartIctMainPanel();
    this.cntStationFormPanel = new CntStationFormPanel().init();
    this.cntStationGridPanel = new CntStationGridPanel().init();

    this.cntRouteFormPanel = new CntRouteFormPanel().init();
    this.cntRouteGridPanel = new CntRouteGridPanel().init();

    this.cntVehicleFormPanel = new CntVehicleFormPanel().init();
    this.cntVehicleGridPanel = new CntVehicleGridPanel().init();

    this.cntRouteStationFormPanel = new CntRouteStationFormPanel().init();
    this.cntRouteStationGridPanel = new CntRouteStationGridPanel().init();

    this.cntRouteVehicleFormPanel = new CntRouteVehicleFormPanel().init();
    this.cntRouteVehicleGridPanel = new CntRouteVehicleGridPanel().init();

    this.cntSmartIctTabPanel = new CntSmartIctTabPanel().init();
}

CntSmartIctMainPanel.prototype = {
    init: function () {
        this.setScope();
        this.setHandlers();
        this.setListeners();
        this.setViewConfig();

        return this;
    },

    setScope: function () {
        this.scope = this;
    },

    setViewConfig: function () {
        var view = this.getView();
        var viewTab = this.getViewSmartIctTabPanel();
        var viewStationFormPanel = this.getViewStationFormPanel();
        var viewStationGridPanel = this.getViewStationGridPanel();
        var viewRouteFormPanel = this.getViewRouteFormPanel();
        var viewRouteGridPanel = this.getViewRouteGridPanel();
        var viewVehicleFormPanel = this.getViewVehicleFormPanel();
        var viewVehicleGridPanel = this.getViewVehicleGridPanel();
        var viewRouteStationFormPanel = this.getViewRouteStationFormPanel();
        var viewRouteStationGridPanel = this.getViewRouteStationGridPanel();
        var viewRouteVehicleFormPanel = this.getViewRouteVehicleFormPanel();
        var viewRouteVehicleGridPanel = this.getViewRouteVehicleGridPanel();

        viewTab.add({
            title: 'Station',
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch'
            },
            items: [
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .2,
                    items: [viewStationFormPanel]
                },
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .8,
                    items: [viewStationGridPanel]
                }
            ]
        }, {
            title: 'Route',
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch'
            },
            items: [
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .2,
                    items: [viewRouteFormPanel]
                },
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .8,
                    items: [viewRouteGridPanel]
                }
            ]
        }, {
            title: 'Route Station',
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch'
            },
            items: [
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .2,
                    items: [viewRouteStationFormPanel]
                },
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .8,
                    items: [viewRouteStationGridPanel]
                }
            ]
        }, {
            title: 'Vehicle',
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch',
            },
            items: [
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .2,
                    items: [viewVehicleFormPanel]
                },
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .8,
                    items: [viewVehicleGridPanel]
                }
            ]
        }, {
            title: 'Route Vehicle',
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch'
            },
            items: [
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .2,
                    items: [viewRouteVehicleFormPanel]
                },
                {
                    layout: 'fit',
                    layoutConfig: {
                        align: 'stretch'
                    },
                    flex: .8,
                    items: [viewRouteVehicleGridPanel]
                }
            ]
        });

        view.add(viewTab);

    },

    getScope: function () {
        if (this.scope == null)
            this.setScope();

        return this.scope;
    },

    getViewStationFormPanel: function () {
        return this.cntStationFormPanel.getView();
    },

    getViewStationGridPanel: function () {
        return this.cntStationGridPanel.getView();
    },

    getViewRouteFormPanel: function () {
        return this.cntRouteFormPanel.getView();
    },

    getViewRouteGridPanel: function () {
        return this.cntRouteGridPanel.getView();
    },

    getViewVehicleFormPanel: function () {
        return this.cntVehicleFormPanel.getView();
    },

    getViewVehicleGridPanel: function () {
        return this.cntVehicleGridPanel.getView();
    },

    getViewRouteStationFormPanel: function () {
        return this.cntRouteStationFormPanel.getView();
    },

    getViewRouteStationGridPanel: function () {
        return this.cntRouteStationGridPanel.getView();
    },

    getViewRouteVehicleFormPanel: function () {
        return this.cntRouteVehicleFormPanel.getView();
    },

    getViewRouteVehicleGridPanel: function () {
        return this.cntRouteVehicleGridPanel.getView();
    },

    getViewSmartIctTabPanel: function () {
        return this.cntSmartIctTabPanel.getView();
    },

    getView: function () {
        return this.view;
    },

    setHandlers: function () {
        var viewStationFormPanel = this.getViewStationFormPanel();
        var viewStationGridPanel = this.getViewStationGridPanel();
        var viewRouteFormPanel = this.getViewRouteFormPanel();
        var viewRouteGridPanel = this.getViewRouteGridPanel();
        var viewVehicleFormPanel = this.getViewVehicleFormPanel();
        var viewVehicleGridPanel = this.getViewVehicleGridPanel();
        var viewRouteStationFormPanel = this.getViewRouteStationFormPanel();
        var viewRouteStationGridPanel = this.getViewRouteStationGridPanel();
        var viewRouteVehicleFormPanel = this.getViewRouteVehicleFormPanel();
        var viewRouteVehicleGridPanel = this.getViewRouteVehicleGridPanel();

        viewStationFormPanel.btnAra.handler = function () {
            viewStationGridPanel.getStore().load();
        };
        viewStationFormPanel.btnKaydet.handler = function () {
            Ext.Ajax.request({
                url : '../station/saveOrUpdateStation.ajax',
                params : {
                     data:Ext.encode(viewStationFormPanel.getForm().getValues())
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewStationGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
        viewStationGridPanel.btnSil.handler = function () {
            if(!viewStationGridPanel.hasSelected()){
                showWarningMsg("Please select record which you want!");
                return;
            }
            Ext.Ajax.request({
                url : '../station/deleteStation.ajax',
                params : {
                     id:viewStationGridPanel.getSelectedData().id
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewStationGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };

        viewRouteFormPanel.btnAra.handler = function () {
            viewRouteGridPanel.getStore().load();
        };
        viewRouteFormPanel.btnKaydet.handler = function () {
            Ext.Ajax.request({
                url : '../route/saveOrUpdateRoute.ajax',
                params : {
                     data:Ext.encode(viewRouteFormPanel.getForm().getValues())
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
        viewRouteGridPanel.btnSil.handler = function () {
            if(!viewRouteGridPanel.hasSelected()){
                showWarningMsg("Please select record which you want!");
                return;
            }
            Ext.Ajax.request({
                url : '../route/deleteRoute.ajax',
                params : {
                    id:viewRouteGridPanel.getSelectedData().id
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };

        viewVehicleFormPanel.btnAra.handler = function () {
            viewVehicleGridPanel.getStore().load();
        };
        viewVehicleFormPanel.btnKaydet.handler = function () {
            Ext.Ajax.request({
                url : '../vehicle/saveOrUpdateVehicle.ajax',
                params : {
                     data:Ext.encode(viewVehicleFormPanel.getForm().getValues())
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewVehicleGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
        viewVehicleGridPanel.btnSil.handler = function () {
            if(!viewVehicleGridPanel.hasSelected()){
                showWarningMsg("Please select record which you want!");
                return;
            }
            Ext.Ajax.request({
                url : '../vehicle/deleteVehicle.ajax',
                params : {
                    id:viewVehicleGridPanel.getSelectedData().id
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewVehicleGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };

        viewRouteStationFormPanel.btnAra.handler = function () {
            viewRouteStationGridPanel.getStore().load();
        };
        viewRouteStationFormPanel.btnKaydet.handler = function () {
            Ext.Ajax.request({
                url : '../routeStation/saveOrUpdateRouteStation.ajax',
                params : {
                     data:Ext.encode(viewRouteStationFormPanel.getForm().getValues())
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteStationGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
        viewRouteStationGridPanel.btnSil.handler = function () {
            if(!viewRouteStationGridPanel.hasSelected()){
                showWarningMsg("Please select record which you want!");
                return;
            }
            Ext.Ajax.request({
                url : '../routeStation/deleteRouteStation.ajax',
                params : {
                    id:viewRouteStationGridPanel.getSelectedData().id
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteStationGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };

        viewRouteVehicleFormPanel.btnAra.handler = function () {
            viewRouteVehicleGridPanel.getStore().load();
        };
        viewRouteVehicleFormPanel.btnKaydet.handler = function () {
            Ext.Ajax.request({
                url : '../routeVehicle/saveOrUpdateRouteVehicle.ajax',
                params : {
                     data:Ext.encode(viewRouteVehicleFormPanel.getForm().getValues())
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteVehicleGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
        viewRouteVehicleGridPanel.btnSil.handler = function () {
            if(!viewRouteVehicleGridPanel.hasSelected()){
                showWarningMsg("Please select record which you want!");
                return;
            }
            Ext.Ajax.request({
                url : '../routeVehicle/deleteRouteVehicle.ajax',
                params : {
                    id:viewRouteVehicleGridPanel.getSelectedData().id
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        viewRouteVehicleGridPanel.getStore().load();
                    } else {
                        showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        };
    },

    setListeners: function () {
        var viewStationFormPanel = this.getViewStationFormPanel();
        var viewStationGridPanel = this.getViewStationGridPanel();
        var viewRouteFormPanel = this.getViewRouteFormPanel();
        var viewRouteGridPanel = this.getViewRouteGridPanel();
        var viewVehicleFormPanel = this.getViewVehicleFormPanel();
        var viewVehicleGridPanel = this.getViewVehicleGridPanel();
        var viewRouteStationFormPanel = this.getViewRouteStationFormPanel();
        var viewRouteStationGridPanel = this.getViewRouteStationGridPanel();
        var viewRouteVehicleFormPanel = this.getViewRouteVehicleFormPanel();
        var viewRouteVehicleGridPanel = this.getViewRouteVehicleGridPanel();

        viewStationGridPanel.getStore().addListener('beforeload', function(store, options) {
            options.params.data = Ext.encode(viewStationFormPanel.getForm().getValues());
        });

        viewRouteGridPanel.getStore().addListener('beforeload', function(store, options) {
            options.params.data = Ext.encode(viewRouteFormPanel.getForm().getValues());
        });
        viewVehicleGridPanel.getStore().addListener('beforeload', function(store, options) {
            options.params.data = Ext.encode(viewVehicleFormPanel.getForm().getValues());
        });
        viewRouteStationGridPanel.getStore().addListener('beforeload', function(store, options) {
            options.params.data = Ext.encode(viewRouteStationFormPanel.getForm().getValues());
        });
        viewRouteVehicleGridPanel.getStore().addListener('beforeload', function(store, options) {
            options.params.data = Ext.encode(viewRouteVehicleFormPanel.getForm().getValues());
        });
    }
};
var cntSmartIctMainPanel = new CntSmartIctMainPanel();
cntSmartIctMainPanel.init();

