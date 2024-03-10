// LOGIN
// export interface UserData {
//   userId: number;
//   parent: number;
//   userName: string;
//   sub: string;
//   personName: string;
//   userAccountExpires: string;
//   userEmail: string;
//   unique_name: string;
//   timeZone: number;
//   endDate: number;
// }
export interface UserData {
id:number
username:string
email:string
firstName:string
lastName:string
gender:string
image:string
token:string
}

export interface Login {
  username: string;
  password: string;
}

export interface Token {
  user: string;
  userToken: string;
}
// APi Response
export interface Res {
  status: {
    code: number;
    message: string;
  };
  response: any;
}

export interface NotificationPre {
  vehicles: Array<{
    vehicleId: number;
    vehicleName: string;
  }>;
  minimumDate: string;
  maximumDate: string;
}

export interface NotificationAfterDate {
  distanceValue: string;
  transactionCreationTime: string;
  transactionCreationTimeStamp: string;
  vehcileId: number;
  vehcileUniqueId: string;
  vehcileName: string;
  alertableItemId: number;
  alertableItemName: string;
  alertableItemLifeDistance: number;
  remainedDistance: number;
}

export interface NotificationBeforeDate {
  distanceValue: string;
  transactionCreationTime: string;
  transactionCreationTimeStamp: string;
  vehcileId: number;
  vehcileUniqueId: string;
  vehcileName: string;
  alertableItemId: number;
  alertableItemName: string;
  alertableItemLifeDistance: number;
  remainedDistance: number;
}

export class GetNotifications {
  dateFrom: string;
  dateTo: string;
  vechileId: number;
}

export class Notifications {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  read: number;
  route: string;
}
