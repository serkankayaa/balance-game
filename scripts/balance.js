$(document).ready(function () {
    //all games
    var games = [];
    games.push(game2, game3);
    games.sort();

    //result shapes
    var userAnswers = [];

    //balance elements
    var balances = [];
    var leftBoxes = [];
    var rightBoxes = [];
    var ropeLeftLines = [];
    var ropeRightLines = [];

    //seated shapes 
    var seatedShapes = [];

    var checkComplete = false;
    var extractShape = false;
    var droppingInsideBox = false;
    var checkShapeCount = 0;
    var gameTime = 0;
    var totalShapeCount = gameObject.maxShapeCount;

    //first game load.
    var game = game1;
    prepareBalances(game);
    setDraggableShapes();
    addStyles();
    moveShape();
    dropShape();
    gameStartTime();

    function setDraggableShapes() {
        setTimeout(function () {
            var shapeHtml = "<div class='col shapes'>";

            $(".blnTarget").append(shapeHtml);

            game.dragShapes.forEach(element => {
                if (element == 'triangle') {
                    var triangleHtml = "<div class='col triangles'></div></div>";
                    $(".shapes").append(triangleHtml);
                    prepareTriangle(gameObject.maxShapeCount, game.triangleValue);
                }

                if (element == 'square') {
                    var squareHtml = "<div class='col squares'></div>";
                    $(".shapes").append(squareHtml);
                    prepareSquare(gameObject.maxShapeCount, game.squareValue);
                }

                if (element == 'circle') {
                    var circleHtml = "<div class='col circles'></div>";
                    $(".shapes").append(circleHtml);
                    prepareCircle(gameObject.maxShapeCount, game.circleValue);
                }
            });

            addStyles();
            moveShape();

            $(".shapes").hide();
            $(".shapes").toggle("pulsate", 1500, function () { });

        }, 2000);
    }

    function prepareBalances(game) {
        var balanceHtml = "";
        var targetBalanceHtml = "";

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

        for (let i = 0; i < game.balanceCount; i++) {
            //seated left boxes
            seatedTriangle(game.leftBox[i].triangleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top, game.triangleValue, $(leftBoxes[i]));
            seatedSquare(game.leftBox[i].rectCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top + $(leftBoxes[i]).height(), game.squareValue, $(leftBoxes[i]));
            seatedCircle(game.leftBox[i].circleCount, $(leftBoxes[i]).position().left, $(leftBoxes[i]).position().top + $(leftBoxes[i]).height(), game.circleValue, $(leftBoxes[i]));

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

        alignBalances(balances);
        moveShape();
        dropShape();

        $('.bln').hide();
        $(".bln").toggle("scale", 1500, function () { });
        $('.blnTarget > .blnCol').hide();
        $(".blnTarget > .blnCol").toggle("bounce", 2500, function () { });
    }

    function alignBalances(balances) {
        if (balances.length == 3) {
            $(balances[0]).parent().css({
                'margin-left': '20%'
            });
        }

        if (balances.length == 4) {
            $(balances[0]).parent().css({
                'margin-left': '10%'
            });
        }

        if (balances.length == 5) {
            $(balances[0]).parent().css({
                'margin-left': '5%'
            });
        }

        if (balances.length == 6) {
            $(balances[0]).parent().css({
                'margin-left': '1%'
            });
        }
    }

    function dropShape() {
        $(".blnTarget > .blnCol > .blnShape > .boxRight").droppable({
            drop: function (event, ui) {
                var seatedShape = ui.draggable;
                var lastIndex = game.balanceCount - 1;

                if (seatedShapes.length == 9) {
                    alert("Daha fazla şekil koyamazsınız !");
                    //TODO: şekli geriye koy.
                }

                if ($(ropeLeftLines[lastIndex]).height() == 0) {
                    alert("İpi koparttın. Artık oynanmaz !");
                    return;
                }

                if (seatedShape.attr('id') == 'circleShape' && !droppingInsideBox && !extractShape) {
                    seatedCircle(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.circleValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    $(rightBoxes[game.balanceCount - 1]).children().addClass('targetSeatedShape');
                    seatedShapes.push(seatedShape);
                    moveSeatedShape();
                }

                if (seatedShape.attr('id') == 'squareShape' && !droppingInsideBox && !extractShape) {
                    seatedSquare(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.squareValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    $(rightBoxes[game.balanceCount - 1]).children().addClass('targetSeatedShape');
                    seatedShapes.push(seatedShape);
                    moveSeatedShape();
                }

                if (seatedShape.attr('id') == 'triangleShape' && !droppingInsideBox && !extractShape) {
                    seatedTriangle(1, $(rightBoxes[lastIndex]).position().left, $(rightBoxes[lastIndex]).position().top, game.triangleValue, $(rightBoxes[lastIndex]));
                    completeShape(seatedShape, lastIndex);
                    $(rightBoxes[game.balanceCount - 1]).children().addClass('targetSeatedShape');
                    seatedShapes.push(seatedShape);
                    moveSeatedShape();
                }
            }
        });
    }

    function calculateUserAnswer(game) {
        var triangleCount = 0;
        var circleCount = 0;
        var squareCount = 0;

        seatedShapes.forEach(shape => {
            if (shape.attr('id') == 'triangleShape') {
                triangleCount++;
            }

            if (shape.attr('id') == 'squareShape') {
                squareCount++;
            }

            if (shape.attr('id') == 'circleShape') {
                circleCount++;
            }
        });

        userAnswers.push({ game: game, triangleCount: triangleCount, circleCount: circleCount, squareCount: squareCount });
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
            if (extractShape) {
                getLeftLineHeight += difference;
                getLeftBoxHeight += difference;
                getRightBoxHeight -= difference;
                getRightLineHeight -= difference;
            }
            else {
                getLeftLineHeight -= difference;
                getLeftBoxHeight -= difference;
                getRightBoxHeight += difference;
                getRightLineHeight += difference;
            }

            animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);

            animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
            animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
        }

        if (checkRightBigger) {
            if (balanceIndex == game.balanceCount - 1) {
                difference = Math.abs(difference);
            }

            if (extractShape) {
                getLeftLineHeight += difference;
                getLeftBoxHeight += difference;
                getRightBoxHeight -= difference;
                getRightLineHeight -= difference;
            }
            else {
                getLeftLineHeight -= difference;
                getLeftBoxHeight -= difference;
                getRightBoxHeight += difference;
                getRightLineHeight += difference;
            }

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
            revertDuration: 900,

            start: function (event, ui) {
                extractShape = false;

                ui.helper.css({
                    'filter': 'drop-shadow(rgb(69, 201, 58) 5px 6px 7px)',
                })
            },

            stop: function (event, ui) {
                extractShape = false;

                ui.helper.css({
                    'filter': 'none',
                })
            }
        });
    }

    function moveSeatedShape() {
        $(".targetSeatedShape").draggable({
            containment: 'window',
            stack: '.targetSeatedShape',
            revert: true,
            revertDuration: 600,

            start: function () {
                $(this).removeClass('seatedShape');

                $(this).css({
                    'transform': 'scale(1.2)',
                });

                droppingInsideBox = true;

                $(rightBoxes[game.balanceCount - 1]).on("dropout", function (event, ui) {
                    if (ui.draggable.attr('id') == 'triangleShape') {
                        checkShapeCount++;
                        if (checkShapeCount == 1) {
                            prepareTriangle(1, game.triangleValue);
                            ui.draggable.remove();
                            extractShape = true;
                            calculateWeight(game.balanceCount - 1);
                            seatedShapes.shift();
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }

                    if (ui.draggable.attr('id') == 'circleShape') {
                        checkShapeCount++;
                        if (checkShapeCount == 1) {
                            prepareCircle(1, game.circleValue);
                            ui.draggable.remove();
                            extractShape = true;
                            calculateWeight(game.balanceCount - 1);
                            seatedShapes.shift();
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }

                    if (ui.draggable.attr('id') == 'squareShape') {
                        checkShapeCount++;
                        if (checkShapeCount == 1) {
                            prepareSquare(1, game.squareValue);
                            ui.draggable.remove();
                            extractShape = true;
                            calculateWeight(game.balanceCount - 1);
                            seatedShapes.shift();
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }
                });

                checkShapeCount = 0;
            },

            stop: function (event, ui) {
                ui.helper.css({
                    'transform': 'scale(0.7)',
                });

                droppingInsideBox = false;
            },
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
        if (gameTime < 2 || checkComplete) {
            setTimeout(function () {
                $(element).animate({
                    marginTop: marginTopSize,
                }, gameObject.balanceSpeed, function () {
                    //animate completed
                    readyShapeToDrag = true;

                    if (checkComplete) {
                        setTimeout(function () {
                            nextGame();
                        }, 1000);
                        return;
                    }

                    moveShape();
                });
            }, 1500);
        } else {
            $(element).animate({
                marginTop: marginTopSize,
            }, gameObject.balanceSpeed, function () {
                //animate completed
                readyShapeToDrag = true;

                if (checkComplete) {
                    setTimeout(function () {
                        nextGame();
                    }, 1800);
                    return;
                }

                moveShape();
            });
        }
    }

    function animateHeight(element, heightSize) {
        if (gameTime < 2 || checkComplete) {
            setTimeout(function () {
                $(element).animate({
                    height: heightSize,
                }, gameObject.balanceSpeed, function () {
                    //animate completed
                    moveShape();
                });
            }, 1500);
        }
        else {
            $(element).animate({
                height: heightSize,
            }, gameObject.balanceSpeed, function () {
                //animate completed
                moveShape();
            });
        }
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
                calculateUserAnswer(game.name);
                game = games[i];
                clearGame();
                prepareBalances(game);
                addStyles();
                moveShape();
                games.shift();
                setDraggableShapes();
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

    function gameStartTime() {
        setInterval(function () {
            gameTime++;
        }, 1000);
    }
});
