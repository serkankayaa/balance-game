
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
    var shapeId = "circleShape";

    for (let i = 0; i < shapeCount; i++) {
        shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left: 3px; position:absolute;"></div>`;
        $(".circles").append(shapeHtml);
    }
}

function prepareSquare(shapeCount, value) {
    var shapeHtml = "";
    var shapeId = "squareShape";

    for (let i = 0; i < shapeCount; i++) {
        shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left: 3px; position:absolute"></div>`;
        $(".squares").append(shapeHtml);
    }
}

function prepareTriangle(shapeCount, value) {
    var shapeHtml = "";
    var shapeId = "triangleShape";

    for (let i = 0; i < shapeCount; i++) {
        shapeHtml = `<div id=${shapeId} value=${value} class="dragShape" style="margin-left: 3px; position:absolute"></div>`;
        $(".triangles").append(shapeHtml);
    }
}