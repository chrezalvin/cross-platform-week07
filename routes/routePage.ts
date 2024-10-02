import routeList from './routeList';

export type RouteStackParamList = {
    [routeList.home]: undefined;
    [routeList.email]: {
        name: string;
        email: string;
        photo_url: string;
    };
};

export default RouteStackParamList;