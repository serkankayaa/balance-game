$(document).ready(function () {
    //bütün oyunlar
    var games = [];
    games.push(game2, game3);
    games.sort();

    //kullanıcının cevapları
    var userAnswers = [];

    //balance elements
    var balances = [];
    var leftBoxes = [];
    var rightBoxes = [];
    var ropeLeftLines = [];
    var ropeRightLines = [];
    var floors = [];

    //hedef terazide oturtulan sekiller
    var seatedShapes = [];

    var checkComplete = false;
    var extractShape = false;
    var droppingInsideBox = false;
    var checkInsideBox = false;
    var checkShapeCount = 0;
    var gameTime = 0;
    var defaultHeight = gameObject.defaultHeight;

    //ilk oyunun yüklenmesi
    var game = game1;
    checkGameInitialize = true;
    prepareBalances(game);
    setDraggableShapes();
    addStyles();
    moveShape();
    dropShape();
    startGameTime();

    console.log(checkIE());

    //hareket ettirilebilir şekiller oluşturuluyor.
    function setDraggableShapes() {
        if (/Edge/.test(navigator.userAgent)) {
            var shapeHtml = "<div class='col-md-9 shapes'>";
        }
        else {
            shapeHtml = "<div class='col-md-7 shapes'>";
        }

        $(".blnTarget").append(shapeHtml);

        game.dragShapes.forEach(function (element) {
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

        var shapeDeskHtml = '<div class="deskImage"></div>';
        $(".shapes").append(shapeDeskHtml);

        addStyles();
        moveShape();

        $(".shapes").css({ opacity: 0 });
    }

    //Tüm teraziler hazırlanıp dolduruluyor ve sabit şekillerin ağırlık kontrolü yapılıyor.
    function prepareBalances(game) {
        var balanceHtml = "";
        var targetBalanceHtml = "";

        for (var balanceIndex = 0; balanceIndex < game.balanceCount; balanceIndex++) {

            if (balanceIndex == game.balanceCount - 1) {
                targetBalanceHtml = createBalance(targetBalanceHtml, balanceIndex);
                $(".blnTarget").append(targetBalanceHtml);
                $(".blnTarget").addClass('mx-auto');
            }
            else {
                balanceHtml = createBalance(balanceHtml, balanceIndex);
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

        $(".floor").each(function () {
            var floorId = ($(this).attr("id"));

            floors.push("#" + floorId);
            floors.sort();
        });

        for (let i = 0; i < game.balanceCount; i++) {
            var leftBoxShapeCount = game.leftBox[i].triangleCount + game.leftBox[i].circleCount + game.leftBox[i].rectCount;
            var rightBoxShapeCount = game.rightBox[i].triangleCount + game.rightBox[i].circleCount + game.rightBox[i].rectCount;

            if (leftBoxShapeCount > 9) {
                alert("çok fazla şekil dolduruldu");
                return;
            }

            if (rightBoxShapeCount > 9) {
                alert("çok fazla şekil dolduruldu");
                return;
            }

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

            var getLeftLineHeight = parseInt($(ropeLeftLines[i]).height());
            var getRightLineHeight = parseInt($(ropeRightLines[i]).height());

            var getLeftBoxHeight = parseInt($(leftBoxes[i]).css('margin-top'));
            var getRightBoxHeight = parseInt($(rightBoxes[i]).css('margin-top'));

            difference = leftValue - rightValue;

            if (leftValue > rightValue) {
                getLeftLineHeight += defaultHeight;
                getLeftBoxHeight += defaultHeight;
                getRightBoxHeight -= defaultHeight;
                getRightLineHeight -= defaultHeight;

                var topHeight = getLeftLineHeight * 2 + 28 + "px";

                $('.floor').css({
                    'margin-top': topHeight,
                })
            }

            if (leftValue < rightValue) {
                getLeftLineHeight -= defaultHeight;
                getLeftBoxHeight -= defaultHeight;
                getRightBoxHeight += defaultHeight;
                getRightLineHeight += defaultHeight;
            }

            animateMargin($(leftBoxes[i]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[i]), getLeftLineHeight);

            animateMargin($(rightBoxes[i]), getRightBoxHeight);
            animateHeight($(ropeRightLines[i]), getRightLineHeight);
        }

        alignBalances(balances);
        moveShape();
        dropShape();

        $(".bln").hide();
        $(".bln").toggle("scale", 1500, function () {
            $(".bln").css({
                'transform': 'scale(0.9)',
            })
        });
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

    //şekil hedefin terazideki sağ kutuya bırakıldığında çalışacak method
    function dropShape() {
        $(".blnTarget > .blnCol > .blnShape > .boxRight").droppable({
            drop: function (event, ui) {
                var seatedShape = ui.draggable;
                var lastIndex = game.balanceCount - 1;

                if (seatedShapes.length == 9) {
                    return;
                }

                if ($(ropeLeftLines[lastIndex]).height() == 0) {
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

        seatedShapes.forEach(function (shape) {
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

        //kullanıcının her cevapladığı sorunun veritabanına kaydedilmesi için kullanılıyor.
        userAnswers.push({ game: game, triangleCount: triangleCount, circleCount: circleCount, squareCount: squareCount });
    }

    //hedef terazinin dengesi kontrol ediliyor.
    function calculateWeight(balanceIndex) {
        var leftValue = 0;
        var rightValue = 0;
        var difference = 0;
        var checkLeftBigger = false;
        var checkRightBigger = false;

        $(leftBoxes[balanceIndex]).children('.seatedShape').each(function () {
            leftValue += parseInt($(this).attr('value'));
        });

        $(rightBoxes[balanceIndex]).children('.seatedShape').each(function () {
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
            if (getRightBoxHeight < getLeftBoxHeight) {
                animateMargin($(rightBoxes[balanceIndex]), getLeftBoxHeight - getLeftBoxHeight + getRightBoxHeight + 19);
                animateHeight($(ropeRightLines[balanceIndex]), getLeftLineHeight - getLeftLineHeight + getRightLineHeight + 19);

                animateMargin($(leftBoxes[balanceIndex]), getRightBoxHeight + 19);
                animateHeight($(ropeLeftLines[balanceIndex]), getRightLineHeight + 19);
            }
            else {
                animateMargin($(rightBoxes[balanceIndex]), getLeftBoxHeight - getLeftBoxHeight + getRightBoxHeight - 19);
                animateHeight($(ropeRightLines[balanceIndex]), getLeftLineHeight - getLeftLineHeight + getRightLineHeight - 19);

                animateMargin($(leftBoxes[balanceIndex]), getRightBoxHeight - 19);
                animateHeight($(ropeLeftLines[balanceIndex]), getRightLineHeight - 19);
            }

            checkComplete = true;
        }

        if (checkLeftBigger) {
            difference = 15;
            if (extractShape) {
                if (getRightBoxHeight > getLeftLineHeight) {
                    var newDifference = 55;
                    getLeftLineHeight += newDifference;
                    getLeftBoxHeight += newDifference;
                    getRightBoxHeight -= newDifference;
                    getRightLineHeight -= newDifference;
                }
                else {
                    difference = 0;
                }
            }
            else {
                getLeftLineHeight -= difference;
                getLeftBoxHeight -= difference;
                getRightBoxHeight += difference;
                getRightLineHeight += difference;
            }

            animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
            animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);
            animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight + difference);
            animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight + difference);

            animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
            animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
            animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight - difference);
            animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight - difference);

            moveShape();
        }

        if (checkRightBigger) {
            difference = 35;
            if (balanceIndex == game.balanceCount - 1) {
                difference = Math.abs(difference);
            }

            if (extractShape) {
                var insideDifference = leftValue - rightValue;

                if (insideDifference > 0) {
                    getLeftLineHeight += difference;
                    getLeftBoxHeight += difference;
                    getRightBoxHeight -= difference;
                    getRightLineHeight -= difference;
                }

                getLeftLineHeight += difference;
                getLeftBoxHeight += difference;
                getRightBoxHeight -= difference;
                getRightLineHeight -= difference;

                animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
                animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);
                animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight - difference);
                animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight - difference);

                animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
                animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
                animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight + difference);
                animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight + difference);
            }
            else {
                if (getRightBoxHeight > getLeftBoxHeight) {
                    difference = 0;
                }
                else {
                    getLeftLineHeight -= difference;
                    getLeftBoxHeight -= difference;
                    getRightBoxHeight += difference;
                    getRightLineHeight += difference;

                    animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight);
                    animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight);
                    animateMargin($(leftBoxes[balanceIndex]), getLeftBoxHeight - difference);
                    animateHeight($(ropeLeftLines[balanceIndex]), getLeftLineHeight - difference);

                    animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight);
                    animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight);
                    animateMargin($(rightBoxes[balanceIndex]), getRightBoxHeight + difference);
                    animateHeight($(ropeRightLines[balanceIndex]), getRightLineHeight + difference);
                }
            }

            if (getLeftBoxHeight < getRightBoxHeight) {
                difference = -35;
            }

            moveShape();
        }
    }

    //dışarıdaki şekiller hareket ettirilir.
    function moveShape() {
        $(".dragShape").draggable({
            containment: 'window',
            stack: '.dragShape',
            revert: true,
            revertDuration: 900,
            cursor: 'grab',

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

    //hedef teraziye oturtulan şekiller hareket ettirilir.
    function moveSeatedShape() {
        $(".targetSeatedShape").draggable({
            containment: 'window',
            stack: '.targetSeatedShape',
            revert: 'valid',
            revertDuration: 600,
            cursor: 'grab',

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
                            setToOriginalPosition(ui);
                            extractShape = true;
                            seatedShapes.shift();
                            calculateWeight(game.balanceCount - 1);
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }

                    if (ui.draggable.attr('id') == 'circleShape') {
                        checkShapeCount++;
                        if (checkShapeCount == 1) {
                            prepareCircle(1, game.circleValue);
                            ui.draggable.remove();
                            setToOriginalPosition(ui);
                            extractShape = true;
                            seatedShapes.shift();
                            calculateWeight(game.balanceCount - 1);
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }

                    if (ui.draggable.attr('id') == 'squareShape') {
                        checkShapeCount++;
                        if (checkShapeCount == 1) {
                            prepareSquare(1, game.squareValue);
                            ui.draggable.remove();
                            setToOriginalPosition(ui);
                            extractShape = true;
                            seatedShapes.shift();
                            calculateWeight(game.balanceCount - 1);
                            droppingInsideBox = false;
                        }

                        moveShape();
                    }
                });

                checkShapeCount = 0;
            },

            stop: function (event, ui) {
                ui.helper.css({
                    'transform': 'scale(0.85)',
                });

                droppingInsideBox = false;
            },
        });
    }

    //İki divin birbiri içerisinde olup olmadığı kontrol ediliyor.
    function checkInside(r1, r2) {
        return !(
            r2.offset().left > r1.offset().left + r1.outerWidth() ||
            r2.offset().left + r2.outerWidth() < r1.offset().left ||
            r2.offset().top > r1.offset().top + r1.outerHeight() ||
            r2.offset().top + r2.outerHeight() < r1.offset().top
        );
    }

    //kutunun dışına çıkarılan şekil orjinal pozisyonuna gidiyor.
    function setToOriginalPosition(shape) {
        var shapeId = "#" + shape.draggable.attr('id');
        var seatedShape = $('.shapes').children().children(shapeId);
        seatedShape.hide();
        seatedShape.show('bounce', 'slow');
    }

    //oturan şekiller düzenleniyor.
    function completeShape(seatedShape, lastIndex) {
        var seatedShapeClass = ".blnTarget > .blnCol > .blnShape > .boxRight > .seatedShape";

        seatedShape.remove();
        calculateWeight(lastIndex);

        $(seatedShapeClass).css({
            'transform': 'scale(0.85)',
            'margin-left': '1.2px',
            'margin-top': '1px',
        });

        moveShape();
    }

    //tek bir terazi oluşturuluyor.
    function createBalance(balanceHtml, index) {
        if (index == game.balanceCount - 1) {
            if (/Edge/.test(navigator.userAgent)) {
                balanceHtml = "<div class='col-md-3 blnCol'>";
            }
            else {
                balanceHtml = "<div class='col-md-5 blnCol'>";
            }
        }
        else {
            balanceHtml = "<div class='col blnCol'>";
        }

        balanceHtml += "<div id='balance" + index + "' class='blnShape'>";
        balanceHtml += "<div class='pendulum' id='pendulum" + index + "'></div>";
        balanceHtml += "<div class='ropeLeft' id = 'ropeLeft" + index + "'></div >";
        balanceHtml += "<div class='ropeRight' id='ropeRight" + index + "'></div>";
        balanceHtml += "<div class='boxLeft' id='boxLeft" + index + "'></div>";
        balanceHtml += "<div class='boxRight' id='boxRight" + index + "'></div>";
        balanceHtml += "<div class='floor' id='floor" + index + "'></div>";
        balanceHtml += "<div class='ropeTop' id='ropeTop" + index + "'></div>";
        balanceHtml += "<div class='topHanger' id='topHanger" + index + "'></div>";
        balanceHtml += "</div>";

        return balanceHtml;
    }

    //Kutuların ve iplerin margin-top animasyonu
    function animateMargin(element, marginTopSize) {
        //açılır açılmaz şekiller animasyon ile aşağı-yukarı çıksın.
        var balanceSpeed = gameObject.initialBalanceSpeed;
        var currentBalanceId = element.parent().attr('id');

        if (balances[game.balanceCount - 1] == currentBalanceId) {
            balanceSpeed = gameObject.balanceSpeed;
        }

        if (checkGameInitialize) {
            setTimeout(function () {
                $(element).animate({
                    marginTop: marginTopSize,
                }, {
                    duration: balanceSpeed,
                    complete: function () {
                        //animation complete
                        readyShapeToDrag = true;
                        checkGameInitialize = false;

                        if (checkComplete) {
                            setTimeout(function () {
                                nextGame();
                            }, 1000);
                            return;
                        }

                        $(".shapes").css({ opacity: 1 });

                        moveShape();
                    }
                });
            }, 1500);
        } else {
            $(element).animate({
                marginTop: marginTopSize,
            }, {
                duration: balanceSpeed,
                complete: function () {
                    //animation complete
                    readyShapeToDrag = true;
                    checkGameInitialize = false;

                    if (checkComplete) {
                        $('.bln').html('<div class="col-md-3"></div><div class="col-md-3 success"></div><div class="col-md-3"></div>');

                        setTimeout(function () {
                            nextGame();
                        }, 2000);
                        return;
                    }

                    $(".shapes").css({ opacity: 1 });

                    $(".dragShape").draggable({ disabled: false });
                    $(".targetSeatedShape").draggable({ disabled: false });
                    moveShape();
                },

                step: function (now, fx) {
                    $(".dragShape").draggable({ disabled: true });
                    $(".targetSeatedShape").draggable({ disabled: true });
                }
            });
        }
    }

    //kutuların ve iplerin height animasyonları
    function animateHeight(element, heightSize) {
        var balanceSpeed = gameObject.initialBalanceSpeed;
        var currentBalanceId = element.parent().attr('id');

        if (balances[game.balanceCount - 1] == currentBalanceId) {
            balanceSpeed = gameObject.balanceSpeed;
        }

        if (checkGameInitialize) {
            setTimeout(function () {
                $(element).animate({
                    height: heightSize,
                }, {
                    duration: balanceSpeed,
                    complete: function () {
                        //animation complete
                        checkGameInitialize = false;
                        moveShape();
                    },
                });
            }, 1500);
        }
        else {
            $(element).animate({
                height: heightSize,
            }, {
                duration: balanceSpeed,
                complete: function () {
                    //animation complete
                    checkGameInitialize = false;
                    moveShape();
                },
            });
        }
    }

    //bir sonraki oyuna geçildiğinde önceki oyun temizlensin.
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

    //bir sonraki oyuna geç.
    function nextGame() {
        if (checkComplete && games.length == 0) {
            alert("Oyun bitti tebrikler");
            clearGame();
            window.location.reload();
            return;
        }

        for (let i = 0; i < games.length; i++) {
            if (checkComplete) {
                calculateUserAnswer(game.name);
                game = games[i];
                checkGameInitialize = true;
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
            'transform': 'scale(0.85)',
            'margin-left': '1.2px',
            'margin-top': '2px',
        });

        $('.blnTarget > .blnCol').addClass('mt-5');

        $(rightBoxes[game.balanceCount - 1]).css({
            'padding-top': '100%',
            'padding-bottom': '2%',
        });

        $('.boxLeft').css({
            'padding-top': '40px',
        });

        $('.boxRight').not(rightBoxes[game.balanceCount - 1]).css({
            'padding-top': '40px',
        });
    }

    //oyunun zaman değerini verir.
    function startGameTime() {
        setInterval(function () {
            gameTime++;
        }, 1000);
    }

    function checkIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
        }

        // other browser
        return false;
    }
});
