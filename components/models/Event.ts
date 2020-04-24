interface IBase {
    _id: string;
    __v: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ITrack extends IBase {
    spotifyId: string,
    votes: string[]
}

interface IPlaylist extends IBase {
    spotifyId: string,
    tracks: ITrack[] | null,
}

interface ILocation extends IBase {
    lng: number,
    lat: number
}

interface IEvent {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    invites: string[];
    attendees: string[];
    tags:string[];
    playlist: IPlaylist | string | null;
    name: string;
    description: string;
    owner: string;
    location: ILocation | string;
    start: Date;
    end?: Date;
    isPublic: boolean;
}

export {
    IPlaylist, ILocation, IEvent, ITrack
}