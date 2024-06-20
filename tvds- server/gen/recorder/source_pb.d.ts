// package: 
// file: recorder/source.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class FetchVideoSourceRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): FetchVideoSourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FetchVideoSourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: FetchVideoSourceRequest): FetchVideoSourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FetchVideoSourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FetchVideoSourceRequest;
    static deserializeBinaryFromReader(message: FetchVideoSourceRequest, reader: jspb.BinaryReader): FetchVideoSourceRequest;
}

export namespace FetchVideoSourceRequest {
    export type AsObject = {
        id: number,
    }
}

export class VideoSourceListResponse extends jspb.Message { 
    clearSourcesList(): void;
    getSourcesList(): Array<VideoSource>;
    setSourcesList(value: Array<VideoSource>): VideoSourceListResponse;
    addSources(value?: VideoSource, index?: number): VideoSource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VideoSourceListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: VideoSourceListResponse): VideoSourceListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VideoSourceListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VideoSourceListResponse;
    static deserializeBinaryFromReader(message: VideoSourceListResponse, reader: jspb.BinaryReader): VideoSourceListResponse;
}

export namespace VideoSourceListResponse {
    export type AsObject = {
        sourcesList: Array<VideoSource.AsObject>,
    }
}

export class VideoSourceRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): VideoSourceRequest;
    getVideo(): string;
    setVideo(value: string): VideoSourceRequest;
    getImages(): string;
    setImages(value: string): VideoSourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VideoSourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VideoSourceRequest): VideoSourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VideoSourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VideoSourceRequest;
    static deserializeBinaryFromReader(message: VideoSourceRequest, reader: jspb.BinaryReader): VideoSourceRequest;
}

export namespace VideoSourceRequest {
    export type AsObject = {
        id: number,
        video: string,
        images: string,
    }
}

export class VideoSource extends jspb.Message { 
    getId(): number;
    setId(value: number): VideoSource;
    getVideo(): string;
    setVideo(value: string): VideoSource;
    getImages(): string;
    setImages(value: string): VideoSource;
    getCreatedAt(): string;
    setCreatedAt(value: string): VideoSource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VideoSource.AsObject;
    static toObject(includeInstance: boolean, msg: VideoSource): VideoSource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VideoSource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VideoSource;
    static deserializeBinaryFromReader(message: VideoSource, reader: jspb.BinaryReader): VideoSource;
}

export namespace VideoSource {
    export type AsObject = {
        id: number,
        video: string,
        images: string,
        createdAt: string,
    }
}

export class UpdateVideoSourceResponse extends jspb.Message { 
    getIsupdated(): boolean;
    setIsupdated(value: boolean): UpdateVideoSourceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateVideoSourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateVideoSourceResponse): UpdateVideoSourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateVideoSourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateVideoSourceResponse;
    static deserializeBinaryFromReader(message: UpdateVideoSourceResponse, reader: jspb.BinaryReader): UpdateVideoSourceResponse;
}

export namespace UpdateVideoSourceResponse {
    export type AsObject = {
        isupdated: boolean,
    }
}

export class RemoveVideoSourceRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): RemoveVideoSourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveVideoSourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveVideoSourceRequest): RemoveVideoSourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveVideoSourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveVideoSourceRequest;
    static deserializeBinaryFromReader(message: RemoveVideoSourceRequest, reader: jspb.BinaryReader): RemoveVideoSourceRequest;
}

export namespace RemoveVideoSourceRequest {
    export type AsObject = {
        id: number,
    }
}

export class RemoveVideoSourceResponse extends jspb.Message { 
    getIsdeleted(): boolean;
    setIsdeleted(value: boolean): RemoveVideoSourceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveVideoSourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveVideoSourceResponse): RemoveVideoSourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveVideoSourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveVideoSourceResponse;
    static deserializeBinaryFromReader(message: RemoveVideoSourceResponse, reader: jspb.BinaryReader): RemoveVideoSourceResponse;
}

export namespace RemoveVideoSourceResponse {
    export type AsObject = {
        isdeleted: boolean,
    }
}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class Event extends jspb.Message { 
    getId(): number;
    setId(value: number): Event;
    getType(): string;
    setType(value: string): Event;
    getEvent(): string;
    setEvent(value: string): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        id: number,
        type: string,
        event: string,
    }
}
