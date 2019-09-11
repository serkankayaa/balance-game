$(document).ready(function () {
    //all games
    var games = [];
    games.push(game2, game3);
    games.sort();

    //balance elements
    var balances = [];
    var leftBoxes = [];
    var rightBoxes = [];
    var ropeLeftLines = [];
    var ropeRightLines = [];

    //seated shapes 
    var seatedShapes = [];

    var checkComplete = false;

    //first game load.
    var game = game1;
    prepareBalances(game);
    addStyles();
    moveShape();
    dropShape();

    function prepareBalances(game) {
        var balanceHtml = "";
        var targetBalanceHtml = "";
        var shapeHtml = "";

        for (var balanceIndex = 0; balanceIndex < game.balanceCount; balanceIndex++) {

            if (balanceIndex == game.balanceCount - 1) {
                targetBalanceHtml = setBalances(targetBalanceHtml, balanceIndex);
                $(".blnTarget").append(targetBalanceHtml);
                $(".blnTarget").addClass('mx-auto');
            }
            else {
                balanceHtml = setBalances(balanceHtml, balanceIndex);
                $(".bln").append(balanceHtml);
            }

            checkFirstBalances = true;
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

        $(".blnTarget").append(shapeHtml);

        game.dragShapes.forEach(element => {
            if (element == 'triangle') {
                var a = "<div class='col triangles'></div></div>";
                $(".shapes").append(a);
                prepareTriangle(gameObject.maxShapeCount, game.triangleValue);
            }

            if (element == 'square') {
                var b = "<div class='col squares'></div>";
                $(".shapes").append(b);
                prepareSquare(gameObject.maxShapeCount, game.squareValue);
            }

            if (element == 'circle') {
                var c = "<div class='col circles'></div>";
                $(".shapes").append(c);
                prepareCircle(gameObject.maxShapeCount, game.circleValue);
            }
        });

        moveShape();

        for (let i = 0; i < game.balanceCount; i++) {
            //seated left boxes
            seatedTriangle(game.leftBox[i].triangleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, game.triangleValue, $(leftBoxes[i]));
            seatedSquare(game.leftBox[i].rectCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, game.squareValue, $(leftBoxes[i]));
            seatedCircle(game.leftBox[i].circleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, game.circleValue, $(leftBoxes[i]));

            //seated right boxes
            seatedTriangle(game.rightBox[i].triangleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, game.triangleValue, $(rightBoxes[i]));
            seatedSquare(game.rightBox[i].rectCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, game.squareValue, $(rightBoxes[i]));
            seatedCircle(game.rightBox[i].circleCount, $(rightBoxes[i]).position().left, $(rightBoxes[i]).position().top, game.circleValue, $(rightBoxes[i]));

            var leftValue = 0;
            var rightValue = 0;
            var difference = 0;

            $(leftBoxes[i]).children().each(function () {
                leftValue += parseInt($(this).attr('value'));
            });

            $(rightBoxes[i]).children().each(function () {
                rightValue += parseInt($(this).attr('value'));
            });

            difference = leftValue - rightValue;

            var getLeftLineHeight = parseInt($(ropeLeftLines[i]).height());
            var getRightLineHeight = parseInt($(ropeRightLines[i]).height());

            var getLeftBoxHeight = parseInt($(leftBoxes[i]).css('margin-top'));
            var getRightBoxHeight = parseInt($(rightBoxes[i]).css('margin-top'));

            if (i == game.balanceCount - 1) {
                getLeftLineHeight += difference * 2.5;
                getLeftBoxHeight += difference * 2.5;
                getRightBoxHeight -= difference * 2.5;
                getRightLineHeight -= difference * 2.5;
            }
            else {
                getLeftLineHeight += difference * 4;
                getLeftBoxHeight += difference * 4;
                getRightBoxHeight -= difference * 4;
                getRightLineHeight -= difference * 4;
            }

            animateMargin($(leftBoxes[i]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[i]), getLeftLineHeight);

            animateMargin($(rightBoxes[i]), getRightBoxHeight);
            animateHeight($(ropeRightLines[i]), getRightLineHeight);
        }

        moveShape();
        dropShape();
    }

    function dropShape() {
        $(".blnTarget > .blnCol > .blnShape > .boxRight").droppable({
            drop: function (event, ui) {
                var seatedShape = ui.draggable;
                var lastIndex = game.balanceCount - 1;

                if (seatedShapes.length == 9) {
                    alert("Daha fazla şekil koyamazsınız !");
                    return;
                }

                if ($(ropeLeftLines[lastIndex]).height() == 0) {
                    alert("İpi koparttın. Artık oynanmaz !");
                    return;
                }

                if (seatedShape.attr('id') == 'circleShape') {
                    seatedCircle(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.circleValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    seatedShapes.push(seatedShape);
                }

                if (seatedShape.attr('id') == 'squareShape') {
                    seatedSquare(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.squareValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    seatedShapes.push(seatedShape);
                }

                if (seatedShape.attr('id') == 'triangleShape') {
                    seatedTriangle(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.triangleValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    seatedShapes.push(seatedShape);
                }
            }
        });
    }

    function calculateWeight(balanceIndex) {
        var leftValue = 0;
        var rightValue = 0;
        var difference = 0;
        var checkLeftBigger = false;
        var checkRightBigger = false;

        $(leftBoxes[balanceIndex]).children().each(function () {
            leftValue += parseInt($(this).attr('value'));
        });

        $(rightBoxes[balanceIndex]).children().each(function () {
            rightValue += parseInt($(this).attr('value'));
        });

        difference = leftValue - rightValue;

        var getLeftLineHeight = parseInt($(ropeLeftLines[balanceIndex]).height());
        var getRightLineHeight = parseInt($(ropeRightLines[balanceIndex]).height());

        var getLeftBoxHeight = parseInt($(leftBoxes[balanceIndex]).css('margin-top'));
        var getRightBoxHeight = parseInt($(rightBoxes[balanceIndex]).css('margin-top'));

        if (difference > 0) {
            checkLeftBigger = true;
        }
        else if (difference < 0) {
            checkRightBigger = true;
        }
        else if (difference == 0) {
            animateMargin($(rightBoxes[balanceIndex]), getLeftBoxHeight - getLeftBoxHeight + getRightBoxHeight);
            animateHeight($(ropeRightLines[balanceIndex]), getLeftLineHeight - getLeftLineHeight + getRightLineHeight);

            animateMargin($(leftBoxes[balanceIndex]), getRightBoxHeight);
            animateHeight($(ropeLeftLines[balanceIndex]), getRightLineHeight);

            checkComplete = true;
        }

        if (checkLeftBigger) {
            getLeftLineHeight -= difference;
            getLeftBoxHeight -= difference;
            getRightBoxHeight += difference;
            getRightLineHeight += difference;

            animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);

            animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
            animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
        }

        if (checkRightBigger) {
            if (balanceIndex == game.balanceCount - 1) {
                difference = Math.abs(difference);
            }

            getLeftLineHeight -= difference;
            getLeftBoxHeight -= difference;
            getRightBoxHeight += difference;
            getRightLineHeight += difference;

            animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);

            animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
            animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
        }

        moveShape();
    }

    function moveShape() {
        $(".dragShape").draggable({
            containment: 'window',
            stack: '.dragShape',
            revert: true,
            revertDuration: 900
        });
    }

    function completeShape(seatedShape, lastIndex) {
        var seatedShapeClass = ".blnTarget > .blnCol > .blnShape > .boxRight > .seatedShape";

        seatedShape.remove();
        calculateWeight(lastIndex);

        $(seatedShapeClass).css({
            'transform': 'scale(0.7)',
            'margin-left': '1.2px',
            'margin-top': '1px',
        });

        $(seatedShapeClass).hide();
        $(seatedShapeClass).toggle("bounce");

        moveShape();
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
            readyShapeToDrag = true;

            if (checkComplete) {
                // alert("oyun bitti tebrikler");
                nextGame();
                return;
            }

            moveShape();
        });
    }

    function animateHeight(element, heightSize) {
        $(element).animate({
            height: heightSize,
        }, gameObject.balanceSpeed, function () {
            //animate completed
            moveShape();
        });
    }

    function clearGame() {
        balances = [];
        leftBoxes = [];
        rightBoxes = [];
        ropeLeftLines = [];
        ropeRightLines = [];
        seatedShapes = [];
        $(".bln").children().remove();
        $(".blnTarget").children().remove();
        checkComplete = false;
    }

    function nextGame() {
        if (checkComplete && games.length == 0) {
            alert("Oyun bitti tebrikler");
            clearGame();
            return;
        }

        for (let i = 0; i < games.length; i++) {
            if (checkComplete) {
                game = games[i];
                clearGame();
                prepareBalances(game);
                addStyles();
                moveShape();
                games.shift();
            }
        }
    }

    function addStyles() {
        if (game.dragShapes.length == 1) {
            $('.shapes').css({
                'margin-top': '20%',
                'margin-right': '80px',
                'display': 'flex',
                'margin-left': '100%',
            });
        }

        if (game.dragShapes.length == 2) {
            $('.shapes').css({
                'margin-top': '20%',
                'margin-right': '50px',
                'display': 'flex',
                'margin-left': '100%',
            });
        }

        if (game.dragShapes.length == 3) {
            $('.shapes').css({
                'margin-top': '20%',
                'margin-right': '4px',
                'display': 'flex',
                'margin-left': '100%',
            });
        }

        $('.seatedShape').css({
            'transform': 'scale(0.7)',
            'margin-left': '1.2px',
            'margin-top': '2px',
        });
    }

    function seatedCircle(shapeCount, shapeX, shapeY, value, boxId) {
        if (shapeCount != 0) {
            var shapeHtml = "";
            var shapeId = "circleShape";

            for (let i = 0; i < shapeCount; i++) {
                shapeHtml = "<div id='" + shapeId + "' value='" + value + "' class='seatedShape'></div>";

                $(boxId).append(shapeHtml);

                $("#" + shapeId).offset({ top: shapeY, left: shapeX });
                $("#" + shapeId).css({
                    'position': 'static',
                });
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
                $("#" + shapeId).css({
                    'position': 'static',
                });
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
                $("#" + shapeId).css({
                    'position': 'static',
                });
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
