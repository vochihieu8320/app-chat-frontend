export class TopUp {
    userId: number;
    lowerThan: number;
    inreaseTo: number;
    inreaseRandom: boolean;
    randomMax : number;
    randomMin : number;
    status: number;


    constructor(userId:  number, lowerThan: number,  increaseRandom: boolean,
         randomMax:  number, randomMin:  number, status: number, inreaseTo?: number ){
            this.userId = userId;
            this.lowerThan = lowerThan;
            this.inreaseRandom = increaseRandom,
            this.randomMax = randomMax,
            this.randomMin = randomMin,
            this.status = status,
            this.inreaseTo = inreaseTo

    }
  }


