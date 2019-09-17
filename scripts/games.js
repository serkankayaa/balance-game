var gameObject = {
    maxShapeCount: 5,
    balanceSpeed: 1000,
    defaultHeight: 35
}

var game1 = {
    name: 'game1',
    balanceCount: 3,
    dragShapes: [ 'triangle', 'circle' ],
    triangleValue: 3,
    circleValue: 2,
    squareValue: 5,
    leftBox: [
        { triangleCount: 2, rectCount: 1, circleCount: 0 },
        { triangleCount: 0, rectCount: 0, circleCount: 1 },
        { triangleCount: 0, rectCount: 3, circleCount: 0 },
    ],
    rightBox: [
        { triangleCount: 1, rectCount: 0, circleCount: 0 },
        { triangleCount: 1, rectCount: 0, circleCount: 0 },
        { triangleCount: 0, rectCount: 0, circleCount: 0 },
    ],
}

var game2 = {
    name: 'game2',
    balanceCount: 3,
    dragShapes: [ 'circle', 'square'],
    triangleValue: 3,
    circleValue: 2,
    squareValue: 5,
    leftBox: [
        { triangleCount: 1, rectCount: 0, circleCount: 0 },
        { triangleCount: 0, rectCount: 1, circleCount: 0 },
        { triangleCount: 3, rectCount: 0, circleCount: 0 },
    ],
    rightBox: [
        { triangleCount: 0, rectCount: 0, circleCount: 2 },
        { triangleCount: 2, rectCount: 0, circleCount: 0 },
        { triangleCount: 0, rectCount: 0, circleCount: 0 },
    ],
}

var game3 = {
    name: 'game3',
    balanceCount: 3,
    dragShapes: [ 'circle', 'square'],
    triangleValue: 3,
    circleValue: 2,
    squareValue: 5,
    leftBox: [
        { triangleCount: 0, rectCount: 2, circleCount: 0 },
        { triangleCount: 3, rectCount: 0, circleCount: 0 },
        { triangleCount: 2, rectCount: 0, circleCount: 0 },
    ],
    rightBox: [
        { triangleCount: 3, rectCount: 0, circleCount: 0 },
        { triangleCount: 0, rectCount: 0, circleCount: 4 },
        { triangleCount: 0, rectCount: 0, circleCount: 0 },
    ],
}
