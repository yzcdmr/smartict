ViewSmartIctTabPanel = Ext.extend(Ext.TabPanel, {

	header : false,
	autoScroll : false,
	activeTab : 0,
	layoutOnTabChange : true,
	deferredRender : false,
	forceLayout : true,
	enableTabScroll : false,
    // layout : 'fit',
    height : 600,

	initComponent: function () {

		this.items = [];
		ViewSmartIctTabPanel.superclass.initComponent.call(this);
	}
});

Ext.reg("ViewSmartIctTabPanel",ViewSmartIctTabPanel);