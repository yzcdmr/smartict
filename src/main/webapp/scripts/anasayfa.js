Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle)
            return true;
    }
    return false;
};

var menuWindow = null;

ViewMenuFormPanel = Ext.extend(Ext.form.FormPanel, {
    frame: true,
    border: false,
    collapsible: false,
    autoScroll: false,
    monitorValid: true,
    html: '<iframe src="../scripts/menuForm.html?rand='+Math.random()+'" width="99.6%" height="99%" onload="menuIframeLoadFunc()" ></iframe>',
    initComponent: function() {
        this.items = [];

        ViewMenuFormPanel.superclass.initComponent.call(this);
    }
});

Ext.BLANK_IMAGE_URL = '../scripts/ext34x/resources/images/default/s.gif';
Ext.chart.Chart.CHART_URL = '../scripts/ext34x/resources/charts.swf';
window.currentTabs = new Array();
window.tabMap = new Object();
var windowGenKurumSecim = new GenKurumSecim();
var currentMenuId = '';
var data;
var adSoyad;
var lookups;
var lookupsString;
Ext.Ajax.timeout = 180000;
var polSonOnayTask;
var activeTabLoaded = false;
var mouseOverTimerValue = 0;
var uykuWinIsAlive = false;
var now;

Ext.Ajax.on('beforerequest', function (conn, options) {
    if (!(/^http:.*/.test(options.url) || /^https:.*/.test(options.url))) {
        if (typeof(options.headers) == "undefined") {
            options.headers = {'X-CSRFToken': akgunguvenlik.csrf};
        } else {
            options.headers.extend({'X-CSRFToken': akgunguvenlik.csrf});
        }
    }

});

$.ajaxSetup({
    headers:
        { 'X-CSRFToken': akgunguvenlik.csrf }
});

function callShortcutMenu(menuId) {
    return function () {
        return GOC.callMenuByMenuId(menuId, null, false);
    }
}

//css verilmiş ise sadece bu css'a ait div masklanır.
function showWait(waitMsg, css) {
    var _css = ".x-viewport";
    if (css != null && css != "" && css != undefined) {
        _css = css;
    }

    jQuery(_css).waitMe({
        effect: 'win8',
        text: '<span style="color: lightgrey; font-weight: bold">'+ waitMsg != null && waitMsg != "" && waitMsg != undefined ? waitMsg + '</span>' : 'İşleminiz gerçekleştiriliyor.</br>Lütfen bekleyiniz...</span>',
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        waitTime: -1,
        source: 'img.svg',
        textPos: 'vertical',
        fontSize: '18px',
        onClose: function(el) {}
    });
}

//Eğer showWait'e parametre olarak css verilmiş ise aynı css bilgisi CloseWait yaparken de verilmelidir.
function closeWait(css) {
    if (css != null && css != "" && css != undefined)
        jQuery(css).waitMe('hide');
    else
        jQuery(".x-viewport").waitMe('hide');

    jQuery(".waitMe_container").waitMe('hide');
}


var isUyku = Ext.util.Cookies.get('isUyku');
if (isUyku != null && (isUyku == true || isUyku == "true")) {
    Ext.util.Cookies.set('isUyku', false);
    /*document.location = '../gen/logout.ajax';*/
} else {
    Ext.util.Cookies.set('isUyku', false);
}

function checkAjaxPost(timeDk) {
    var getAjax = function () {
        Ext.Ajax.request({
            url : '../wss/healdCheck.ajax',
            success : function(response, options) {
            },
            failure : function(response, options) {
            }
        });
    };

    Ext.TaskMgr.start({
        run: getAjax,
        interval: timeDk * 60 * 1000
    });
}

function setupSleepWindow(sleepDelay) {
    /**
     * Uyku modu için timer
     */
    window.setInterval(function () {
        mouseOverTimerValue++;
        if (mouseOverTimerValue >= sleepDelay) {
            Ext.onReady(function () {
                Ext.QuickTips.init();
                var UykuModuWindow = Ext.extend(Ext.Window, {
                    title: 'HBYS uygulaması uyku moduna geçti. Devam etmek istiyor musunuz?',
                    modal: true,
                    constrain: true,
                    resizable: false,
                    closable: false,
                    closeAction: 'hide',
                    layout: 'fit',
                    buttonAlign: 'center',
                    width: 420,
                    height: 120,
                    initComponent: function () {
                        var win = this;
                        this.listeners = {
                            hide	: function(w) {
                                uykuWinIsAlive = false;
                            },
                            show	: function(w) {

                                uykuWinIsAlive = true;
                            }
                        };
                        this.txtSifre = new Ext.form.TextField({
                            inputType: 'password',
                            anchor: '100%',
                            allowBlank: false,
                            fieldLabel: 'Şifre'
                        });
                        this.txtKullaniciAdi = new Ext.form.TextField({
                            fieldLabel: 'Kullanıcı Adı',
                            allowBlank: false,
                            anchor: '100%'

                        });
                        this.btnDevamEt = new Ext.Button({
                            tooltip: '<b>Giriş için tıklayınız...</b>',
                            text: 'Giriş',
                            width: 100,
                            handler: function () {
                                if (win.txtSifre.getValue() == '' || win.txtKullaniciAdi.getValue() == '') {
                                    win.txtSifre.validate();
                                    win.txtKullaniciAdi.validate();
                                    return;
                                }
                                Ext.Ajax.request({
                                    url: '../gen/checkAuthentication.ajax',
                                    params: {
                                        userName: win.txtKullaniciAdi.getValue(),
                                        password: win.txtSifre.getValue(),
                                    },
                                    success: function (response, options) {
                                        var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                                        if (jsonData.success) {
                                            Ext.util.Cookies.set('isUyku', false);
                                            win.hide();
                                        } else {
                                            Ext.util.Cookies.set('isUyku', false);
                                            document.location = '../gen/logout.ajax';
                                        }
                                        console.log(response)
                                    }, failure: function (response, options) {
                                        showErrorMsg();
                                    }
                                });
                            }
                        });
                        var btnCikis = new Ext.Button({
                            tooltip: '<b>Çıkış için tıklayınız...</b>',
                            text: 'Çıkış',
                            width: 100,
                            handler: function () {
                                Ext.util.Cookies.set('isUyku', false);
                                document.location = '../gen/logout.ajax';
                            }
                        });

                        this.btnCikis = btnCikis;

                        this.buttons = [this.btnDevamEt, this.btnCikis];
                        this.items = [{
                            layout: 'form', padding: 5, labelWidth: 150, items: [this.txtKullaniciAdi, this.txtSifre]
                        }]
                        UykuModuWindow.superclass.initComponent.call(this);
                    }
                });
                Ext.reg('UykuModuWindow', UykuModuWindow);
                if(!uykuWinIsAlive){
                    var win = new UykuModuWindow();
                    win.show();
                    Ext.util.Cookies.set('isUyku', true);
                }
            });
        }
    }, 60*1000);
}

document.addEventListener("mousemove", function(){
    mouseOverTimerValue = 0;
});
document.onkeypress = function(e) {
    mouseOverTimerValue = 0;
};
function makeMeAnArray(lookupId) {

    Ext.Ajax.request({
        url: '../rest/getLookup.ajax', params: {lookupId: lookupId},
        success: function (response, options) {
            var jsonData = Ext.util.JSON.decode(response.responseText.trim());
            return jsonData.data;
        }, failure: function (response, options) {
            showErrorMsg();
        }
    });

}

function appletProcessingCallback(isSuccessful, result, callbackObject) {
    if (isSuccessful) {
        callbackObject.success(result);
    } else {
        callbackObject.error(result);
    }
}

function websocketUserMassegeHandler(message) {
    var countNotif = parseInt(jQuery('.counter').text());
    var jsonBody = Ext.decode(message.body)
    var newcountNotif;
    if (jsonBody.isPopupUyari) {
        Ext.Msg.show({
            title: jsonBody.baslik,
            msg: jsonBody.icerik,
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
    } else {
        newcountNotif = ++countNotif;
    }
    //$('#msg-icon').removeClass('msg-icon').addClass('msg-iconh');
    jQuery('.counter').text(newcountNotif).show();

    var mySound = new buzz.sound("../images/notification", {
        formats: ["mp3"]
    });

    mySound.play();

}

function objectToUrlParams(obj) {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}

/**
 * Uygulama genelinde yakalanmasi gereken tuslar icin kullanilabilir
 * shotcut.js kullanilmistir. http://www.openjs.com/scripts/events/keyboard_shortcuts/
 */
shortcut.add("f1",function() { //Yardım Help ekranini acmak icin kullaniliyor
    helpButtonPressedNew();
});



function helpButtonPressed() {
    // winHelp.show(btn.getId());
    var activePanel = Ext.getCmp('centerPanel').getActiveTab();
    var itemId = activePanel.itemId;
    if (itemId == null)
        itemId = "obj_" + 0;
    var menuId = itemId.replace("obj_", "");
    console.log(menuId);
    // lblHelp.setText(menuId);

    Ext.Ajax.request({
        url: '../gen/getHelpInformations.ajax',
        method: 'POST',
        success: function (r, o) {
            var helpsUrl = r.responseText;
            if (helpsUrl == '') {
                // showErrorMsg("Uyarı", 'Yardım Dosyası Bulunmamaktadır.')
                // return;
                helpsUrl = 'index.html';
            }

            //window.open(r.responseText, '_blank');
            Ext.IframeWindow = Ext.extend(Ext.Window, {
                onRender: function () {
                    this.bodyCfg = {
                        tag: 'iframe',
                        src: this.src,
                        cls: this.bodyCls,
                        style: {
                            border: '0px none'
                        }
                    };
                    Ext.IframeWindow.superclass.onRender.apply(this, arguments);
                }
            });
            var w = new Ext.IframeWindow({
                id: id,
                width: 850,
                height: 550,
                title: "Yardım",
                src: "../help/index.html?" + helpsUrl
            })
            w.show();

        },
        params: {
            menuId: menuId
        }
    });
}

function helpButtonPressedNew() {
    var activePanel = Ext.getCmp('centerPanel').getActiveTab();
    var itemId = activePanel.itemId;
    if (itemId == null)
        itemId = "obj_" + 0;
    var menuId = itemId.replace("obj_", "");
    GOC.callMenuByMenuId(10073609, function (cnt) {
        var cntWin = new cnt(menuId).init();
        cntWin.getWindow().show();
    }, true);
}

Ext.onReady(function () {
    now = moment();
    timer = moment.duration(1, "seconds").timer({
        loop: true,
        start: false
    }, function() {
        now.add('second', 1);
    });

    var sistemZamaniStr = $.ajax({
        type: "GET",
        url: '../rest/getSistemZamani.ajax',
        async: false
    }).responseText;

    now = moment(sistemZamaniStr, 'DD/MM/YYYY hh:mm:ss');
    timer.start();




    /**
     * @author BEKIR KAPLAN ANA DOSYALAR YUKLENIYOR POLIKLINIK, ACIL, DIYALIZ, SERVIS DEFTERLERI ICIN GEREKEN ELEMANLARIN YUKLENMESI ICIN
     */
    GOC.callMenuByMenuId(5555, null, true);
    /**
     * ANA DOSYALAR YUKLENIYOR POLIKLINIK, ACIL, DIYALIZ, SERVIS DEFTERLERI ICIN GEREKEN ELEMANLARIN YUKLENMESI ICIN
     */


    /**
     * Notification buttona tıklanınca
     */


    Ext.QuickTips.init();
    /**
     * @author serkanremzi. Kullanıcı birden fazla kuruma sahip ise kurum secmeden, ilerlemesine izin verilmeyecek
     *
     *
     */
    var control = false;

    Ext.Ajax.request({
        url: "../rest/kullanicilar/getGenKurumVarsiyalan.ajax",// buradaki requestte setlenecek aktif genkurum eger genkurumCount==1 ise
        success: function (response, options) {
            var jsonData = Ext.util.JSON.decode(response.responseText.trim());
            if (!jsonData.varsayilan && jsonData.genKurumSayisi > 1) {
                document.location.href = '../gen/kurumDegistir.htm';
            } else if (!jsonData.varsayilan && jsonData.genKurumSayisi == 0) {
                var msg = "Kullanıcıya Kurum Tanımlaması Yapılmamıs, Lutfen Sistem Yöneticinize Başvurunuz"
                Ext.Msg.confirm('Kurum Tanımlaması', msg, function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: '../gen/logout.ajax',
                            success: function (r, o) {
                                document.location.href = '../gen/anasayfa.htm';
                            }
                        });
                    } else {
                        Ext.Ajax.request({
                            url: '../gen/logout.ajax',
                            success: function (r, o) {
                                document.location.href = '../gen/anasayfa.htm';
                            }
                        });
                    }
                }, this);
            }
            if (jsonData.varsayilan) {
                controlOfUser();
            } else if (!jsonData.varsayilan && jsonData.genKurumSayisi == 1) {
                controlOfUser();
            }
        }
    });

    windowGenKurumSecim.formPanelGenKurumSecim.kaydetBtn.on('click', function () {
        control = true;
        controlOfUser();
          });


    showHastaBilgileri = function (hastaId, vizitHareketId) {
        Ext.Ajax.request({
            url: '../rest/poliklinik/getHastaBilgileri.ajax',
            params: {
                hastaId: hastaId,
                vizitHareketId: vizitHareketId
            },
            success: function (response, options) {
                var res = Ext.decode(response.responseText);
                var winHastaBilgi = new HastaBilgiWin();
                winHastaBilgi.addListener('beforeshow', function (w) {
                    winHastaBilgi.formDispKimlik.getForm().setValues(res.kimlik);
                    winHastaBilgi.formDispSosyalGuvence.getForm().setValues(res.sosyalGuvenlik);
                    winHastaBilgi.formIletisim.getForm().setValues(res.iletisim);
                    winHastaBilgi.gridVizitBilgiler.getStore().addListener('beforeload', function (store, opt) {
                        opt.params.hastaId = hastaId;
                    });
                    winHastaBilgi.imagePanel.enable();

                    winHastaBilgi.imagePanel.uploadParams = {
                        hastaId: hastaId
                    };
                    winHastaBilgi.imagePanel.deleteParams = {
                        hastaId: hastaId
                    };
                    winHastaBilgi.imagePanel.downloadUrlSuffix = "?hastaId=" + hastaId;
                    winHastaBilgi.imagePanel.imageRefresh();
                    winHastaBilgi.gridVizitBilgiler.getStore().load({
                        params: {
                            start: 0,
                            limit: 5
                        },
                        callback: function () {
                            winHastaBilgi.gridVizitBilgiler.getSelectionModel().selectFirstRow();
                        }
                    });
                    winHastaBilgi.gridVizitBilgiler.getSelectionModel().addListener('rowselect', function (selModel, rowIndex, rec) {
                        winHastaBilgi.gridVizitHareketBilgiler.getStore().removeAll();
                        var vizitId = rec.data.vizitId;
                        winHastaBilgi.gridVizitHareketBilgiler.getStore().load({
                            params: {
                                vizitId: vizitId
                            }
                        });
                    });
                });
                winHastaBilgi.show();
            }
        });
    };

    var keys = new Ext.KeyMap(document, [
        {
            key: 37,
            ctrl: false,
            alt: false,
            shift: true,
            fn: function () {
                if (Ext.WindowMgr.getActive() != null) {
                    return;
                }
                var activeTabIndex = '';
                var centerPanel = Ext.getCmp('centerPanel');
                var activePanel = centerPanel.getActiveTab();
                var centerItems = centerPanel.items.items;
                for (var i = 0; i < centerItems.length; i++) {
                    var tmpItem = centerItems[i];
                    if (tmpItem.getId() == activePanel.getId()) {
                        activeTabIndex = i;
                    }
                }
                if (activeTabIndex - 1 >= 0) {
                    centerPanel.setActiveTab(activeTabIndex - 1);
                }
            },
            scope: this
        }
        , {
            key: 39,
            ctrl: false,
            alt: false,
            shift: true,
            fn: function () {
                if (Ext.WindowMgr.getActive() != null) {
                    return;
                }
                var activePanel = Ext.getCmp('centerPanel').getActiveTab();
                var centerPanel = Ext.getCmp('centerPanel');
                var activePanel = centerPanel.getActiveTab();
                var centerItems = centerPanel.items.items;
                for (var i = 0; i < centerItems.length; i++) {
                    var tmpItem = centerItems[i];
                    if (tmpItem.getId() == activePanel.getId()) {
                        activeTabIndex = i;
                    }
                }
                if (activeTabIndex + 1 < centerItems.length) {
                    centerPanel.setActiveTab(activeTabIndex + 1);
                }
            },
            scope: this
        }
    ]);

    function callMenuByMenuId(menuId) {
        Ext.Ajax.request({
            url: '../rest/getmenubymenuid.ajax',
            method: 'GET',
            success: function (r, o) {
                var x = Ext.decode(r.responseText);
                addComponentFromUrl(x.data[0].id);
                currentMenuId = x.data[0].id;
            },
            params: {
                menuId: menuId
            }
        });
    }

    var cikisButton = new Ext.Button({
        tooltip: language.UY046,
        // renderTo: 'cikisButton',
        iconCls: 'logout',
        align: 'right',
        minWidth: 60,
        handler: function () {
            Ext.MessageBox.confirm(language.UY046, language.UY047, function (btn) {
                if (btn == 'yes') {
                    Ext.util.Cookies.set('isUyku', false);
                    document.location = '../gen/logout.ajax';
                }
            })
        }
    });

    this.cikisButton = cikisButton;

    var kurumDegistir = new Ext.Button({
        tooltip: '<b>Kurum Değiştir</b>',
        // renderTo: 'cikisButton',
        iconCls: 'refresh',
        align: 'right',
        minWidth: 60,
        handler: function () {
            Ext.MessageBox.confirm("Kurum Değiştir", "Kurum değiştirmek istediğinizden emin misiniz?", function (btn) {
                if (btn == 'yes') {
                    document.location.href = '../rest/kullanicilar/casAuthentication.ajax';
                }
            });
        }
    });

    this.kurumDegistir = kurumDegistir;

    var erapor = new Ext.menu.Item({
        tooltip: '<b>E-Rapor</b>',
        text: '<b>E-Rapor</b>',
        iconCls: 'erapor16',
        align: 'right',
        minWidth: 60,
        handler: function () {
            Ext.Ajax.request({
                url : '../rest/dogumRaporu/getRaporListelemeEkrani.ajax',
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (jsonData.success) {
                        if(jsonData.url != null && jsonData.url != ""){
                            window.open(jsonData.url);
                        } else {
                            showAlert("UYARI","Açılacak E-Rapor ekranı bulunamadı.");
                        }
                    } else {
                        if (jsonData.message != null && jsonData.message.toString().indexOf("502") > -1)
                            showErrorMsg("Bakanlık E-Rapor sistemi şuan da yanıt vermiyor. Lütfen daha sonra tekrar deneyiniz.");
                        else
                            showErrorMsg(jsonData.message);
                    }
                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        }
    });
    var eraporEngelli = new Ext.menu.Item({
        tooltip: '<b>E-Rapor Engelli</b>',
        text : 'Engelli Kurul Hekim İşlemleri',
        iconCls: 'erapor16',
        align: 'right',
        minWidth: 60,
        handler: function () {
            kurulTanimlamaEkraniAc(3);
        }
    });
    var eraporEngelliHastaKayit = new Ext.menu.Item({
        tooltip: '<b>E-Rapor Engelli</b>',
        text : 'Engelli Hasta Kayıt',
        iconCls: 'erapor16',
        align: 'right',
        minWidth: 60,
        handler: function () {
            kurulTanimlamaEkraniAc(5);
        }
    });

    var menuItemERapor = new Ext.SplitButton({
        tooltip: 'E-Rapor',
        id: 'menuItemERapor',
        iconCls: 'erapor16',
        align: 'center',
        minWidth: 60,
        menu: new Ext.menu.Menu({

            items: [erapor,eraporEngelli,eraporEngelliHastaKayit]
        })
    });

    var yoneticiPortal = new Ext.Button({
        tooltip: '<b>Yönetici Portal</b>',
        iconCls: 'akgun',
        align: 'right',
        minWidth: 60,
        handler: function () {
            window.open("../yoneticiPortal/yoneticiPortalIndex.html","_blank");
        }
    });

    var yardimEkrani = new Ext.menu.Item({
        text:'<b>Yardım</b>',
        iconCls:'help',
        handler: function (btn) {
            helpButtonPressed(btn.getId());
        }
    });

    var merkezSurumNotlari = new Ext.menu.Item({
        text:'<b>Surum Notlari</b>',
        iconCls:'takip16',
        handler: function (btn) {
            GOC.callMenuByMenuId(10008000);
        }

    });

    var merkezSurumBilgileri = new Ext.menu.Item({
        text: '<b>Sürüm Bilgisini Merkeze Gönder</b>',
        iconCls: 'alfabetB24',
        handler: function (btn) {
            Ext.Ajax.request({
                scope: this,
                url: "../rest/merkeziSurumYonetimi/updateMerkeziSurumYonetimi.ajax",
                success: function (response, options) {
                    var res = Ext.decode(response.responseText);
                    if (res.success) {
                        showSuccessMsg("Sürüm bilgisi Merkezi Paylaşım Sistemine Gönderildi!");
                    } else if (res.message != "") {
                        showWarningMsg(res.message);
                    }

                }
            })
        }
    });

    var tumHizmetlerinFiyat = new Ext.menu.Item({
        text: '<b>Tüm Hizmetlerin Fiyat Listesi</b>',
        iconCls: 'tanim-liste',
        handler: function (btn) {
            GOC.callMenuByMenuId(10015400);
        }
    });

    var menuItemHelpBtn = new Ext.SplitButton({
        tooltip: 'Yardım',
        id: 'menuItemHelpBtn',
        iconCls: 'help',
        align: 'center',
        minWidth: 60,
        menu: new Ext.menu.Menu({

            items: [yardimEkrani,merkezSurumNotlari,merkezSurumBilgileri,tumHizmetlerinFiyat]
        })
    });
    var menuItemHataBtn = new Ext.Button({
        tooltip: '<b>Hata Mesajı Rehberi</b>',
        id: 'menuItemHataBtn',
        iconCls: 'uyari',
        align: 'right',
        minWidth: 60,
        handler: function (btn) {
            GOC.callMenuByMenuId(199101, function (ViewUyariMesajlarMainPanel) {
                var viewUyariMesajlarMainPanel = ViewUyariMesajlarMainPanel;
                var viewUyariMesajlariGridPanel = viewUyariMesajlarMainPanel.findById('viewUyariMesajlariGridPanel');
                viewUyariMesajlariGridPanel.btnDuzenle.hide();
                viewUyariMesajlariGridPanel.btnEkle.hide();
                viewUyariMesajlariGridPanel.btnPaylas.hide();

                var viewAramaFormPanel = viewUyariMesajlarMainPanel.findById('viewAramaFormPanel');
                viewAramaFormPanel.cmbDetay.hide();
                viewAramaFormPanel.cmbDilTipi.hide();
                viewAramaFormPanel.cmbMesajtipi.hide();
                viewAramaFormPanel.chckAktif.hide();
                viewAramaFormPanel.chckHataDuzeltmeDolu.setValue(1);
                viewAramaFormPanel.chckHataDuzeltmeDolu.hide();

                var win = new ViewPopUpWindow();
                win.height=600;
                win.width=1000;
                win.title = "Hata Mesajı Rehberi";
                win.add(viewUyariMesajlarMainPanel);

                win.show();
            }, true);
        }
    });

    this.menuItemHataBtn = menuItemHataBtn;

    var menuItemPersonelZimmetListesiBtn = new Ext.Button({
        tooltip: '<b>Personel Zimmet Listesi</b>',
        id: 'menuItemPersonelZimmetListesiBtn',
        iconCls: 'demirbas',
        align: 'right',
        minWidth: 60,
        handler: function (btn) {
            GOC.callMenuByMenuId(9999000, function (ViewPersonelZimmetListesiMainPanel) {
                var viewPersonelZimmetListesiMainPanel = ViewPersonelZimmetListesiMainPanel;
                var viewPersonelZimmetListesiGridPanel = viewPersonelZimmetListesiMainPanel.findById('viewPersonelZimmetListesiGridPanel');

                var win = new ViewPopUpWindow();
                win.height=770;
                win.width=1550;
                win.title = "Personel Zimmet Listesi";
                win.add(viewPersonelZimmetListesiMainPanel);

                win.show();
            }, true);
        }
    });

    this.menuItemPersonelZimmetListesiBtn = menuItemPersonelZimmetListesiBtn;

    var notificationCount = new Ext.form.DisplayField({
        name: 'notificationCount',
        style: 'font-weight:bold;margin-top: -12px;color: rgb(228, 50, 50);font-size: medium;'
    });

    var menuINotificationBtn = new Ext.Button({
        tooltip: '<b>Arıza Bildirim</b>',
        iconCls: 'notification_icon',
        align: 'right',
        style: 'color:red; font-weight:bold',
        handler: function (btn) {
            GOC.callMenuByMenuId(166);
        }
    });

    this.menuINotificationBtn = menuINotificationBtn;

    var menuPersonelTakvimBtn = new Ext.menu.Item({
        text: '<b>Çalışma Takvimi Oluştur</b>',
        iconCls: 'takvim',
        align: 'right',
        handler: function (btn) {
            GOC.callMenuByMenuId(QUICK_MENU_PERSONEL_CALISMA_TAKVIMI);//personel calisma takvimi acilir.
        }
    });



    var menuAnlikMesaj = new Ext.Button({
        tooltip: '<b>Anlık Mesaj</b>',
        iconCls: 'anlikMesaj',
        align: 'right',
        handler: function (btn) {
            if (Ext.getCmp('mesajPanel').getWidth() == 0) {
                Ext.getCmp('mesajPanel').setWidth("500");
            } else {
                Ext.getCmp('mesajPanel').setWidth("0");
            }
            viewport.doLayout();
        }
    });

    this.menuAnlikMesaj = menuAnlikMesaj;

    var menuPersonelTakvimYoneticiBtn = new Ext.menu.Item({
        text: '<b>Çalışma Takvimi Onayla.</b>',
        iconCls: 'profiller',
        align: 'right',
        style: 'color:red; font-weight:bold',
        handler: function (btn) {
            GOC.callMenuByMenuId(QUICK_MENU_PERSONEL_CALISMA_TAKVIMI_ONAY);//personel calisma takvimi onay acilir.
        }
    });

    var menuQrDogrulaBtn = new Ext.menu.Item({
        text: '<b>Ürün Doğrula</b>',
        iconCls: 'barcodeAll',
        align: 'right',
        handler: function (btn) {
            GOC.callMenuByMenuId(QUICK_MENU_QR_DOGRULA, function(Cobj) {
                obj = new Cobj();
                var window = obj.init();
                window.maximized =true;
                window.show();
            }, true);
        }
    });

    var menuQrDogrulaLogBtn = new Ext.menu.Item({
        text: '<b>Ürün Doğrula Log</b>',
        iconCls: 'barcodeAll',
        align: 'right',
        style: 'color:red; font-weight:bold',
        handler: function (btn) {
            GOC.callMenuByMenuId(QUICK_MENU_QR_DOGRULA_LOG, function(Cobj) {
                obj = new Cobj();
                var window = obj.init();
                window.maximized =true;
                window.show();
            }, true);
        }
    });

    var menuUrunDogrulaSplit = new Ext.SplitButton({
        tooltip: '<b>Ürün Doğrula</b>',
        iconCls: 'barcodeAll',
        align: 'right',
        style: 'color:red; font-weight:bold',
        menu: new Ext.menu.Menu({

            items: [menuQrDogrulaBtn,menuQrDogrulaLogBtn]
        })
    });
    var mymLink = new Ext.Button({
        tooltip: '<b>ITSM Link</b>',
        align: 'right',
        style: 'color:red; font-weight:bold',
        iconCls : 'itsm24',
        handler: function (btn) {

        }
    });

    this.mymLink = mymLink;

    var btnDYS = new Ext.Button({
        tooltip: '<b>DYS</b>(Döküman Yönetim Sistemi)',
        align: 'right',
        style: 'color:green; font-weight:bold',
        iconCls : 'dokuman-detay',
        handler: function (btn) {
            {

            }
        }
    });

    this.btnDYS = btnDYS;

    var btnTedaviVademecumAnasayfa = new Ext.Button({
        tooltip: 'Vademecum Anasayfa',
        iconCls: 'vademecumLogo16',
        handler : function(){
            Ext.Ajax.request({
                url : '../rest/vademecum/getDefAnswerBySirketIdAndValueId.ajax',
                params : {
                    vademecumParametre:"VADEMECUM_REST_API_IFRAME_TOKEN"
                },
                success : function(response, options) {
                    var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                    if (!jsonData.success) {
                        showErrorMsg(jsonData.message);
                        return;
                    }
                    if ( typeof jsonData.data != 'undefined' && jsonData.data != null ) {
                        if(jsonData.data != 0){
                            var htmlLink ="";
                            htmlLink="https://iframe.vademecumonline.com.tr?token=" + jsonData.data;
                            window.open(htmlLink, '_blank');

                        }else{
                            showWarningMsg("Vademecum Yetkiniz Bulunmamaktadır.!","UYARI");
                            return;
                        }
                    }

                },
                failure : function(response, options) {
                    showErrorMsg();
                }
            });
        }
    });

    this.btnTedaviVademecumAnasayfa = btnTedaviVademecumAnasayfa;

    var sifreDegisButton = new Ext.Button({
        text: 'Şifre Değiştir',
        iconCls: 'kilit',
        handler: function (btn) {
            winOfSifreDegisPanel.show();
        }
    });

    this.sifreDegisButton = sifreDegisButton;

    var izinRaporSorgulaBtn = new Ext.menu.Item({
        text: '<b>Personel İzin/Rapor Sorgulama</b>',
        iconCls: 'cihazPersonel',
        handler: function (btn) {
            GOC.callMenuByMenuId(6010);
        }
    });

    var izinTalepBtn = new Ext.menu.Item({
        text: '<b>Personel İzin Talep</b>',
        iconCls: 'cihazPersonel',
        handler: function (btn) {
            GOC.callMenuByMenuId(10037052);
        }
    });

    var lblHelp = new Ext.form.Label({
        name: 'lblHelp'
    });

    var txtEskiSifre = new Ext.form.TextField({
        inputType: 'password',
        name: 'eskiSifre',
        fieldLabel: 'Eski Şifre '
    });
    var txtYeniSifre = new Ext.form.TextField({
        inputType: 'password',
        name: 'yeniSifre',
        fieldLabel: 'Yeni Şifre ',
        vtype: 'password',
        minLength : 8
    });
    var txtYeniSifreTekrar = new Ext.form.TextField({
        inputType: 'password',
        name: 'yeniSifreTekrar',
        fieldLabel: 'Yeni Şifre Tekrar ',
        vtype: 'password',
        minLength : 8
    });

    var btnSifreDegisOk = new Ext.Button({
        text: 'Kaydet',
        iconCls: 'kaydet',
        formBind: true,
        handler: function (btn) {
            if(formSifreDegis.getForm().getValues().yeniSifre !== formSifreDegis.getForm().getValues().yeniSifreTekrar){
                showErrorMsg('Yeni şifre alanları eşleşmemektedir.');
                return;
            }
            Ext.Ajax.request({
                url: '../rest/kullanicilar/sessionKulSifreDegistir.ajax',
                params: {
                    data: Ext.encode(formSifreDegis.getForm().getValues())
                },
                success: function (response, options) {
                    var res = Ext.decode(response.responseText);
                    if (!res.success) {
                        showWarningMsg(res.message);
                        return;
                    }
                    showSaveSuccessMsg();
                    winOfSifreDegisPanel.hide();
                    Ext.Ajax.request({
                        url: '../gen/logout.ajax',
                        success: function (r, o) {
                            document.location.href = '../gen/anasayfa.htm';
                        }
                    });

                },
                failure: function (response, options) {
                    showErrorMsg();
                }
            });
        }
    });

    var btnSifreDegisIptal = new Ext.Button({
        text: 'İptal',
        iconCls: 'iptal-script',
        formBind: false,
        handler: function () {
            winOfSifreDegisPanel.hide();
        }
    });

    var btnWinOk = new Ext.Button({
        text: 'Tamam',
        iconCls: 'ok',
        formBind: false,
        handler: function () {
            winHelp.hide();
        }
    });

    var formSifreDegis = new Ext.FormPanel({
        frame: true,
        border: false,
        bodyStyle: 'padding:3px',
        width: 300,
        height: 180,
        header: false,
        monitorValid: true,
        defaults: {
            allowBlank: false,
            width: '95%'
        },
        items: [{html:"Parolanızda, en az bir büyük harf, bir küçük harf ve rakam ve noktalama işareti bulunmalıdır. Parola Uzunluğu en az 8 karakter olmalıdır."},txtEskiSifre, txtYeniSifre, txtYeniSifreTekrar],
        buttonAlign: 'right',
        buttons: [btnSifreDegisOk, btnSifreDegisIptal]
    });

    var formHelp = new Ext.FormPanel({
        frame: true,
        border: false,
        bodyStyle: 'padding:3px',
        width: 300,
        height: 140,
        header: false,
        monitorValid: true,
        defaults: {
            allowBlank: false,
            width: '95%'
        },
        items: [lblHelp],
        buttonAlign: 'center',
        buttons: [btnWinOk]
    });

    var winOfSifreDegisPanel = new Ext.Window({
        layout: 'fit',
        title: 'Şifre Değiştirme Penceresi',
        modal: true,
        closeAction: 'hide',
        items: [formSifreDegis]
    });

    var winHelp = new Ext.Window({
        layout: 'fit',
        title: 'Yardım',
        modal: true,
        closeAction: 'hide',
        items: [formHelp]
    });
    var EgitimTalepButton = new Ext.Button({
        text: 'Eğitim Talep',
        iconCls: 'yeni',
        minWidth: 60,
        handler: function () {
            return GOC.callMenuByMenuId(108, null, false);
            // callMenuByMenuId(108);
            /**
             * Ext.Ajax.request({ url : '../rest/sendMessages.ajax', success : function(response, options) { console.log('Request is successful!'); } });
             */
        }
    });

    var btn0 = new Ext.Button({
        iconCls: 'ekle',
        text : 'Sık Kullanılan Ekle',
        handler: function () {
            this.btnSil = new Ext.Button({
                text: 'Sil',
                iconCls: "sil48",
                formBind: true
            });

            var object2 = new Object({
                autoLoadStore: true,
                forceFit: true,
                paging: false,
                url: '../gen/getMenuKullaniciKisayollar.ajax',
                records: ["name:kullaniciKisayolId", "name:menuId", "name:menuAdi;header:Menü"],
                width: 300,
                columnWidth: .50,
                region: 'east',
                split: true,
                tbarLeft: [this.btnSil],
                hideHeaders: true
            });

            var grid2 = createDynamicGrid(object2);


            //---------------------------
            this.btnEkle = new Ext.Button({
                text: 'Ekle',
                iconCls: "ekle48",
                formBind: true
            });

            this.btnEkle.handler = function () {
                var selNode = valTree.getSelectionModel().getSelectedNode();

                if (selNode == null) {
                    showErrorMsg("Ekleme Yapılacak Menuyu Seçiniz");
                    return;
                }

                for (var count = 0; count < grid2.getStore().getTotalCount(); count++) {
                    if (grid2.getStore().getAt(count).data.objectId == selNode.attributes.objectId) {
                        showErrorMsg("Seçmiş olduğunuz menu kısayıllar içinde bulunuyor!");
                        return;
                    }
                }

                Ext.Ajax.request({
                    url: "../gen/setMenuKullaniciKisayollar",
                    params: {
                        menuId: selNode.attributes.objectId
                    },
                    success: function (response, options) {
                        var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                        if (!jsonData.success) {
                            showErrorMsg(jsonData.message);
                            return;
                        }
                        grid2.getStore().load();
                    }
                });
            };

            this.btnSil.handler = function () {
                var record = grid2.getSelectionModel().getSelected();
                if (record == null) {
                    showErrorMsg("Silmek İstediğiniz Kaydı Seçiniz");
                    return;
                }
                Ext.Ajax.request({
                    url: "../gen/deleteMenuKullaniciKisayollar",
                    params: {
                        menuId: record.data.menuId
                    },
                    success: function (response, options) {
                        grid2.getStore().load();
                    }
                });
            };

            this.valTree = new Ext.tree.TreePanel({
                animate: true,
                loadMask: true,
                autoScroll: true,
                nodeType: 'async',
                waitMsg: 'Yükleniyor...',
                loader: new Ext.tree.TreeLoader({
                    dataUrl: '../gen/getMenuTreeByKullanici.ajax'
                }),
                containerScroll: true,
                border: false,
                disabled: false,
                id: 'root',
                forceFit: true,
                region: 'center',
                split: true,
                root: {
                    nodeType: 'async',
                    text: 'Menu',
                    draggable: false,
                    id: 'root'
                },
                rootVisible: false,
                tbar: [this.btnEkle]
            });
            var valTree = this.valTree;
            //-------------------------


            var winShortcut = new Ext.Window({
                title: 'Kısayol Ekle',
                layout: 'column',
                width: 650,
                height: 500,
                modal: true,
                layout: 'border',
                items: [valTree, grid2]
            }).show();

        }
    });

    this.btn0 = btn0;

    var html = "<header class=\"headerMenu blue\" style='margin-left: 5px'>\n" +
        "\t<ul class='header_ul'>\n" +
        "\t\t<li class='header_ul_li'><a href=\"javascript:void(0);\" class=\"header_ul_a active\" style='width: 50px; height: 10px'><image style='margin-left: 30%; margin-top: -8%' src='../images/akgunicon.ico'></image></a></li>\n" +
        "\t</ul>\n" +
        "</header>";

    var btnMenuForm = new Ext.Button({
        text : 'Menü',
        html: html,
        handler: function () {
            if (menuWindow != null && menuWindow.isVisible())
                menuWindow.hide();
            else
                showMenuForm();
        }
    });

    function changeActiveLang(language) {
        Ext.Ajax.request({
            url: "../rest/kullanicilar/changeActiveLang.ajax",
            params: {
                language: language
            },
            success: function (response, options) {
            },
            failure: function (response, options) {
            },
            callback: function () {
                document.location.href = '../gen/anasayfa.htm';
            }
        });
    }

   var languageTr = new Ext.Button({
        iconCls: 'flag-tr',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-tr");
        }
    });

    var languageEn = new Ext.Button({
        iconCls: 'flag-us',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-us");
        }
    });

    var languageRu = new Ext.Button({
        iconCls: 'flag-ru',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-ru");
        }
    });

    var languageAz = new Ext.Button({
        iconCls: 'flag-az',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-az");
        }
    });

    var languageAr = new Ext.Button({
        iconCls: 'flag-ar',
        minWidth: 60,
        handler: function () {
            changeActiveLang("Flag-ar");
        }
    });

    var languageKz = new Ext.Button({
        iconCls: 'flag-kz',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-kz");
        }
    });

    var languageGer = new Ext.Button({
        iconCls: 'flag-ger',
        minWidth: 60,
        handler: function () {
            changeActiveLang("flag-ger");
        }
    });

    var menuLanguageSplit = new Ext.SplitButton({
            tooltip: '<b>Dil</b>',
            iconCls: 'flag-tr',
            align: 'right',
            menu: new Ext.menu.Menu({
                items: [languageTr, languageEn, languageRu, languageAz, languageAr, languageKz, languageGer]
            })
        });

        var btnHelp = new Ext.Button({
            iconCls: 'help',
            minWidth: 60,
            handler: function () {
                GOC.callMenuByMenuId(10073609, function (cnt) {
                    var cntWin = new cnt().init();
                    cntWin.getWindow().show();
                    setTimeout(function () {
                        if (Ext.getCmp("menulerHelpGridUniqId").collapsed) {
                            Ext.getCmp("menulerHelpGridUniqId").toggleCollapse(false);
                        }
                    }, 2000);
                }, true);
            }
        });
    function addTooltipToGrid(value, metadata, record, rowIndex, colIndex, store) {
        var message = record.data.baslangicTar + "<b> - </b> " + record.data.bitisTar;
        metadata.attr = 'ext:qtip="<b>Yayınlanma Tarihi : </b><br>' + message + '"';
        return value;
    }

    DuyurularAdminUi = Ext.extend(Ext.grid.GridPanel, {
        title: 'Duyurular Listesi',
        height: 400,
        autoWidth: true,
        frame: true,
        loadMask: {
            msg: language.UY011
        },
        viewConfig: {
            forceFit: true,
            getRowClass: function (record, rowIndex, rp, ds) { // rp = rowParams
                if (record.data.renk == 1) {
                    return 'light-red-row';
                } else if (record.data.renk == 2) {
                    return 'light-orange-row';
                } else if (record.data.renk == 3) {
                    return 'green-row';
                }
            }
        },
        stripeRows: true,
        autoLoad: false,
        initComponent: function () {
            var recPersonelSicil = new Ext.data.Record.create([{
                name: 'duyuruId'
            }, {
                name: 'duyuru'
            }, {
                name: 'uygulamaId' // buraya bak
            }, {
                name: 'baslangicTar'
            }, {
                name: 'baslangicSaat'
            }, {
                name: 'bitisSaat'
            }, {
                name: 'bitisTar'
            }, {
                name: 'duyuruNo'
            }, {
                name: 'duyuru2'
            }, {
                name: 'fontSize'
            }, {
                name: 'eklenmeTar'
            }, {
                name: 'kullaniciId'
            }, {
                name: 'aktif'
            }, {
                name: 'konu'
            }, {
                name: 'duyuruGonderenPersonelId'
            }, {
                name: 'duyuruGonderenBirimId'
            }, {
                name: 'gonderimTuru'
            }, {
                name: 'adSoyad'
            }, {
                name: 'personelId'
            }, {
                name: 'unvanAdi'
            }, {
                name: 'kullaniciAdSoyad'
            }, {
                name: 'count'
            }, {
                name: 'isAnket'
            }, {
                name: 'renk'
            }]);

            this.editor = new Ext.ux.grid.RowEditor({
                clicksToEdit: 2,
                saveText: language.UY003,
                cancelText: language.UY017
            });
            this.editor.on({
                scope: this,
                kaydet: function (roweditor, changes, record, rowIndex) {
                    this.editor.grid.getStore().commitChanges();
                },
                iptal: function (roweditor, changes, record, rowIndex) {
                    if (typeof(record.data.id) == 'undefined' || record.data.id == '') {
                        roweditor.grid.removeRecord(record);
                    }
                    this.editor.grid.getView().refresh();
                }
            });

            var storePersonelUnvan = new Ext.data.JsonStore({
                autoDestroy: true,
                url: '../rest/personelSicil/getDuyuruyuControl.ajax',
                root: 'data',
                params: {
                    start: 0,
                    limit: 20
                },
                totalProperty: 'totalCount',
                fields: recPersonelSicil,
                pruneModifiedRecords: true
            });

            this.chkIlaniKapatan = new Ext.form.Checkbox({
                boxLabel: 'Tümünü Göster',
                name: 'okudum'
            });

            this.isAnket = new Ext.form.TextField({
                hidden: true,
                name: 'isAnket'
            });

            this.btnDetay = new Ext.Button({
                tooltip: '<b>Duyuru detayı</b> için tıklayınız...',
                iconCls: 'duyuru',
                text: 'Duyuru Detayı',
                rowspan: 3,
                disabled: true,
                handler: function () {
                }
            });

            this.btnPersoneller = new Ext.Button({
                tooltip: '<b>Okuyan Personeller</b> için tıklayınız...',
                iconCls: 'personeller',
                text: 'Okuyan Personel',
                rowspan: 3,
                disabled: true,
                handler: function () {
                }
            });

            this.btnsil = new Ext.Button({
                tooltip: '<b>Silmek</b> için tıklayınız...',
                iconCls: 'sil',
                text: 'Sil',
                rowspan: 3,
                disabled: true,
                handler: function () {
                }
            });
            this.tbar = [this.btnDetay, '-', this.chkIlaniKapatan, this.isAnket];
            this.store = storePersonelUnvan;

            this.bbar = loadPaging(storePersonelUnvan, 20);
            this.bbar.refresh.hide();
            var txtWidth = '%100';
            this.plugins = [];
            this.cm = new Ext.grid.ColumnModel({
                defaults: {
                    sortable: true
                },
                columns: [new Ext.ux.grid.PagingRowNumberer(), {
                    header: 'Kimden',
                    dataIndex: 'adSoyad',
                    renderer: addTooltipToGrid
                }, {
                    header: 'Konu',
                    dataIndex: 'konu',
                    renderer: addTooltipToGrid
                }, {
                    header: 'Tarih',
                    dataIndex: 'eklenmeTar',
                    renderer: addTooltipToGrid
                }]
            });
            this.selModel = new Ext.grid.RowSelectionModel({
                singleSelect: true
            });
            DuyurularAdminUi.superclass.initComponent.call(this);
        },
        getSelected: function () {
            return this.selModel.getSelected();
        },
        getSelectedData: function () {
            return this.getSelected().data;
        },
        removeRecord: function (rec) {
            this.store.remove(rec);
        },
        loadStore: function () {
            // this.store.load.defer(500, this.store);
            this.store.load.defer(0, this.store, [{
                params: {
                    start: 0,
                    limit: 20
                }
            }]);
        },
        insertNewRecord: function () {
            this.store.insert(0, new this.store.recordType());
        },
        stopEditing: function () {
            if (this.editor) {
                this.editor.stopEditing();
            }
        },
        startEditing: function (index) {
            if (this.editor) {
                this.editor.startEditing(index);
            }
        },
        hasSelected: function () {
            if (this.selModel.getSelected() == null) {
                return false;
            } else {
                return true;
            }
        }
    });

    DuyurularAdminGrid = Ext.extend(DuyurularAdminUi, {
        initComponent: function () {
            DuyurularAdminGrid.superclass.initComponent.call(this);
        }
    });
    Ext.reg('DuyurularAdminGrid', DuyurularAdminGrid);

    var txtKimden = new Ext.form.TextField({
        fieldLabel: 'Kimden',
        name: 'kimden',
        width: 100
    });

    var radioTar = new Ext.form.RadioGroup({
        hideLabel: true,
        items: [{
            boxLabel: 'Eklenme Tar',
            name: 'tar',
            inputValue: '0'
        }, {
            boxLabel: 'Başlangıç Tar',
            name: 'tar',
            inputValue: '1',
            checked: true
        }, {
            boxLabel: 'Bitiş Tar',
            name: 'tar',
            inputValue: '2'
        }]
    });

    var txtBasTar = new Ext.form.DateField({
        hideLabel: true,
        format: 'd/m/Y',
        width: 100,
        value: new Date(),
        altFormats: 'd/m/Y',
        name: 'baslangicTarihi'
    });
    var txtBitisTar = new Ext.form.DateField({
        hideLabel: true,
        format: 'd/m/Y',
        altFormats: 'd/m/Y',
        width: 100,
        value: new Date(),
        name: 'bitisTarihi' // ,
    });

    var displayField = new Ext.form.DisplayField({
        value: '&nbsp&nbsp&nbsp - &nbsp&nbsp&nbsp'
    });

    var btnArama = new Ext.Button({
        tooltip: '<b>Aramak </b> için tıklayınız...',
        iconCls: 'ara32Big',
        scale: 'large',
        rowspan: 3,
        handler: function () {
        }
    });

    var dosya = new DuyurularAdminGrid();
    dosya.getSelectionModel().addListener('rowselect', function (selModel, rowIndex, rec) {
        if (rec.data.isAnket) {
            dosya.btnDetay.disable();
        } else if (!rec.data.isAnket) {
            dosya.btnDetay.enable();
        }

    });
    var toplam = 0;

    function duyuruGrid() {
        dosya.getStore().load({
            params: {
                start: 0,
                limit: 20,
                okudum: dosya.chkIlaniKapatan.getValue(),
                // radioTar : radioTar.getValue(),
                baslangicTarihi: txtBasTar.getValue(),
                bitisTarihi: txtBitisTar.getValue()
                // kimden : txtKimden.getValue()
            },
            callback: function (recs, options, success) {
                var strDuyuru;
                var sayAnket = 0;
                var sayDuyuru = 0;
                if (recs.length > 0) {
                    var i = 0;
                    for (i = 0; i < recs.length; i++) {
                        if (recs[i].data.isAnket) {
                            sayAnket++;
                        } else {
                            sayDuyuru++;
                        }
                    }

                    if (sayAnket == 0 && sayDuyuru != 0) {
                        showNotification('Bilgilendirme', '<b>' + "" + sayDuyuru + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Duyurunuz</font></b>'
                            + ' bulunmaktadır.');
                    } else if (sayAnket != 0 && sayDuyuru == 0) {
                        showNotification('Bilgilendirme', '<b>' + "" + sayAnket + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Anketiniz</font></b>'
                            + ' bulunmaktadır.');
                    } else {
                        showNotification('Bilgilendirme', '<b>' + "" + sayDuyuru + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Duyurunuz</font></b>' + " ve "
                            + '<b>' + sayAnket + " tane" + '</b>' + " okunmamış" + '<b><font size=\"2\" face=\"arial\" color=\"red\"> Anketiniz </font></b>' + ' bulunmaktadır.');
                    }
                    toplam = 0;
                    toplam = sayAnket + sayDuyuru;
                    // console.log(toplam);

                    if (toplam > 0) {
                        viewport.items.items[1].setTitle('Duyurular Listesi' + '(Toplam Okunmamış \t' + toplam + ')');
                    } else {
                        viewport.items.items[1].setTitle('Duyurular Listesi');
                    }
                }
            }
        });
    }

    // setInterval(duyuruGrid, 180000);
    function controlOfDuyuru() {
    }

    function loadMenuComponents() {
        Ext.Ajax.request({
            url: '../rest/buildTreeComponents.ajax?className=com.akgun.kys.model.kys.Menuler&id=menuId&parentId=ustMenuId&text=menuAdi&rootId=0',
            success: function (response, options) {
                var jsonData = Ext.util.JSON.decode(response.responseText.trim());
                var a = eval(jsonData.menu);
                var b = eval(jsonData.combo);
                Ext.getCmp("headerPanel").getTopToolbar().removeAll();
                Ext.getCmp("headerPanel").getTopToolbar().addSeparator();
                Ext.getCmp("headerPanel").getTopToolbar().add(a);

                b.on('select', function (combo, record, numIndex) {
                    GOC.callMenuByMenuId(combo.getValue(), null,true);
                });
                Ext.Ajax.request({
                    url: '../gen/getMenuKullaniciKisayollar',
                    success: function (resp, opt) {
                        var jsonData = Ext.decode(resp.responseText.trim());
                        var data = jsonData.data;

                        Ext.getCmp("headerPanel").getTopToolbar().add('->');

                        var dateTime = new Date();
                        var year = dateTime.getFullYear();
                        var month = dateTime.getMonth() + 1;
                        var day = dateTime.getUTCDate();
                        if (day < 10) {
                            day = '0' + day;
                        }
                        if (month < 10) {
                            month = '0' + month;
                        }

                        var dayStr = '';
                        if (dateTime.getDay() == 1) {
                            dayStr = 'Pazartesi';
                        } else if (dateTime.getDay() == 2) {
                            dayStr = 'Salı';
                        } else if (dateTime.getDay() == 3) {
                            dayStr = 'Çarşamba';
                        } else if (dateTime.getDay() == 4) {
                            dayStr = 'Perşembe';
                        } else if (dateTime.getDay() == 5) {
                            dayStr = 'Cuma';
                        } else if (dateTime.getDay() == 6) {
                            dayStr = 'Cumartesi';
                        } else if (dateTime.getDay() == 7) {
                            dayStr = 'Pazar';
                        } else {
                        }

                        var hour = dateTime.getHours();
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        var min = dateTime.getMinutes();
                        if (min < 10) {
                            min = '0' + min;
                        }

                        var bosluk = '&nbsp;&nbsp;';
                        var bosluk2 = '&nbsp;&nbsp;';

                              Ext.Ajax.request({
                            url: '../rest/kullanicilar/getSessionUserNameSurname.ajax',
                            success: function (response, options) {
                                var res = Ext.decode(response.responseText);
                                window.userId = res.kullaniciId;
                                window.isSignumAktif = res.isSignumAktif;
                                window.isTpnAktif = res.isTpnAktif;
                                window.tpnErmedExePath = res.tpnErmedExePath;
                                window.tpnErmedEczaneExePath = res.tpnErmedEczaneExePath;
                                window.isZeissAktif = res.isZeissAktif;
                                window.zeissOctExePath = res.zeissOctExePath;
                                window.isSiramatikAktif = res.isSiramatikAktif;
                                window.hastaCagir = res.hastaCagir;
                                window.tesisSinifi = res.tesisSinifi;
                                window.upToDateSRCSYS = res.upToDateSRCSYS;
                                window.euclidAktif = res.euclidAktif;
                                window.isMerkezSunucu = res.isMerkezSunucu;




                                if (window.userId) {

                                }

                                window.userAdSoyad = res.adSoyad;
                                window.sessionPersonelId = res.personelId;
                                window.personelTcKimlikNo = res.personelTcKimlikNo;
                                window.sessionPersonelAdSoyad = res.personelAdSoyad;
                                window.sessionPersonelIsDoctor = res.personelIsDoctor;
                                window.sessionPersonelIsAsistan = res.personelIsAsistan;
                                window.sessionPersonelTipi = res.personelTipi;
                                window.sessionKurumId = res.kurumId;
                                window.sessionKurumAdi = res.kurumAdi;
                                window.sessionKullaniciKod = res.kullaniciKod;
                                window.sessionKullaniciId = res.kullaniciId;
                                window.autolabelerCihazIp = res.autolabelerCihazIp;
                                window.sessionHostName = res.hostName;
                                window.sessionMacAddress = res.macAddress;
                                window.sessionEmail = res.email;
                                window.sessionTelefon = res.telefon;
                                window.sessionUnvanAdi = res.unvanAdi;
                                window.sessionCinsiyet = res.cinsiyet;


                                adSoyad = 'Kullanıcı:&nbsp;' + res.adSoyad + '<br/>Kurum:&nbsp;' + res.kurumAdi;
                                var dispAdSoyad = new Ext.Button({
                                    tooltip: '<b>Bilgilerinizi görüntülemek</b> için tıklayınız...<br/>' + '<b><font color="#d94a38">' + adSoyad + '</font></b>',

                                    iconCls: 'kullanicilar',
                                    cls: 'x-btn-over',
                                    ctCls: 'x-btn-over',
                                    clearCls: 'x-btn-over',
                                    handler: function (btn) {
                                        var winKullaniciBilgi = new KullaniciBilgiWindow();
                                        var panelKullaniciBilgi = winKullaniciBilgi.panelKullaniciBilgi;
                                        var formKullaniciBilgi = panelKullaniciBilgi.formKullaniciBilgi;

                                        winKullaniciBilgi.setAnimateTarget(btn.getId());
                                        winKullaniciBilgi.addListener('beforeshow', function (w) {
                                            formKullaniciBilgi.getForm().setValues(res);
                                        });

                                        winKullaniciBilgi.setTitle('<font color="#d94a38">' + adSoyad + ' Ait Bilgi Penceresi' + '</font>');
                                        winKullaniciBilgi.show();

                                        var imgKullPanel = panelKullaniciBilgi.imgKullPanel;
                                        var imgImzaPanel = panelKullaniciBilgi.imgImzaPanel;

                                        // ---- foto -------//
                                        imgKullPanel.uploadParams = {
                                            kullaniciId: res.kullaniciId
                                        }
                                        imgKullPanel.deleteParams = {
                                            kullaniciId: res.kullaniciId,
                                            fotoSil: true
                                        }
                                        imgKullPanel.downloadUrlSuffix = "?kullaniciId=" + res.kullaniciId;
                                        imgKullPanel.imageRefresh();
                                        // ---- foto -------//

                                        // ---- imza -------//
                                        imgImzaPanel.uploadParams = {
                                            kullaniciId: res.kullaniciId
                                        }
                                        imgImzaPanel.deleteParams = {
                                            kullaniciId: res.kullaniciId,
                                            imzaSil: true
                                        }
                                        imgImzaPanel.downloadUrlSuffix = "?kullaniciId=" + res.kullaniciId;
                                        imgImzaPanel.imageRefresh();
                                        // ---- imza -------//
                                    }
                                });

                                var spacer = new Ext.Toolbar.Spacer({
                                    width: 15
                                });
                                var spacer2 = new Ext.Toolbar.Spacer({
                                    width: 15
                                });

                                Ext.getCmp("headerPanel").getTopToolbar().add(sifreDegisButton);
                                Ext.getCmp("headerPanel").getTopToolbar().addSeparator();
                                Ext.getCmp("headerPanel").getTopToolbar().add(cikisButton);
                                Ext.getCmp("headerPanel").doLayout();
                                controlOfDuyuru();

                            }
                        });
                    }

                });
            }
        });

    }

    dosya.chkIlaniKapatan.on('check', function (checkbox, isChecked) {
        if (isChecked) {
            dosya.getStore().load({
                params: {
                    start: 0,
                    limit: 20,
                    okudum: dosya.chkIlaniKapatan.getValue(),
                    // radioTar : radioTar.getValue(),
                    baslangicTarihi: txtBasTar.getValue(),
                    bitisTarihi: txtBitisTar.getValue(),
                    ilk: 1
                    // kimden : txtKimden.getValue()
                }
            });
        } else {
            dosya.getStore().load({
                params: {
                    start: 0,
                    limit: 20,
                    okudum: dosya.chkIlaniKapatan.getValue(),
                    // radioTar : radioTar.getValue(),
                    baslangicTarihi: txtBasTar.getValue(),
                    bitisTarihi: txtBitisTar.getValue(),
                    ilk: 1
                    // kimden : txtKimden.getValue()
                }
            });
        }
    });

    dosya.btnDetay.on('click', function () {
        Ext.Ajax.request({
            url: '../rest/getmenubymenuid.ajax',
            method: 'GET',
            success: function (r, o) {
                var x = Ext.decode(r.responseText);
                addComponentFromUrl(x.data[0].id);
                currentMenuId = dosya.getSelected().data;
            },
            params: {
                menuId: 6021
                // menuId //6002//157//158//108//144//105//132//108//
            }
        });
    });

    var formDuyuruArama = new Ext.FormPanel({
        frame: true,
        border: false,
        bodyStyle: 'padding:3px',
        autoHeight: true,
        autoWidth: true,
        header: false,
        autoScroll: true,
        monitorValid: true,
        defaults: {
            width: '95%'
        },
        items: [txtKimden, radioTar, {
            layout: 'column',
            items: [txtBasTar, displayField, txtBitisTar]
        }

        ],
        buttonAlign: 'right',
        buttons: [btnArama]
    });

    btnArama.on('click', function () {
        dosya.getStore().load({
            params: {
                start: 0,
                limit: 20,
                okudum: dosya.chkIlaniKapatan.getValue(),
                radioTar: radioTar.getValue(),
                baslangicTarihi: txtBasTar.getValue(),
                bitisTarihi: txtBitisTar.getValue(),
                kimden: txtKimden.getValue()
            },
            callback: function (recs, options, success) {
                if (!success) {
                    AlertBox.show(language.CAS5917, 'Başlangıç Tarihi Bitiş Tarihinden Önce olamaz !', "warning", {
                        dock: 'top',
                        timeout: 1
                    });
                } else {
                    var strDuyuru;
                    var sayAnket = 0;
                    var sayDuyuru = 0;
                    if (recs.length > 0) {
                        var i = 0;
                        for (i = 0; i < recs.length; i++) {
                            if (recs[i].data.isAnket) {
                                sayAnket++;
                            } else {
                                sayDuyuru++;
                            }
                        }

                        if (sayAnket == 0 && sayDuyuru != 0) {
                            showNotification('Bilgilendirme', '<b>' + "" + sayDuyuru + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Duyurunuz</font></b>'
                                + ' bulunmaktadır.');
                        } else if (sayAnket != 0 && sayDuyuru == 0) {
                            showNotification('Bilgilendirme', '<b>' + "" + sayAnket + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Anketiniz</font></b>'
                                + ' bulunmaktadır.');
                        } else {
                            showNotification('Bilgilendirme', '<b>' + "" + sayDuyuru + " tane" + '</b> okunmamış ' + '<b><font size=\"2\" face=\"arial\" color=\"red\">Duyurunuz</font></b>'
                                + " ve " + '<b>' + sayAnket + " tane" + '</b>' + " okunmamış" + '<b><font size=\"2\" face=\"arial\" color=\"red\"> Anketiniz </font></b>'
                                + ' bulunmaktadır.');
                        }
                        toplam = 0;
                        toplam = sayAnket + sayDuyuru;
                        // console.log(toplam);
                        if (toplam > 0) {
                            viewport.items.items[1].setTitle("Duyurular Listesi(Toplam Okunmamis " + toplam + ")");
                        } else {
                            viewport.items.items[1].setTitle('Duyurular Listesi');
                        }
                    }
                }

            }
        });
    });


    /**
     * Dinamik olarak kullanılacak Comboboxlar içidir
     */
    DinamikComboBox = Ext.extend(Ext.form.ComboBox, {
        selectOnFocus: true,
        emptyText: language.UY019,
        forceSelection: false,
        autoScroll: true,
        autoLoadStore: false,
        triggerAction: 'all',
        // typeAhead: false,
        enableKeyEvents: true,
        minChars: 3,
        editable: true,
        listEmptyText: 'Sonuç Bulunamadı...',
        allowBlank: false,
        pageSize: 50,
        mode: 'remote',
        initComponent: function () {

            var config = {
                // pageSize : typeof(this.pageSize) == 'undefined' ? 'local' : this.pageSize,
                mode: typeof(this.mode) == 'undefined' ? 'local' : this.mode,
                valueField: this.valueField,
                displayField: this.displayField,
                store: typeof(this.store) == 'undefined' ? new Ext.data.JsonStore({
                    proxy: new Ext.data.HttpProxy({
                        url: this.url,
                        method: 'GET'
                    }),
                    autoLoad: typeof(this.autoLoadStore) == 'undefined' ? false : this.autoLoadStore,
                    fields: this.fields,
                    totalProperty: 'totalCount',
                    root: 'data',
                    sortInfo: {
                        field: this.displayField
                    }
                }) : this.store
            };
            Ext.apply(this, config);
            Ext.apply(this.initialConfig, config);
            DinamikComboBox.superclass.initComponent.apply(this, arguments);
        },
        onRender: function () {
            DinamikComboBox.superclass.onRender.apply(this, arguments);
        }
    });

    Ext.reg('DinamikComboBox', DinamikComboBox);


    var dashboardX = new DashboardPanelController();

    var viewMenuFormPanel = new ViewMenuFormPanel();

    var dashboard = dashboardX.init();

    var surumNotlariX = new SurumNotlariPanelController();


    var surumNotlari = surumNotlariX.init();

    var viewport = new Ext.Viewport({
        id: 'mainPort',
        layout: 'border',
        border: false,
        items: [{
            region: 'north',
            id: 'headerPanel',
            hidden: false,
            height: 20,
            border: false,
            collapsible: false,
            // split: true,
            // collapseMode: 'mini',
            xtype: 'panel',
            tbar: ['->', btnHelp,'->', languageTr, '-', languageEn, '-', languageAr, '-', languageAz, '-', languageKz, '-', languageRu, '-', languageGer]
        },
            {
                region: 'center',
                id: 'centerPanel',
                xtype: 'tabpanel',
                frame: true,
                defaults: {
                    closable: true
                },
                activeTab: 0,
                border: false,
                autoSroll: true,

                plugins: new Ext.ux.TabCloseMenu(),
                enableTabScroll: true,
                items: [{
                    id: 'anaSayfaDuyuru',
                    title: 'Ana Sayfa',
                    iconCls: 'home',
                    layout: 'fit',
                    tbar: [],
                    items: [viewMenuFormPanel],
                    closable: false
                }
                ],
                listeners: {
                    tabchange: function (tabPanel, tab) {
                        //console.log('activeTabLoaded:'+activeTabLoaded+' tabchange:'+tabPanel.id + ' ' + tab.id+" "+menuElementMap[tab.id]);
                        if (!activeTabLoaded) {
                            return;
                        }
                        Ext.Ajax.request({
                            url: '../gen/centralTabChanged.load',
                            method: 'GET',
                            params: {
                                menuId: menuElementMap[tab.id]
                            },
                            success: function (res) {
                                var element = eval(res.responseText);
                            }
                        });
                        Ext.getCmp("anaSayfaDuyuru").doLayout();
                        //Ext.getCmp("anaSayfaSurumNotlari").doLayout();
                    }
                },
                keys: keys
            }, {
                region: 'south',
                id: 'southPanel',
                items: [{
                    xtype: 'label',
                    html: '<div align="center"><font color="black"><img  src= "../images/akgunicon.png" alt="akgunIcon" />&nbsp;&nbsp;<b>Akgün Yazılım</b> © ' + new Date().getFullYear()
                    + ' &nbsp;&nbsp;WebHBYS V:'+ version +'&nbsp;&nbsp; Tüm hakları saklıdır.</font></div>'
                }],
                height: 20,
                collapsible: false,
                collapsed: true,
                split: true,
                collapseMode: 'mini',
                border: false
            },
            {
                region: 'east',
                id: 'mesajPanel',
                items: [
                    {
                        html: '<div align="center"><iframe height="97%" width="100%"  src="" id="akgunMessageFrame" style="border:4px solid tomato;"></iframe></div>'
                    }
                ],
                height: 20,
                collapsible: false,
                collapsed: false,
                split: true,
                // collapseMode: 'mini',
                border: false
            }],
        listeners: {
            beforerender: function (comp) {
                Ext.getCmp('mesajPanel').setWidth("0");
            }
        }
    });

    Ext.Ajax.request({
        url: '../gen/getAktifTab.load',
        method: 'GET',
        success: function (res) {
            var jsonData = Ext.util.JSON.decode(res.responseText.trim());
            if (jsonData.aktifTab != null && jsonData.aktifTab != 'undefined') {
                GOC.callMenuByMenuId(jsonData.aktifTab);
            }
            activeTabLoaded = true;
        }
    });



    function controlOfUser() {
        loadMenuComponents();

        if (toplam > 0) {
            viewport.items.items[1].setTitle('Duyurular Listesi' + '(Toplam Okunmamış \t' + toplam + ')');
        } else {
            viewport.items.items[1].setTitle('Duyurular Listesi');
        }

        function callMenuAnasayfa(id) {
            Ext.Ajax.request({
                url: '../rest/getmenubymenuid.ajax',
                method: 'GET',
                success: function (r, o) {
                    var x = Ext.decode(r.responseText);
                    addComponentFromUrl(x.data[0].id);
                    currentMenuId = x.data[0].id;
                },
                params: {
                    menuId: id
                }
            });
        }

        var getBodyHeight = function () {
            return Ext.getBody().getHeight() - 60;
        };

        var mask = new Ext.LoadMask(viewport.getEl(), {
            msg: language.UY026
        });
        Ext.Ajax.on('beforerequest', function (conn, options) {
            if (!options.silent){
                mask.show();
            }
        });
        Ext.Ajax.on('requestcomplete', function (conn, response, options) {
            mask.hide();
        });
        Ext.Ajax.on('requestexception', function (conn, response, options) {
            mask.hide();
        });

        Ext.form.DateField.prototype.altFormats = "d/m/Y"; // Bütün dateFieldlerin altFormats ı değiştiriliyor. Önder DAL


    }

    try {
        // menuId tepede set edilirse direk onu acmak icin kullanilir. Bu parametre en son parametre olmak zorunda.
        if (window.top.location.search.indexOf('menuId') > 0) {
            addComponentFromUrl(window.top.location.search.substring(window.top.location.search.indexOf('menuId') + 7));
        }
    }catch (e) {

    }


});

function showMenuForm() {
}

function menuIframeLoadFunc() {
    //menuWindow.show();
}

function menuFormMenuAc(menuId) {
    //menuFormHide();
    GOC.callMenuByMenuId(menuId, null, false);
}

function menuFormShow() {
    showMenuForm();
}

function menuFormHide() {
    //menuWindow.hide();
}