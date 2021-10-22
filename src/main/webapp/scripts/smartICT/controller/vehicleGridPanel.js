function CntVehicleGridPanel() {
    this.scope = null;
    this.controller = true;
    this.view = new ViewVehicleGridPanel();

}

CntVehicleGridPanel.prototype = {
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

    },

    getScope: function () {
        if (this.scope == null)
            this.setScope();

        return this.scope;
    },

    getView: function () {
        return this.view;
    },

    setHandlers: function () {

    },

    setListeners: function () {

    }
};