// package: 
// file: detector/source.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as detector_source_pb from "../detector/source_pb";

interface IVideoSourcesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSources: IVideoSourcesService_IgetSources;
    addSource: IVideoSourcesService_IaddSource;
    updateSource: IVideoSourcesService_IupdateSource;
    removeSource: IVideoSourcesService_IremoveSource;
    subscribeDetections: IVideoSourcesService_IsubscribeDetections;
}

interface IVideoSourcesService_IgetSources extends grpc.MethodDefinition<detector_source_pb.GetVideoSourceRequest, detector_source_pb.GetVideoSourceResponse> {
    path: "/VideoSources/getSources";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<detector_source_pb.GetVideoSourceRequest>;
    requestDeserialize: grpc.deserialize<detector_source_pb.GetVideoSourceRequest>;
    responseSerialize: grpc.serialize<detector_source_pb.GetVideoSourceResponse>;
    responseDeserialize: grpc.deserialize<detector_source_pb.GetVideoSourceResponse>;
}
interface IVideoSourcesService_IaddSource extends grpc.MethodDefinition<detector_source_pb.DetectorVideoSource, detector_source_pb.DetectorVideoSource> {
    path: "/VideoSources/addSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<detector_source_pb.DetectorVideoSource>;
    requestDeserialize: grpc.deserialize<detector_source_pb.DetectorVideoSource>;
    responseSerialize: grpc.serialize<detector_source_pb.DetectorVideoSource>;
    responseDeserialize: grpc.deserialize<detector_source_pb.DetectorVideoSource>;
}
interface IVideoSourcesService_IupdateSource extends grpc.MethodDefinition<detector_source_pb.DetectorVideoSource, detector_source_pb.DetectorVideoSource> {
    path: "/VideoSources/updateSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<detector_source_pb.DetectorVideoSource>;
    requestDeserialize: grpc.deserialize<detector_source_pb.DetectorVideoSource>;
    responseSerialize: grpc.serialize<detector_source_pb.DetectorVideoSource>;
    responseDeserialize: grpc.deserialize<detector_source_pb.DetectorVideoSource>;
}
interface IVideoSourcesService_IremoveSource extends grpc.MethodDefinition<detector_source_pb.RemoveVideoSourceRequest, detector_source_pb.RemoveVideoSourceResponse> {
    path: "/VideoSources/removeSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<detector_source_pb.RemoveVideoSourceRequest>;
    requestDeserialize: grpc.deserialize<detector_source_pb.RemoveVideoSourceRequest>;
    responseSerialize: grpc.serialize<detector_source_pb.RemoveVideoSourceResponse>;
    responseDeserialize: grpc.deserialize<detector_source_pb.RemoveVideoSourceResponse>;
}
interface IVideoSourcesService_IsubscribeDetections extends grpc.MethodDefinition<detector_source_pb.SubscribeDetectionsInput, detector_source_pb.SubscribeDetectionsResponse> {
    path: "/VideoSources/subscribeDetections";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<detector_source_pb.SubscribeDetectionsInput>;
    requestDeserialize: grpc.deserialize<detector_source_pb.SubscribeDetectionsInput>;
    responseSerialize: grpc.serialize<detector_source_pb.SubscribeDetectionsResponse>;
    responseDeserialize: grpc.deserialize<detector_source_pb.SubscribeDetectionsResponse>;
}

export const VideoSourcesService: IVideoSourcesService;

export interface IVideoSourcesServer extends grpc.UntypedServiceImplementation {
    getSources: grpc.handleUnaryCall<detector_source_pb.GetVideoSourceRequest, detector_source_pb.GetVideoSourceResponse>;
    addSource: grpc.handleUnaryCall<detector_source_pb.DetectorVideoSource, detector_source_pb.DetectorVideoSource>;
    updateSource: grpc.handleUnaryCall<detector_source_pb.DetectorVideoSource, detector_source_pb.DetectorVideoSource>;
    removeSource: grpc.handleUnaryCall<detector_source_pb.RemoveVideoSourceRequest, detector_source_pb.RemoveVideoSourceResponse>;
    subscribeDetections: grpc.handleServerStreamingCall<detector_source_pb.SubscribeDetectionsInput, detector_source_pb.SubscribeDetectionsResponse>;
}

export interface IVideoSourcesClient {
    getSources(request: detector_source_pb.GetVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    getSources(request: detector_source_pb.GetVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    getSources(request: detector_source_pb.GetVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    addSource(request: detector_source_pb.DetectorVideoSource, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    addSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    addSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: detector_source_pb.DetectorVideoSource, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    removeSource(request: detector_source_pb.RemoveVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    removeSource(request: detector_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    removeSource(request: detector_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    subscribeDetections(request: detector_source_pb.SubscribeDetectionsInput, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<detector_source_pb.SubscribeDetectionsResponse>;
    subscribeDetections(request: detector_source_pb.SubscribeDetectionsInput, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<detector_source_pb.SubscribeDetectionsResponse>;
}

export class VideoSourcesClient extends grpc.Client implements IVideoSourcesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getSources(request: detector_source_pb.GetVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public getSources(request: detector_source_pb.GetVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public getSources(request: detector_source_pb.GetVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.GetVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public addSource(request: detector_source_pb.DetectorVideoSource, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public addSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public addSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: detector_source_pb.DetectorVideoSource, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: detector_source_pb.DetectorVideoSource, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.DetectorVideoSource) => void): grpc.ClientUnaryCall;
    public removeSource(request: detector_source_pb.RemoveVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public removeSource(request: detector_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public removeSource(request: detector_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public subscribeDetections(request: detector_source_pb.SubscribeDetectionsInput, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<detector_source_pb.SubscribeDetectionsResponse>;
    public subscribeDetections(request: detector_source_pb.SubscribeDetectionsInput, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<detector_source_pb.SubscribeDetectionsResponse>;
}
