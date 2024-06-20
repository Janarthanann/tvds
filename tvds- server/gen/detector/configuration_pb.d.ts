// package: 
// file: detector/configuration.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class DetectorConfigRequest extends jspb.Message { 
    getConfiguration(): string;
    setConfiguration(value: string): DetectorConfigRequest;
    getForce(): boolean;
    setForce(value: boolean): DetectorConfigRequest;
    getUrl(): string;
    setUrl(value: string): DetectorConfigRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectorConfigRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DetectorConfigRequest): DetectorConfigRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectorConfigRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectorConfigRequest;
    static deserializeBinaryFromReader(message: DetectorConfigRequest, reader: jspb.BinaryReader): DetectorConfigRequest;
}

export namespace DetectorConfigRequest {
    export type AsObject = {
        configuration: string,
        force: boolean,
        url: string,
    }
}

export class DetectorConfigResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DetectorConfigResponse;
    getMessage(): string;
    setMessage(value: string): DetectorConfigResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectorConfigResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DetectorConfigResponse): DetectorConfigResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectorConfigResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectorConfigResponse;
    static deserializeBinaryFromReader(message: DetectorConfigResponse, reader: jspb.BinaryReader): DetectorConfigResponse;
}

export namespace DetectorConfigResponse {
    export type AsObject = {
        success: boolean,
        message: string,
    }
}
