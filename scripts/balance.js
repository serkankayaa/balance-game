$(document).ready(function () {
    var balances = [];
    var game = game1;
    var shapeCount = 5;

    prepareBalances(game);
    addStyles();

    function prepareBalances(game) {
        var balanceCount = game.leftChamber.length;
        var balanceHtml = "";
        var shapeHtml = "";

        for (var i = 0; i < balanceCount; i++) {
            balanceHtml = "<div class='col blnCol'>";
            balanceHtml += `<div id='balance${i}' class='blnShape'>`;
            balanceHtml += `<div class="hanger"></div>
            <div class="pendulum"></div>
            <div class="ropeLeft"></div>
            <div class="ropeRight"></div>
            <div class="boxLeft"></div>
            <div class="boxRight"></div></div></div>`;

            $(".bln").append(balanceHtml);
        }

        $(".blnShape").each(function () {
            var blnShapeId = ($(this).attr("id"));

            balances.push("#" + blnShapeId);
            balances.sort();
        });

        shapeHtml += `<div class="row shapes">
        <div class="col circles"></div>
        <div class="col squares"></div>
        <div class="col triangles"></div>
        </div>`;

        $(".bln").append(shapeHtml);

        prepareCircle(shapeCount, game1.circleValue);
        prepareSquare(shapeCount, game1.rectValue);
        prepareTriangle(shapeCount, game1.rectValue);
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
            'margin-right' : '4px',
        });
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
