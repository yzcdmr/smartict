Ext.onReady(function () {
    var getKurumsalKey=null;

    var tabPaneBilgi=new Ext.TabPanel({
        region: 'center',
        cls: 'bekirTabPanel',
        id: 'online-siparisTakip-tabPanel',
        deferredRender: false,
        activeTab: 0,
        items: [{
            title: '&nbsp; SMARTICT LOGIN &nbsp;',
            iconCls: 'kilit2',
            id: 'login-panel',
            layout: 'hbox',
            layoutConfig: {
                padding: '5',
                pack: 'center',
                align: 'middle'}
        }]

    });
    var viewport = new Ext.Viewport({
        layout: 'border',
        items: [
            tabPaneBilgi
        ]
    });

     var loginMenu=cntLoginMainController.getView();
    // Ext.getCmp('online-siparisTakip-tabPanel').hideTabStripItem('panel');
    // Ext.getCmp("panel").removeAll();
    // Ext.getCmp("panel").doLayout();

    Ext.getCmp('online-siparisTakip-tabPanel').setActiveTab('login-panel');

    Ext.getCmp("login-panel").remove(loginMenu, true);
    Ext.getCmp("login-panel").add(loginMenu);
    Ext.getCmp("login-panel").doLayout();
    //chkCaptcha();



});

window.onload = function() {
    var recaptcha = Ext.getCmp('onlineLbsRecaptcha');
    var publicRecaptivaData = document.getElementById("publicRecaptiva").value;
    recaptcha.update('<div id="myCaptcha" class="g-recaptcha" data-sitekey="' + publicRecaptivaData + '"></div>');
    recaptcha.doLayout();

    var captchaWidgetId = window.grecaptcha.render('myCaptcha', {
        'sitekey':publicRecaptivaData ,  // required
        'theme': 'light',  // optional
        'callback': function (call) {
            this.getKurumsalKey=call;
        }    // optional
    });


};

function showSuccessMsg(msg, tag) {
    tag = tag || 'Başarılı';
    msg = msg || 'success';
    message(tag, msg, 'success');
}

function showWarningMsg(msg, tag) {
    tag = tag || 'UYARI';
    msg = msg || 'warning';
    message(tag, msg, 'warning');
}

function showErrorMsg(msg, tag) {
    tag = tag || 'UYARI';
    msg = msg || 'error';
    message(tag, msg, 'error');
}

function message(title, format, type) {
    if (title.length > format.length) {
        var tmpStr = title;
        title = format;
        format = tmpStr;

    }

    type = type || '';
    if (!this.msgCt) {
        this.msgCt = Ext.DomHelper.insertFirst(document.body, {
            id: 'msg-div'
        }, true);
    }
    this.msgCt.alignTo(document, 't-t');
    var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
    var m = Ext.DomHelper.append(this.msgCt, {
        html: '<div class="msg ' + type + '"><h3>' + title + '</h3><p>' + s + '</p></div>'
    }, true);
    m.slideIn('t').pause(s.length / 15).ghost('t', {
        remove: true
    });
};