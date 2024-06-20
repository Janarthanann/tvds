
export interface DropDownItem {
    id: number | string;
    name: string;
}


export enum Violations {
    NoHelmet = "NoHelmet",
    TripleRiding = "TripleRiding",
    SpeedViolation = "SpeedViolation",
    WrongSide = "WrongSide",
    NoSeatBelt = "NoSeatBelt",
    DistractedDriving = "DistractedDriving",
    StopLineViolation = "StopLineViolation",
    SignalJumping = "SignalJumping"
}

export enum VehicleType {
    Bike = "Bike",
    Auto = "Auto",
    Car = "Car",
    Bus = "Bus",
    MiniTruck = "MiniTruck",
    Truck = "Truck"
}

//system api enum issue(temporary added)
export enum SystemNodeType {
    RECORDER = "RECORDER",
    DETECTOR = "DETECTOR"
}
