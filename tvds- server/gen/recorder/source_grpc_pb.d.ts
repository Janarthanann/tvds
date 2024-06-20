// package: 
// file: recorder/source.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as recorder_source_pb from "../recorder/source_pb";

interface IVideoSourcesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSources: IVideoSourcesService_IGetSources;
    addSource: IVideoSourcesService_IAddSource;
    updateSource: IVideoSourcesService_IUpdateSource;
    deleteSource: IVideoSourcesService_IDeleteSource;
    subscribeEvents: IVideoSourcesService_ISubscribeEvents;
}

interface IVideoSourcesService_IGetSources extends grpc.MethodDefinition<recorder_source_pb.FetchVideoSourceRequest, recorder_source_pb.VideoSourceListResponse> {
    path: "/VideoSources/GetSources";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_source_pb.FetchVideoSourceRequest>;
    requestDeserialize: grpc.deserialize<recorder_source_pb.FetchVideoSourceRequest>;
    responseSerialize: grpc.serialize<recorder_source_pb.VideoSourceListResponse>;
    responseDeserialize: grpc.deserialize<recorder_source_pb.VideoSourceListResponse>;
}
interface IVideoSourcesService_IAddSource extends grpc.MethodDefinition<recorder_source_pb.VideoSourceRequest, recorder_source_pb.VideoSource> {
    path: "/VideoSources/AddSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_source_pb.VideoSourceRequest>;
    requestDeserialize: grpc.deserialize<recorder_source_pb.VideoSourceRequest>;
    responseSerialize: grpc.serialize<recorder_source_pb.VideoSource>;
    responseDeserialize: grpc.deserialize<recorder_source_pb.VideoSource>;
}
interface IVideoSourcesService_IUpdateSource extends grpc.MethodDefinition<recorder_source_pb.VideoSourceRequest, recorder_source_pb.VideoSource> {
    path: "/VideoSources/UpdateSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_source_pb.VideoSourceRequest>;
    requestDeserialize: grpc.deserialize<recorder_source_pb.VideoSourceRequest>;
    responseSerialize: grpc.serialize<recorder_source_pb.VideoSource>;
    responseDeserialize: grpc.deserialize<recorder_source_pb.VideoSource>;
}
interface IVideoSourcesService_IDeleteSource extends grpc.MethodDefinition<recorder_source_pb.RemoveVideoSourceRequest, recorder_source_pb.RemoveVideoSourceResponse> {
    path: "/VideoSources/DeleteSource";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_source_pb.RemoveVideoSourceRequest>;
    requestDeserialize: grpc.deserialize<recorder_source_pb.RemoveVideoSourceRequest>;
    responseSerialize: grpc.serialize<recorder_source_pb.RemoveVideoSourceResponse>;
    responseDeserialize: grpc.deserialize<recorder_source_pb.RemoveVideoSourceResponse>;
}
interface IVideoSourcesService_ISubscribeEvents extends grpc.MethodDefinition<recorder_source_pb.Empty, recorder_source_pb.Event> {
    path: "/VideoSources/SubscribeEvents";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<recorder_source_pb.Empty>;
    requestDeserialize: grpc.deserialize<recorder_source_pb.Empty>;
    responseSerialize: grpc.serialize<recorder_source_pb.Event>;
    responseDeserialize: grpc.deserialize<recorder_source_pb.Event>;
}

export const VideoSourcesService: IVideoSourcesService;

export interface IVideoSourcesServer extends grpc.UntypedServiceImplementation {
    getSources: grpc.handleUnaryCall<recorder_source_pb.FetchVideoSourceRequest, recorder_source_pb.VideoSourceListResponse>;
    addSource: grpc.handleUnaryCall<recorder_source_pb.VideoSourceRequest, recorder_source_pb.VideoSource>;
    updateSource: grpc.handleUnaryCall<recorder_source_pb.VideoSourceRequest, recorder_source_pb.VideoSource>;
    deleteSource: grpc.handleUnaryCall<recorder_source_pb.RemoveVideoSourceRequest, recorder_source_pb.RemoveVideoSourceResponse>;
    subscribeEvents: grpc.handleServerStreamingCall<recorder_source_pb.Empty, recorder_source_pb.Event>;
}

export interface IVideoSourcesClient {
    getSources(request: recorder_source_pb.FetchVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    getSources(request: recorder_source_pb.FetchVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    getSources(request: recorder_source_pb.FetchVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    addSource(request: recorder_source_pb.VideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    addSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    addSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: recorder_source_pb.VideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    updateSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    subscribeEvents(request: recorder_source_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<recorder_source_pb.Event>;
    subscribeEvents(request: recorder_source_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<recorder_source_pb.Event>;
}

export class VideoSourcesClient extends grpc.Client implements IVideoSourcesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getSources(request: recorder_source_pb.FetchVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    public getSources(request: recorder_source_pb.FetchVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    public getSources(request: recorder_source_pb.FetchVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSourceListResponse) => void): grpc.ClientUnaryCall;
    public addSource(request: recorder_source_pb.VideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public addSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public addSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: recorder_source_pb.VideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public updateSource(request: recorder_source_pb.VideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.VideoSource) => void): grpc.ClientUnaryCall;
    public deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public deleteSource(request: recorder_source_pb.RemoveVideoSourceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_source_pb.RemoveVideoSourceResponse) => void): grpc.ClientUnaryCall;
    public subscribeEvents(request: recorder_source_pb.Empty, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<recorder_source_pb.Event>;
    public subscribeEvents(request: recorder_source_pb.Empty, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<recorder_source_pb.Event>;
}
