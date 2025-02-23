import {
  Ticket,
  Package,
  PackageOpen,
  XCircle,
  PackageCheck,
} from "lucide-react";

export const TrackOrderChart = () => {
  return (
    <div className="p-4 mt-4">
      <h1 className="text-4xl text-center font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Order Tracking Chart
      </h1>
      <p className="text-xl text-center font-medium text-gray-900 dark:text-gray-200 mb-6 flex items-center">
        After the order has been successfully
        <span className="text-gray-900 flex flex-row items-center bg-gray-300 rounded-md p-1 mx-1 ">
          PLACED <Ticket className="ml-2 h-6 w-6" />
        </span>
         keep track with this chart after order payment
      </p>
      <div className="container">
        <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
          <div className="flex md:contents">
            <div className="col-start-2 col-end-4 mr-4 md:mr-10  relative">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-purple-500 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-purple-500 shadow text-center">
                <PackageOpen className="text-white" />
              </div>
            </div>
            <div className="bg-purple-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
              <h3 className="font-semibold text-lg mb-1">Processing </h3>
              <p className="leading-tight ">
                The order is currently being prepared, packed, quality-checked
                or otherwise processed for shipment
              </p>
            </div>
          </div>

          <div className="flex md:contents">
            <div className="col-start-2 col-end-4 mr-4 md:mr-10 relative">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-green-500 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
                <Package className=" text-white" />
              </div>
            </div>
            <div className="bg-green-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
              <h3 className="font-semibold text-lg mb-1">Shipped</h3>
              <p className="leading-tight ">
                The order has been dispatched, during this time the order may
                take several days depending on the shipping method
              </p>
            </div>
          </div>

          <div className="flex md:contents">
            <div className="col-start-2 col-end-4 mr-4 md:mr-10  relative">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-blue-500 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-blue-500 shadow text-center">
                <PackageCheck className=" text-white" />
              </div>
            </div>
            <div className="bg-blue-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
              <h3 className="font-semibold text-lg mb-1">Delivered</h3>
              <p className="leading-tight">
                The order has reached the customer. This status indicates that
                the delivery process is complete
              </p>
            </div>
          </div>
          <div className="flex md:contents">
            <div className="col-start-2 col-end-4 mr-4 md:mr-10  relative">
              <div className="h-full w-6 flex items-center justify-center">
                <div className="h-full w-1 bg-red-500 pointer-events-none"></div>
              </div>
              <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
                <XCircle className=" text-white" />
              </div>
            </div>
            <div className="bg-red-500 col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full">
              <h3 className="font-semibold text-lg mb-1">Cancelled</h3>
              <p className="leading-tight ">
                The order has been cancelled. This can happen for various
                reasons, such as at the request of the customer or due to stock
                issues
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
