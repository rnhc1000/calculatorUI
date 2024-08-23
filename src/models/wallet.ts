export class WalletDTO {

    id?: number;
    operations: WalletOperationsDTO[] = [];
    get total(): number {
        const total: number = 100.00;
        let balance: number = total;
        this.operations.forEach(operation => {
            balance -= operation.subTotal;
        })
        return balance;
    }

}

export class WalletOperationsDTO {

    constructor(
        public operationId: number,
        public cost: number,

    ) { }
    get subTotal(): number {
        return this.cost;
    }
    
}