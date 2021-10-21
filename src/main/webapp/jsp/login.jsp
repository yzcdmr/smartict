<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <script>
        var language = [];
        language.UY011='Yükleniyor';
    </script>
<%--    <link rel="shortcut icon" href="../images/akgunicon.ico">--%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="expires" content="86400"/>
    <title>${title}</title>
    <link type="text/css" rel="stylesheet" href="../scripts/ext34x/resources/css/ext-all.css">
<%--    <link type="text/css" rel="stylesheet" href="../styles/baseStyle.css">--%>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <%--<script src="../scripts/ExtUx/property/property.js"></script>--%>
    <script src="../scripts/ext34x/adapter/ext/ext-base.js"></script>
    <script src="../scripts/ext34x/ext-all.js"></script>
    <%--<script src="../scripts/kbs/onlineSiparisTakip/login/js/md5.js"></script>--%>
    <%--<script src="../scripts/kbs/onlineSiparisTakip/login/js/captcha.js"></script>--%>
    <script src='https://www.google.com/recaptcha/api.js?render=explicit' async></script>
    <script src="../scripts/ExtUx/MultiGroupGrid/MultiGroupingStore.js"></script>
    <script src="../scripts/ExtUx/MultiGroupGrid/MultiGroupingView.js"></script>
    <script src="../scripts/ExtUx/Ext.ux.grid.PagingRowNumberer.js"></script>
    <script src="../scripts/ExtUx/Ext.ux.grid.AutoSizeColumns.js"></script>
    <script src="../scripts/ExtUx/Spotlight.js"></script>
<%--    <script src="../scripts/AkgunUx/generic.js"></script>--%>
<%--    <script src="../scripts/dynamicGrid/createExtGrid.js"></script>--%>
    <link type="text/css" rel="stylesheet" href="../scripts/ExtUx/RowFilter/filterRow.css">
    <script src="../scripts/ExtUx/RowFilter/filterRow.js"></script>
<%--    <script src="../scripts/AkgunUx/createVeriGirisiForm.js"></script>--%>
    <script src="../scripts/ExtUx/TabCloseMenu.js"></script>
    <script src="../scripts/ExtUx/RowEditor/VolRowEditor.js"></script>
    <script src="../scripts/ExtUx/GridSummary/Ext.ux.Summary.js"></script>
<%--    <script src="../scripts/plugin/GridSummary.js"></script>--%>
<%--    <script src="../scripts/plugin/uxAll/ux-all.js"></script>--%>
<%--    <script src="../scripts/xml/XmlParser.js"></script>--%>

<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/view/SiparisListesiIhaleGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/view/SiparisListesiIhaleMainPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/view/SiparisListesiSiparisOnaylamaGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/view/SiparisListesiVerilenSiparislerGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/controller/SiparisListesiIhaleGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/controller/SiparisListesiVerilenSiparislerGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/controller/SiparisListesiSiparisOnaylamaGridPanel.js"></script>--%>
<%--    <script src="../scripts/kbs/onlineSiparisTakip/siparisListesi/SiparisListesiIhaleMainController.js"></script>--%>

    <script src="../scripts/login/view/LoginFormPanel.js"></script>
    <script src="../scripts/login/view/LoginMainPanel.js"></script>
    <script src="../scripts/login/controller/LoginFormPanel.js"></script>
    <script src="../scripts/login/LoginMainController.js"></script>

    <script src="../scripts/login/Main.js"></script>

    <!--<script type="text/javascript" src="//www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script> -->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <script src="../scripts/ExtUx/miframe.js"></script>
    <script src="../scripts/ext34x/ext-lang-tr.js"></script>


</head>
<body>
<input type="hidden" id="publicRecaptiva" value='${publicRecaptiva}'/>
<div id="north">
    <table border="0" style="width:100%">
        <%--<tr class="ePortalKurumAdi">
            <td width="50px">
                <div class="sblogo50"></div>
            </td>
&lt;%&ndash;            <td>${kurumBaslik}</td>&ndash;%&gt;
            <td width="50px">
                <div class="sblogo50"></div>
            </td>
        </tr>--%>
    </table>

</div>
<div id="south" align="center">
    <font color="black">
        <b>Ayşegül YAZICI DEMİR</b> © 2021&nbsp;&nbsp; Tüm hakları saklıdır.&nbsp;&nbsp;
<%--        <img src="../images/akgunicon.png" alt="akgunIcon"/>--%>
    </font>
</div>
</body>

</html>


