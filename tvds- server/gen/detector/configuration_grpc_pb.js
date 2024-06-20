// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var detector_configuration_pb = require('../detector/configuration_pb.js');

function serialize_DetectorConfigRequest(arg) {
  if (!(arg instanceof detector_configuration_pb.DetectorConfigRequest)) {
    throw new Error('Expected argument of type DetectorConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DetectorConfigRequest(buffer_arg) {
  return detector_configuration_pb.DetectorConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DetectorConfigResponse(arg) {
  if (!(arg instanceof detector_configuration_pb.DetectorConfigResponse)) {
    throw new Error('Expected argument of type DetectorConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DetectorConfigResponse(buffer_arg) {
  return detector_configuration_pb.DetectorConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DetectorConfigServiceService = exports.DetectorConfigServiceService = {
  initialize: {
    path: '/DetectorConfigService/initialize',
    requestStream: false,
    responseStream: false,
    requestType: detector_configuration_pb.DetectorConfigRequest,
    responseType: detector_configuration_pb.DetectorConfigResponse,
    requestSerialize: serialize_DetectorConfigRequest,
    requestDeserialize: deserialize_DetectorConfigRequest,
    responseSerialize: serialize_DetectorConfigResponse,
    responseDeserialize: deserialize_DetectorConfigResponse,
  },
};

exports.DetectorConfigServiceClient = grpc.makeGenericClientConstructor(DetectorConfigServiceService);
