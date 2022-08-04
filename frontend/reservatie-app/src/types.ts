export enum ETimeOfDay {
  "Voormiddag",
  "Namiddag",
  "Volledige dag",
}

export enum ReservationStatus {
  "geannuleerd",
  "actief",
  "verlopen",
}

export enum SeatAvailability {
  'Taken' = "Taken", 
  'Free' = "Free", 
  'Unavailable' = "Unavailable" 
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  email: string;
  languageUse: string;
  hasAssingedSeat: boolean;
}

export interface ICompany {
    id?: number,
    companyName: string
}

export interface IReservation {
  id?: number;
  reservationDate: string;
  timeOfDay: string;
  reservationStatus: string;
  usersId: string;
  seatId?: number;
  timeOfAnnulation: string;
}

export interface IUReservation{
  id?: number;
  reservationDate: string;
  timeOfDay: string;
  reservationStatus: string;
  usersId: string;
  seatId?: number;
  timeOfAnnulation: string;
  location?:number;
  workplace?:string;
}

export interface ISeat {
  id?: number;
  workplaceId: number;
  name: string;
  availabilityStatus: string;
  coordinateX: number;
  coordinateY: number;
  hasAssignedUser : boolean
}

export interface IAssignedSeats {
  id?: number;
  usersId: string;
  seatId: number;
}

export interface IWorkplace {
  id?: number;
  workplaceName: string;
  maxUsers: number;
  companyId: number;
  streetAdress?: string;
  city?: string;
  country?: string;
  zipcode?: number;
  floorNumber?: number;
  plattegrond: string;
}

export interface IReservationLimitStatus {
  voormiddag: number;
  namiddag: number;
  volledigeDag: number;
}

export interface IAssingedSeat {
  value: boolean;
  label: string;
}
export interface IIsAdmin {
  value: boolean;
  label: string;
}

export interface ILanguages {
  value: string;
}

export interface ILogTable {
  id: number;
  logDate: string;
  logTime: string;
  usersId?: string;
  reservationId?: number;
  seatId?: number;
  workplaceId?: number;
  companyId?: number;
  logAction: string;
}

// jwt json
export interface IJwtToken {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  aio: string;
  email: string;
  idp: string;
  name: string;
  nonce: string;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
}

export interface IReservationRules {
  workplaceId: number,
  maxReservationPeriod: number,
  maxReservations: number,
  minAnnulationTime: number
}