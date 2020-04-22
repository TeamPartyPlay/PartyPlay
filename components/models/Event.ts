interface IBase {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IPlaylist extends IBase {
    spotifyId: string,
    tracks: string[] | null,
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
    IPlaylist, ILocation, IEvent
}