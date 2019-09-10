$(document).ready(function () {
    var game = game1;
    var balanceCount = game.balanceCount;

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
        var targetBalanceHtml = "";
        var shapeHtml = "";

        for (var balanceIndex = 0; balanceIndex < balanceCount; balanceIndex++) {

            if (balanceIndex == balanceCount - 1) {
                targetBalanceHtml = setBalances(targetBalanceHtml, balanceIndex);
                $(".blnTarget").append(targetBalanceHtml);
                $(".blnTarget").addClass('mx-auto');
            }
            else {
                balanceHtml = setBalances(balanceHtml, balanceIndex);
                $(".bln").append(balanceHtml);
            }
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

        shapeHtml += "<div class='col shapes'>";
        shapeHtml += "<div class='col circles'></div>";
        shapeHtml += "<div class='col squares'></div>";
        shapeHtml += "<div class='col triangles'></div></div>";

        $(".blnTarget").append(shapeHtml);

        prepareCircle(gameObject.maxShapeCount, gameObject.circleValue);
        prepareSquare(gameObject.maxShapeCount, gameObject.squareValue);
        prepareTriangle(gameObject.maxShapeCount, gameObject.triangleValue);

        for (let i = 0; i < balanceCount; i++) {
            //seated left boxes
            seatedTriangle(game.leftBox[i].triangleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, gameObject.triangleValue, $(leftBoxes[i]));
            seatedSquare(game.leftBox[i].rectCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, gameObject.squareValue, $(leftBoxes[i]));
            seatedCircle(game.leftBox[i].circleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, gameObject.circleValue, $(leftBoxes[i]));

            //seated right boxes
            seatedTriangle(game.rightBox[i].triangleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, gameObject.triangleValue, $(rightBoxes[i]));
            seatedSquare(game.rightBox[i].rectCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, gameObject.squareValue, $(rightBoxes[i]));
            seatedCircle(game.rightBox[i].circleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, gameObject.circleValue, $(rightBoxes[i]));

            var leftValue = 0;
            var rightValue = 0;
            var difference = 0;
            var checkLeftBigger = false;
            var checkRightBigger = false;

            $(leftBoxes[i]).children().each(function () {
                leftValue += parseInt($(this).attr('value'));
            });

            $(rightBoxes[i]).children().each(function () {
                rightValue += parseInt($(this).attr('value'));
            });

            difference = leftValue - rightValue;

            if (difference > 0) {
                checkLeftBigger = true;
            }
            else {
                checkRightBigger = true;
            }

            if (checkLeftBigger) {
                var getLeftLineHeight = parseInt($(ropeLeftLines[i]).height());
                var getRightLineHeight = parseInt($(ropeRightLines[i]).height());

                var getLeftBoxHeight = parseInt($(leftBoxes[i]).css('margin-top'));
                var getRightBoxHeight = parseInt($(rightBoxes[i]).css('margin-top'));

                getLeftLineHeight += difference * 3;
                getLeftBoxHeight += difference * 3;
                getRightBoxHeight -= difference * 3;
                getRightLineHeight -= difference * 3;

                animateMargin($(leftBoxes[i]), getLeftBoxHeight);
                animateHeight($(ropeLeftLines[i]), getLeftLineHeight);

                animateMargin($(rightBoxes[i]), getRightBoxHeight);
                animateHeight($(ropeRightLines[i]), getRightLineHeight);
            }

            if (checkRightBigger) {
                var getLeftLineHeight = parseInt($(ropeLeftLines[i]).height());
                var getRightLineHeight = parseInt($(ropeRightLines[i]).height());

                var getLeftBoxHeight = parseInt($(leftBoxes[i]).css('margin-top'));
                var getRightBoxHeight = parseInt($(rightBoxes[i]).css('margin-top'));

                getLeftLineHeight -= difference * 3;
                getLeftBoxHeight -= difference * 3;
                getRightBoxHeight += difference * 3;
                getRightLineHeight += difference * 3;

                animateMargin($(leftBoxes[i]), getLeftBoxHeight);
                animateHeight($(ropeLeftLines[i]), getLeftLineHeight);

                animateMargin($(rightBoxes[i]), getRightBoxHeight);
                animateHeight($(ropeRightLines[i]), getRightLineHeight);
            }
        }
    }

    function setBalances(balanceHtml, index) {
        balanceHtml = "<div class='col blnCol'>";
        balanceHtml += "<div id='balance" + index + "' class='blnShape'>";
        balanceHtml += "<div class='hanger'></div>";
        balanceHtml += "<div class='pendulum' id='pendulum" + index + "'></div>";
        balanceHtml += "<div class='ropeLeft' id = 'ropeLeft" + index + "'></div >";
        balanceHtml += "<div class='ropeRight' id='ropeRight" + index + "'></div>";
        balanceHtml += "<div class='boxLeft' id='boxLeft" + index + "'></div>";
        balanceHtml += "<div class='boxRight' id='boxRight" + index + "'></div></div ></div >";

        return balanceHtml;
    }

    function animateMargin(element, marginTopSize) {
        $(element).animate({
            marginTop: marginTopSize,
        }, gameObject.balanceSpeed, function () {
            //animate completed
        });
    }

    function animateHeight(element, heightSize) {
        $(element).animate({
            height: heightSize,
        }, gameObject.balanceSpeed, function () {
            //animate completed
        });
    }

    function addStyles() {
        $('.shapes').css({
            'margin-top': '20%',
            'margin-right': '4px',
            'display': 'flex',
            'margin-left': '100%',
        });

        $('.boxLeft > div').css({
            'transform': 'scale(0.7)',
        });

        $('.boxRight > div').css({
            'transform': 'scale(0.7)',
        });
    }

    function seatedCircle(shapeCount, shapeX, shapeY, value, boxId) {
        if (shapeCount != 0) {
            var shapeHtml = "";
            var shapeId = "circleShape"

            for (let i = 0; i < shapeCount; i++) {
                shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

                $(boxId).append(shapeHtml);

                $("#" + shapeId).offset({ top: shapeY, left: shapeX });
                $("#" + shapeId).css('position', 'static');
            }
        }
    }

    function seatedSquare(shapeCount, shapeX, shapeY, value, boxId) {
        if (shapeCount != 0) {
            var shapeHtml = "";
            var shapeId = "squareShape";

            for (let i = 0; i < shapeCount; i++) {
                shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

                $(boxId).append(shapeHtml);

                $("#" + shapeId).offset({ top: shapeY, left: shapeX });
                $("#" + shapeId).css('position', 'static');
            }
        }
    }

    function seatedTriangle(shapeCount, shapeX, shapeY, value, boxId) {
        if (shapeCount != 0) {
            var shapeHtml = "";
            var shapeId = "triangleShape";

            for (let i = 0; i < shapeCount; i++) {
                shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

                $(boxId).append(shapeHtml);

                $("#" + shapeId).offset({ top: shapeY, left: shapeX });
                $("#" + shapeId).css('position', 'static');
            }
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
