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
    var ropeLeftLines = [];
    var ropeRightLines = [];

    prepareBalances(game);
    addStyles();

    $(".dragShape").draggable({
        containment: 'window',
        stack: '.dragShape',
        snap: '.boxLeft, .boxRight',
        snapMode: 'inner',
        snapTolerance: 10,
    });

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

        $(".ropeLeft").each(function () {
            var ropeLeftId = ($(this).attr("id"));

            ropeLeftLines.push("#" + ropeLeftId);
            ropeLeftLines.sort();
        });

        $(".ropeRight").each(function () {
            var ropeRightId = ($(this).attr("id"));

            ropeRightLines.push("#" + ropeRightId);
            ropeRightLines.sort();
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

            var leftValue = 0;
            var rightValue = 0;
            var difference = 0;
            var checkLeftGrater = false;
            var checkRightGrater = false;

            $(leftBoxes[i]).children().each(function () {
                leftValue += parseInt($(this).attr('value'));
            });

            $(rightBoxes[i]).children().each(function () {
                rightValue += parseInt($(this).attr('value'));
            });

            difference = leftValue - rightValue;

            if (difference > 0) {
                checkLeftGrater = true;
            }
            else {
                checkRightGrater = true;
            }

            if (checkLeftGrater) {
                var getLeftLineHeight = parseInt($(ropeLeftLines[i]).height());
                var getRightLineHeight = parseInt($(ropeRightLines[i]).height());

                var getLeftBoxHeight = parseInt($(leftBoxes[i]).css('margin-top'));
                var getRightBoxHeight = parseInt($(rightBoxes[i]).css('margin-top'));

                getLeftLineHeight += difference * 2;
                getLeftBoxHeight += difference * 2;
                getRightBoxHeight -= difference *2;

                $(ropeLeftLines[i]).height(getLeftLineHeight);
                $(leftBoxes[i]).css('margin-top', getLeftBoxHeight);

                getRightLineHeight -= difference * 2;
                $(ropeRightLines[i]).height(getRightLineHeight);
                $(rightBoxes[i]).css('margin-top', getRightBoxHeight);
            }
        }
    }

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
            shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

            $(boxId).append(shapeHtml);

            $("#" + shapeId).offset({ top: shapeY, left: shapeX });
            $("#" + shapeId).css('position', 'static');
        }
    }

    function seatedSquare(shapeCount, shapeX, shapeY, value, boxId) {
        var shapeHtml = "";
        var shapeId = "squareShape";

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

            $(boxId).append(shapeHtml);

            $("#" + shapeId).offset({ top: shapeY, left: shapeX });
            $("#" + shapeId).css('position', 'static');
        }
    }

    function seatedTriangle(shapeCount, shapeX, shapeY, value, boxId) {
        var shapeHtml = "";
        var shapeId = "triangleShape";

        for (let i = 0; i < shapeCount; i++) {
            shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

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
