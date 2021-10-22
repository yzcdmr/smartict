Ext.onReady(function () {
    var panelBilgi=new Ext.Panel({
        id: 'smart-ict-panel',
        layout: 'fit',
        deferredRender: false,
        activeTab: 0,
        items: [{
            title: '&nbsp; SMART ICT &nbsp;',
            id: 'smart-ict-main-panel',
        }]
    });
    var viewport = new Ext.Viewport({
        layout: 'fit',
        items: [
            panelBilgi
        ]
    });

    var smartIctMain=cntSmartIctMainPanel.getView();
    Ext.getCmp("smart-ict-main-panel").remove(smartIctMain, true);
    Ext.getCmp("smart-ict-main-panel").add(smartIctMain);
    Ext.getCmp("smart-ict-main-panel").doLayout();
    //chkCaptcha();



});

window.onload = function() {
    // var recaptcha = Ext.getCmp('loginRecaptcha');
    // var publicRecaptivaData = document.getElementById("publicRecaptiva").value;
    // recaptcha.update('<div id="myCaptcha" class="g-recaptcha" data-sitekey="' + publicRecaptivaData + '"></div>');
    // recaptcha.doLayout();
    //
    // var captchaWidgetId = window.grecaptcha.render('myCaptcha', {
    //     'sitekey':publicRecaptivaData ,  // required
    //     'theme': 'light',  // optional
    //     'callback': function (call) {
    //         this.getKurumsalKey=call;
    //     }    // optional
    // });


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