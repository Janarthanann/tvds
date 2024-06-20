// package: 
// file: detector/configuration.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as detector_configuration_pb from "../detector/configuration_pb";

interface IDetectorConfigServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    initialize: IDetectorConfigServiceService_Iinitialize;
}

interface IDetectorConfigServiceService_Iinitialize extends grpc.MethodDefinition<detector_configuration_pb.DetectorConfigRequest, detector_configuration_pb.DetectorConfigResponse> {
    path: "/DetectorConfigService/initialize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<detector_configuration_pb.DetectorConfigRequest>;
    requestDeserialize: grpc.deserialize<detector_configuration_pb.DetectorConfigRequest>;
    responseSerialize: grpc.serialize<detector_configuration_pb.DetectorConfigResponse>;
    responseDeserialize: grpc.deserialize<detector_configuration_pb.DetectorConfigResponse>;
}

export const DetectorConfigServiceService: IDetectorConfigServiceService;

export interface IDetectorConfigServiceServer extends grpc.UntypedServiceImplementation {
    initialize: grpc.handleUnaryCall<detector_configuration_pb.DetectorConfigRequest, detector_configuration_pb.DetectorConfigResponse>;
}

export interface IDetectorConfigServiceClient {
    initialize(request: detector_configuration_pb.DetectorConfigRequest, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
    initialize(request: detector_configuration_pb.DetectorConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
    initialize(request: detector_configuration_pb.DetectorConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
}

export class DetectorConfigServiceClient extends grpc.Client implements IDetectorConfigServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public initialize(request: detector_configuration_pb.DetectorConfigRequest, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
    public initialize(request: detector_configuration_pb.DetectorConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
    public initialize(request: detector_configuration_pb.DetectorConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: detector_configuration_pb.DetectorConfigResponse) => void): grpc.ClientUnaryCall;
}
