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


    <script src="../scripts/smartICT/view/stationFormPanel.js"></script>
    <script src="../scripts/smartICT/controller/stationFormPanel.js"></script>
    <script src="../scripts/smartICT/view/stationGridPanel.js"></script>
    <script src="../scripts/smartICT/controller/stationGridPanel.js"></script>
    <script src="../scripts/smartICT/view/routeFormPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeFormPanel.js"></script>
    <script src="../scripts/smartICT/view/routeGridPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeGridPanel.js"></script>
    <script src="../scripts/smartICT/view/vehicleFormPanel.js"></script>
    <script src="../scripts/smartICT/controller/vehicleFormPanel.js"></script>
    <script src="../scripts/smartICT/view/vehicleGridPanel.js"></script>
    <script src="../scripts/smartICT/controller/vehicleGridPanel.js"></script>
    <script src="../scripts/smartICT/view/routeStationFormPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeStationFormPanel.js"></script>
    <script src="../scripts/smartICT/view/routeStationGridPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeStationGridPanel.js"></script>
    <script src="../scripts/smartICT/view/routeVehicleFormPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeVehicleFormPanel.js"></script>
    <script src="../scripts/smartICT/view/routeVehicleGridPanel.js"></script>
    <script src="../scripts/smartICT/controller/routeVehicleGridPanel.js"></script>
    <script src="../scripts/smartICT/view/smartIctTabPanel.js"></script>
    <script src="../scripts/smartICT/controller/smartIctTabPanel.js"></script>
    <script src="../scripts/smartICT/view/smartIctMainPanel.js"></script>
    <script src="../scripts/smartICT/smartIctMainPanel.js"></script>
    <script src="../scripts/smartICT/SmartMain.js"></script>

<%--    <script src="../scripts/login/Main.js"></script>--%>

    <!--<script type="text/javascript" src="//www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script> -->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <script src="../scripts/ExtUx/miframe.js"></script>
    <script src="../scripts/ext34x/ext-lang-tr.js"></script>


</head>
<body>
<%--<input type="hidden" id="publicRecaptiva" value='${publicRecaptiva}'/>--%>
<%--<div id="north">--%>
<%--    <table border="0" style="width:100%">--%>
<%--        &lt;%&ndash;<tr class="ePortalKurumAdi">--%>
<%--            <td width="50px">--%>
<%--                <div class="sblogo50"></div>--%>
<%--            </td>--%>
<%--&lt;%&ndash;            <td>${kurumBaslik}</td>&ndash;%&gt;--%>
<%--            <td width="50px">--%>
<%--                <div class="sblogo50"></div>--%>
<%--            </td>--%>
<%--        </tr>&ndash;%&gt;--%>
<%--    </table>--%>

<%--</div>--%>
<%--<div id="south" align="center">--%>
<%--    <font color="black">--%>
<%--        <b>Ayşegül YAZICI DEMİR</b> © 2021&nbsp;&nbsp; Tüm hakları saklıdır.&nbsp;&nbsp;--%>
<%--        &lt;%&ndash;        <img src="../images/akgunicon.png" alt="akgunIcon"/>&ndash;%&gt;--%>
<%--    </font>--%>
<%--</div>--%>
</body>

</html>


