function CntLoginMainController() {
    this.scope = null;
    this.controller = true;
    this.view = new ViewLoginMainPanel();
    this.cntLoginFormPanel = new CntLoginFormPanel().init();
}

CntLoginMainController.prototype = {
    init: function () {
        this.setScope();
        this.setHandlers();
        this.setListeners();
        this.setViewConfig();

        return this;
    },
    getViewLoginFormPanel: function(){
        return this.cntLoginFormPanel.getView();
    },
    setScope: function () {
        this.scope = this;
    },

    setViewConfig: function () {
        var view = this.getView();
        var viewLoginFormPanel = this.getViewLoginFormPanel();
        view.add({
            layout: "fit",
            items: [ {
                region: "center",
                layout: "fit",
                items: [viewLoginFormPanel],
                height     : Ext.getBody().getViewSize().height*0.3,
                width      : Ext.getBody().getViewSize().width*0.3,
                border:false,
                frame:false
            }]


        });
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
        var viewLoginFormPanel = this.getViewLoginFormPanel();
        // var view = cntSiparisListesiIhaleMainPanel.getViewSiparisListesiIhaleGridPanel();
         viewLoginFormPanel.btnGiris.handler=function(){
             if (typeof window.getKurumsalKey =='undefined' || window.getKurumsalKey == null) {
                 alert('Güvenlik Kontrolu Yapılamadı!\nRobot Olmadığınızı Kanıtlayınız.');
                 return;
             }

             var kullaniciAdi=viewLoginFormPanel.txtKullaniciAdi.getValue();
             var kullaniciSifre=viewLoginFormPanel.txtKullaniciSifre.getValue();
             if(typeof kullaniciAdi == 'undefined' || kullaniciAdi==null || kullaniciAdi=="" ||
                 typeof kullaniciSifre == 'undefined' || kullaniciSifre==null || kullaniciSifre==""){
                 showErrorMsg("Kullanıcı Adı veya şifre Bilgisi Eksiktir.!","UYARI");
                 return;
             }
             Ext.Ajax.request({
                 url : '/loginControl.ajax',
                 params : {
                      kullaniciAdi: kullaniciAdi,
                      kullaniciSifre : kullaniciSifre
                 },
                 success : function(response, options) {
                     debugger;
                     var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                     if (!jsonData.success) {
                         showErrorMsg(jsonData.message);
                         return;
                     }

                     window.location.href="http://localhost:1111/anasayfa.htm"
                     // var viewView = cntSiparisListesiIhaleMainPanel.getView();
                     // viewView.setTitle("&nbsp;LOGIN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:red;'>" + jsonData.Adi + "</span>");
                     // Ext.getCmp("panel").add(viewView);
                     // Ext.getCmp('online-siparisTakip-tabPanel').setActiveTab('panel');
                     // Ext.getCmp("panel").doLayout();
                     // Ext.getCmp('online-siparisTakip-tabPanel').hideTabStripItem('login-panel');
                     // viewSiparisListesiIhaleGridPanel1.grid.getStore().load();


                 },
                 failure : function(response, options) {
                     showErrorMsg();
                 }
             });
         }
    },

    setListeners: function () {

    }
};



var cntLoginMainController = new CntLoginMainController();
cntLoginMainController.init();
