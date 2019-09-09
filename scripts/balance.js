$(document).ready(function () {
    var game = game1;
    var balanceCount = game.balanceCount;
    var shapeCount = 5;
    var circleValue = 2;
    var triangleValue = 3;
    var squareValue = 5;

    var balances = [];
    var leftBoxes = [];
    var rightBoxes = [];

    prepareBalances(game);
    addStyles();

    function prepareBalances(game) {
        var balanceHtml = "";
        var shapeHtml = "";

        for (var i = 0; i < balanceCount; i++) {
            balanceHtml = "<div class='col blnCol'>";
            balanceHtml += "<div id='balance" + i + "' class='blnShape'>";
            balanceHtml += "<div class='hanger'></div>";
            balanceHtml += "<div class='pendulum' id='pendulum" + i + "'></div>";
            balanceHtml += "<div class='ropeLeft' id = 'ropeLeft" + i + "'></div >";
            balanceHtml += "<div class='ropeRight' id='ropeRight" + i + "'></div>";
            balanceHtml += "<div class='boxLeft' id='boxLeft" + i + "'></div>";
            balanceHtml += "<div class='boxRight' id='boxRight" + i + "'></div></div ></div >";

            $(".bln").append(balanceHtml);
        }

        $(".blnShape").each(function () {
            var blnShapeId = ($(this).attr("id"));

            balances.push("#" + blnShapeId);
            balances.sort();
        });

        $(".boxLeft").each(function () {
            var leftBoxId = ($(this).attr("id"));

            leftBoxes.push("#" + leftBoxId);
            leftBoxes.sort();
        });

        $(".boxRight").each(function () {
            var rightBoxId = ($(this).attr("id"));

            rightBoxes.push("#" + rightBoxId);
            rightBoxes.sort();
        });

        shapeHtml += "<div class='row shapes'>";
        shapeHtml += "<div class='col circles'></div>";
        shapeHtml += "<div class='col squares'></div>";
        shapeHtml += "<div class='col triangles'></div></div>";

        $(".bln").append(shapeHtml);

        prepareCircle(shapeCount, circleValue);
        prepareSquare(shapeCount, squareValue);
        prepareTriangle(shapeCount, triangleValue);

        for (let i = 0; i < balanceCount; i++) {
            //seated left boxes
            seatedTriangle(game.leftBox[i].triangleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, triangleValue, $(leftBoxes[i]));
            seatedSquare(game.leftBox[i].rectCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, squareValue, $(leftBoxes[i]));
            seatedCircle(game.leftBox[i].circleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, circleValue, $(leftBoxes[i]));

            //seated right boxes
            seatedTriangle(game.rightBox[i].triangleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, triangleValue, $(rightBoxes[i]));
            seatedSquare(game.rightBox[i].rectCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, squareValue, $(rightBoxes[i]));
            seatedCircle(game.rightBox[i].circleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, circleValue, $(rightBoxes[i]));
        }
    }

    $(".dragShape").draggable({
        containment: 'window',
        stack: '.dragShape',
        snap: '.boxLeft, .boxRight',
        snapMode: 'inner',
        snapTolerance: 10,
    });

    function addStyles() {
        $('.shapes').css({
            'margin-top': '20%',
            'margin-right': '4px',
        });

        $('.boxLeft > div').css({
            'transform': 'scale(0.7)',
        });

        $('.boxRight > div').css({
            'transform': 'scale(0.7)',
        });
    }

    function seatedCircle(shapeCount, shapeX, shapeY, value, boxId) {
        var shapeHtml = "";
        var shapeId = "circleShape"

        for (let i = 0; i < shapeCount; i++) {
            // shapeHtml = `<div id=${shapeId} value=${value} class="seatedShape"></div>`;
            shapeHtml = "<div id='" + shapeId + "' value='"+ value +"' class='seatedShape'></div>";

            $(boxId).append(shapeHtml);

            $("#" + shapeId).offset({ top: shapeY, left: shapeX });
            $("#" + shapeId).css('position', 'static');
        }
    }

    function seatedSquare(shapeCount, shapeX, shapeY, value, boxId) {
        var shapeHtml = "";
        var shapeId = "squareShape";

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = "<div id='" + shapeId + "' value='"+ value +"' class='seatedShape'></div>";

            $(boxId).append(shapeHtml);

            $("#" + shapeId).offset({ top: shapeY, left: shapeX });
            $("#" + shapeId).css('position', 'static');
        }
    }

    function seatedTriangle(shapeCount, shapeX, shapeY, value, boxId) {
        var shapeHtml = "";
        var shapeId = "triangleShape";

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = "<div id='" + shapeId + "' value='"+ value +"' class='seatedShape'></div>";

            $(boxId).append(shapeHtml);

            $("#" + shapeId).offset({ top: shapeY, left: shapeX });
            $("#" + shapeId).css('position', 'static');
        }
    }

    function prepareCircle(shapeCount, value) {
        var shapeHtml = "";
        var shapeId = "circleShape"

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left:3px; position:absolute"></div>`;
            $(".circles").append(shapeHtml);
        }
    }

    function prepareSquare(shapeCount, value) {
        var shapeHtml = "";
        var shapeId = "squareShape"

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left:3px; position:absolute"></div>`;
            $(".squares").append(shapeHtml);
        }
    }

    function prepareTriangle(shapeCount, value) {
        var shapeHtml = "";
        var shapeId = "triangleShape"

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left:3px; position:absolute"></div>`;
            $(".triangles").append(shapeHtml);
        }
    }
});
