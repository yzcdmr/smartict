function Captcha() {
    var alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    var i;
    for (i = 0; i < 6; i++) {
        var a = alpha[Math.floor(Math.random() * alpha.length)];
        var b = alpha[Math.floor(Math.random() * alpha.length)];
        var c = alpha[Math.floor(Math.random() * alpha.length)];
        var d = alpha[Math.floor(Math.random() * alpha.length)];
        var e = alpha[Math.floor(Math.random() * alpha.length)];
        var f = alpha[Math.floor(Math.random() * alpha.length)];
        var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
    var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
    var codeReal = a + b + c + d + e + f + g;
    document.getElementById("mainCaptcha").value = md5(codeReal);
    var btnGiris=Ext.getCmp("btnGiris");
   // btnGiris.setDisabled(true);
    DrawCaptcha(code);
}

function ValidCaptcha() {
    var string1 = document.getElementById('mainCaptcha').value;
    var string2 = md5(document.getElementById('txtInput').value);
    if (string1 === string2) {
        var btnGiris=Ext.getCmp("btnGiris");
        //btnGiris.setDisabled(false);
        return true;
    } else {
        Captcha();
    }
}

function  CaptchaKontrol() {
    var string1 = document.getElementById('mainCaptcha').value;
    var string2 = md5(document.getElementById('txtInput').value);
    if (string1 === string2) {
        var btnGiris=Ext.getCmp("btnGiris");
        btnGiris.setDisabled(false);
    }
}

function Refresh(){
    Captcha();
}

function removeSpaces(string) {
    return string.split(' ').join('');
}

function DrawCaptcha(captchaValue) {

    var c = document.getElementById("captcha-img");
    var ctx = c.getContext("2d");

    var colors = new Array('#F0F8FF', '#FAEBD7', '#00FFFF', '#7FFFD4', '#F0FFFF', '#F5F5DC', '#FFE4C4',
        '#000000', '#FFEBCD', '#0000FF', '#8A2BE2', '#A52A2A', '#DEB887', '#5F9EA0', '#7FFF00', '#D2691E',
        '#FF7F50', '#6495ED', '#FFF8DC', '#DC143C', '#00FFFF', '#00008B', '#008B8B', '#B8860B', '#A9A9A9',
        '#A9A9A9', '#006400', '#BDB76B', '#8B008B', '#556B2F', '#FF8C00', '#9932CC', '#8B0000', '#E9967A',
        '#8FBC8F', '#483D8B', '#2F4F4F', '#2F4F4F', '#00CED1', '#9400D3', '#FF1493', '#00BFFF', '#696969',
        '#696969', '#1E90FF', '#B22222', '#FFFAF0', '#228B22', '#FF00FF', '#DCDCDC', '#F8F8FF', '#FFD700',
        '#DAA520', '#808080', '#808080', '#008000', '#ADFF2F', '#F0FFF0', '#FF69B4', '#CD5C5C', '#4B0082',
        '#FFFFF0', '#F0E68C', '#E6E6FA', '#FFF0F5', '#7CFC00', '#FFFACD', '#ADD8E6', '#F08080', '#E0FFFF',
        '#FAFAD2', '#D3D3D3', '#D3D3D3', '#90EE90', '#FFB6C1', '#FFA07A', '#20B2AA', '#87CEFA', '#778899',
        '#778899', '#B0C4DE', '#FFFFE0', '#00FF00', '#32CD32', '#FAF0E6', '#FF00FF', '#800000', '#66CDAA',
        '#0000CD', '#BA55D3', '#9370DB', '#3CB371', '#7B68EE', '#00FA9A', '#48D1CC', '#C71585', '#191970',
        '#F5FFFA', '#FFE4E1', '#FFE4B5', '#FFDEAD', '#000080', '#FDF5E6', '#808000', '#6B8E23', '#FFA500',
        '#FF4500', '#DA70D6', '#EEE8AA', '#98FB98', '#AFEEEE', '#DB7093', '#FFEFD5', '#FFDAB9', '#CD853F',
        '#FFC0CB', '#DDA0DD', '#B0E0E6', '#800080', '#663399', '#FF0000', '#BC8F8F', '#4169E1', '#8B4513',
        '#FA8072', '#F4A460', '#2E8B57', '#FFF5EE', '#A0522D', '#C0C0C0', '#87CEEB', '#6A5ACD', '#708090',
        '#708090', '#FFFAFA', '#00FF7F', '#4682B4', '#D2B48C', '#008080', '#D8BFD8', '#FF6347', '#40E0D0',
        '#EE82EE', '#F5DEB3', '#FFFFFF', '#F5F5F5', '#FFFF00');

    var fonts = new Array('Arial', 'Helvetica', 'Times New Roman', 'Times', 'Courier New', 'Courier', 'Verdana',
        'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact');
    var fontStyle = new Array('bold', 'italic', 'italic bold');

    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowBlur = 0;
    ctx.fillStyle = "white";
    ctx.shadowColor = "white";
    ctx.clearRect(0, 0, c.width, c.height);

    r = Math.random() * 50;
    theta = Math.random() * 1;

    for (i = -50; i < c.height; i += 10)
    {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.moveTo(0, i);
        ctx.lineTo(c.width + r * Math.cos(theta), i + r * Math.sin(theta));
        ctx.stroke();
    }
    for (i = -50; i < c.width; i += 10)
    {
        ctx.beginPath();
        ctx.lineWidth = "2";
        ctx.strokeStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.moveTo(i, 0);
        ctx.lineTo(i + +r * Math.cos(theta), (c.width / 2) + r * Math.sin(theta));
        ctx.stroke();
    }

    ctx.shadowOffsetX = Math.random() * 10;
    ctx.shadowOffsetX = Math.random() * 10;
    ctx.shadowBlur = (Math.random() * 10) + 10;
    ctx.shadowColor = "black";
    ctx.font = fontStyle[Math.floor(Math.random() * fontStyle.length)] + " 30px " + fonts[Math.floor(Math.random() * fonts.length)];

    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    var gradient = ctx.createLinearGradient(0, 0, 0, c.height);
    gradient.addColorStop("0.2", colors[Math.floor(Math.random() * colors.length)]);
    gradient.addColorStop("0.4", colors[Math.floor(Math.random() * colors.length)]);
    gradient.addColorStop("0.8", "black");
    ctx.fillStyle = gradient;
    ctx.fillText(captchaValue, 25, 40);
}

function chkCaptcha() {
    var message = document.getElementById("msg").innerHTML;
    if (message.length > 12) {
        if (document.getElementById("captchaDiv") !== null) {
            var cstr1 = '<canvas id="captcha-img" height="50" style="border:1px solid black; background-color:white;"></canvas><input type="hidden" id="mainCaptcha">';
            document.getElementById("captchaDiv").innerHTML = cstr1;
            var cstr2 = '<div class="input-group"><input type="text" id="txtInput" class="form-control" onchange="CaptchaKontrol()"><span class="input-group-btn">';
            cstr2 += '<button type="button" class="btn btn-primary" id="Button1" value="Check" onclick="Refresh()">Refresh / Verify</button>';
            cstr2 += '</span></div>';
            document.getElementById("captchaValidateDiv").innerHTML = cstr2;
            var btnGiris=Ext.getCmp("btnGiris");
            //btnGiris.setDisabled(true);
            Captcha();
        }
    } else {
        document.getElementById("captchaDiv").innerHTML = "";
        document.getElementById("captchaValidateDiv").innerHTML = "";
    }
}
