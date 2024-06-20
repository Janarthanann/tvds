PROTOC=`which grpc_tools_node_protoc`
GEN_TS=`which protoc-gen-ts`

mkdir -p gen
${PROTOC} \
    --plugin=protoc-gen-ts=${GEN_TS} \
    --ts_out=grpc_js:./gen \
    --js_out=import_style=commonjs:./gen \
    --grpc_out=grpc_js:./gen \
    -I ./protos \
    ./protos/detector/*.proto

echo "Recorder grpc files generated"

# recorder gen files
mkdir -p gen
${PROTOC} \
    --plugin=protoc-gen-ts=${GEN_TS} \
    --ts_out=grpc_js:./gen \
    --js_out=import_style=commonjs:./gen \
    --grpc_out=grpc_js:./gen \
    -I ./protos \
    ./protos/recorder/*.proto

echo "Detector grpc files generated"
