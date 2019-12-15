//This file keeps track of the hero properties, like texture, speed etc.
//It also keeps track of the ball population rate and fall rate.
//It also keeps track of the children population rate and running path complexity.

var level1 = {
    //ball info
    numBalls: 10,
    rateOfFall: .4,
    populationRate: 50,

    //child info
    childSpeed : .15,
    pathLength: 150,
    numKids: 2,

    //hero info
    heroSpeed: 1,
}

var level2 = {
    //ball info
    numBalls: 15,
    rateOfFall: .4,
    populationRate: 50,

    //child info
    childSpeed : .20,
    pathLength: 150,
    pathComplexity: 4,
    numKids: 4,
}

var level3 = {
    //ball info
    numBalls: 15,
    rateOfFall: .4,
    populationRate: 50,

    //child info
    childSpeed : .25,
    pathLength: 150,
    pathComplexity: 6,
    numKids: 8,
}
