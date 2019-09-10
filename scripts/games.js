var gameObject = {
    triangleValue: 3,
    circleValue: 2,
    squareValue: 5,
    maxShapeCount: 5,
    balanceSpeed: 1000
}

var game1 = {
    name: 'game1',
    balanceCount: 5,
    leftBox: [
        { triangleCount: 1, rectCount: 2, circleCount: 0 },
        { triangleCount: 1, rectCount: 0, circleCount: 1 },
        { triangleCount: 0, rectCount: 1, circleCount: 1 },
        { triangleCount: 0, rectCount: 0, circleCount: 0 },
        { triangleCount: 0, rectCount: 1, circleCount: 0 },
    ],
    rightBox: [
        { triangleCount: 1, rectCount: 0, circleCount: 1 },
        { triangleCount: 1, rectCount: 1, circleCount: 0 },
        { triangleCount: 1, rectCount: 1, circleCount: 0 },
        { triangleCount: 2, rectCount: 0, circleCount: 3 },
        { triangleCount: 0, rectCount: 0, circleCount: 0 },
    ],
}
