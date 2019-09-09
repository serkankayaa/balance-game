$(document).ready(function () {
    var balances = [];
    var game = game1;
    var balanceCol = 'bln col';

    prepareBalances(game);

    function prepareBalances(game) {
        var balanceCount = game.leftChamber.length;
        var balanceHtml = "";

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
    }
});
