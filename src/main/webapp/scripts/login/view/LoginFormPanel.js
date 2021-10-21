ViewLoginFormPanel = Ext.extend(Ext.form.FormPanel, {
    //title: "",
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: true,
    monitorValid: true,
    bodyStyle: {
        padding: '15px 15px 15px 30px'
    },
    // layoutConfig: {
    //     padding: '5',
    //     pack: 'center',
    //     align: 'middle'
    // },
   autoScroll: true,

    initComponent: function() {

        this.txtKullaniciAdi = new Ext.form.TextField({
            name : 'kullaniciAdi',
            fieldLabel : 'Kullanıcı Adı ',
            width : 150,
            labelWidth: 300,
            align:'center',
            labelStyle: 'width:110px;text-align: center;'


        });

        this.txtKullaniciSifre = new Ext.form.TextField({
            name : 'kullaniciSifre',
            fieldLabel : 'Kullanıcı Şifre',
            width : 150,
            inputType: 'password',
            labelWidth: 300,
            labelStyle: 'width:110px;text-align: center;'
        });


        this.items = [
            {
                layout: "form",
                layoutConfig: {
                    align: 'center'
                },
                items: [
                    {
                        layout: "form",
                        layoutConfig: {
                            align: 'stretch'
                        },
                        flex: .90,
                        items: [ this.txtKullaniciAdi]
                    }
                    ,
                    {
                        layout: "form",
                        layoutConfig: {
                            align: 'stretch'
                        },
                        flex: .30,
                        items: [this.txtKullaniciSifre]
                    },
                    {
                        layout: "fit",
                        layoutConfig: {
                            align: 'stretch'
                        },
                        flex: .30,
                        items: [new Ext.Panel({    id: 'onlineLbsRecaptcha'})]
                    }
                ]
            }
         ];

        this.btnGiris = new Ext.Button({
            text: 'Giriş Yap',
            id:'btnGiris',
            scale: "large",
            // iconCls : 'Medium'
        });

        this.buttons = [this.btnGiris];
        this.buttonAlign = "center";

        ViewLoginFormPanel.superclass.initComponent.call(this);
    }
});
Ext.reg('ViewLoginFormPanel', ViewLoginFormPanel);