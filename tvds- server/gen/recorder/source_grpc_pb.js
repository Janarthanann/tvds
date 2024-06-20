// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var recorder_source_pb = require('../recorder/source_pb.js');

function serialize_Empty(arg) {
  if (!(arg instanceof recorder_source_pb.Empty)) {
    throw new Error('Expected argument of type Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Empty(buffer_arg) {
  return recorder_source_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Event(arg) {
  if (!(arg instanceof recorder_source_pb.Event)) {
    throw new Error('Expected argument of type Event');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Event(buffer_arg) {
  return recorder_source_pb.Event.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_FetchVideoSourceRequest(arg) {
  if (!(arg instanceof recorder_source_pb.FetchVideoSourceRequest)) {
    throw new Error('Expected argument of type FetchVideoSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FetchVideoSourceRequest(buffer_arg) {
  return recorder_source_pb.FetchVideoSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveVideoSourceRequest(arg) {
  if (!(arg instanceof recorder_source_pb.RemoveVideoSourceRequest)) {
    throw new Error('Expected argument of type RemoveVideoSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveVideoSourceRequest(buffer_arg) {
  return recorder_source_pb.RemoveVideoSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveVideoSourceResponse(arg) {
  if (!(arg instanceof recorder_source_pb.RemoveVideoSourceResponse)) {
    throw new Error('Expected argument of type RemoveVideoSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveVideoSourceResponse(buffer_arg) {
  return recorder_source_pb.RemoveVideoSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VideoSource(arg) {
  if (!(arg instanceof recorder_source_pb.VideoSource)) {
    throw new Error('Expected argument of type VideoSource');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VideoSource(buffer_arg) {
  return recorder_source_pb.VideoSource.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VideoSourceListResponse(arg) {
  if (!(arg instanceof recorder_source_pb.VideoSourceListResponse)) {
    throw new Error('Expected argument of type VideoSourceListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VideoSourceListResponse(buffer_arg) {
  return recorder_source_pb.VideoSourceListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_VideoSourceRequest(arg) {
  if (!(arg instanceof recorder_source_pb.VideoSourceRequest)) {
    throw new Error('Expected argument of type VideoSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_VideoSourceRequest(buffer_arg) {
  return recorder_source_pb.VideoSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var VideoSourcesService = exports.VideoSourcesService = {
  getSources: {
    path: '/VideoSources/GetSources',
    requestStream: false,
    responseStream: false,
    requestType: recorder_source_pb.FetchVideoSourceRequest,
    responseType: recorder_source_pb.VideoSourceListResponse,
    requestSerialize: serialize_FetchVideoSourceRequest,
    requestDeserialize: deserialize_FetchVideoSourceRequest,
    responseSerialize: serialize_VideoSourceListResponse,
    responseDeserialize: deserialize_VideoSourceListResponse,
  },
  addSource: {
    path: '/VideoSources/AddSource',
    requestStream: false,
    responseStream: false,
    requestType: recorder_source_pb.VideoSourceRequest,
    responseType: recorder_source_pb.VideoSource,
    requestSerialize: serialize_VideoSourceRequest,
    requestDeserialize: deserialize_VideoSourceRequest,
    responseSerialize: serialize_VideoSource,
    responseDeserialize: deserialize_VideoSource,
  },
  updateSource: {
    path: '/VideoSources/UpdateSource',
    requestStream: false,
    responseStream: false,
    requestType: recorder_source_pb.VideoSourceRequest,
    responseType: recorder_source_pb.VideoSource,
    requestSerialize: serialize_VideoSourceRequest,
    requestDeserialize: deserialize_VideoSourceRequest,
    responseSerialize: serialize_VideoSource,
    responseDeserialize: deserialize_VideoSource,
  },
  deleteSource: {
    path: '/VideoSources/DeleteSource',
    requestStream: false,
    responseStream: false,
    requestType: recorder_source_pb.RemoveVideoSourceRequest,
    responseType: recorder_source_pb.RemoveVideoSourceResponse,
    requestSerialize: serialize_RemoveVideoSourceRequest,
    requestDeserialize: deserialize_RemoveVideoSourceRequest,
    responseSerialize: serialize_RemoveVideoSourceResponse,
    responseDeserialize: deserialize_RemoveVideoSourceResponse,
  },
  subscribeEvents: {
    path: '/VideoSources/SubscribeEvents',
    requestStream: false,
    responseStream: true,
    requestType: recorder_source_pb.Empty,
    responseType: recorder_source_pb.Event,
    requestSerialize: serialize_Empty,
    requestDeserialize: deserialize_Empty,
    responseSerialize: serialize_Event,
    responseDeserialize: deserialize_Event,
  },
};

exports.VideoSourcesClient = grpc.makeGenericClientConstructor(VideoSourcesService);
