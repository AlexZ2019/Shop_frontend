export enum RouteType {
  Auth = 'Auth',
  Public = 'Public',
  NotAuth = 'NotAuth'
}

export interface IRoute {
  component: any
  path: string
  type: RouteType
}

export interface IModule {
  routes: IRoute[]
}
