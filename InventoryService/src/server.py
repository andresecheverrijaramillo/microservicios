from concurrent import futures

import grpc
import Service_pb2
import Service_pb2_grpc

HOST = '[::]:8081'

class InventoryService(Service_pb2_grpc.InventoryServiceServicer):
    
    def GetInventory(self, request, context):
        print("Request is received: " + str(request))
        return Service_pb2.Inventory(Inventory=[1,2,3])

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    Service_pb2_grpc.add_InventoryServiceServicer_to_server(InventoryService(), server)
    server.add_insecure_port(HOST)
    print("Service is running... ")
    server.start()
    server.wait_for_termination()

if __name__ == "__main__":
    serve()