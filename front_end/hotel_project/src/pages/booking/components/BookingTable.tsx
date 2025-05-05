import { DataTable } from "@/core/constants";
import {selectBooking} from '@/store/slices/booking/bookingSlice'
import { useAppDispatch } from "@/store/hooks/hooks";

const BookingTable: React.FC<{ data: any[] }> = ({ data }) => {
    const dispatch = useAppDispatch();
    const actionsConfig = [
        { icon: "ti ti-pencil", className: "btn-warning" , onClick: (item) => editiItem(item)},
        { icon: "ti ti-trash", className: "btn-danger" , onClick: (item) => deleteItem(item) },
    ];

    const deleteItem = (item: any) => {
        dispatch(selectBooking(item));
        console.log('Deleting item:', item); 
        $('#delete-booking').modal('show');
    };

    const editiItem = (item: any) => {
        dispatch(selectBooking(item));
        $('#editBooking').modal('show');
    };


    const headers = [
        { text: "Customer Name", value: "customerName", type: "text" },
        { text: "Customer Email", value: "customerEmail", type: "email" },
        { text: "Check-In Date", value: "checkInDate", type: "date" },
        { text: "Check-Out Date", value: "checkOutDate", type: "date" },
        { text: "Rooms", value: "rooms", type: "rooms" },  
        { text: "Total Price", value: "totalPrice", type: "number" },
        { text: "Status", value: "status", type: "text" },
        { text: "Created At", value: "createdAt", type: "date" },
    ];

    return (
        <DataTable items={data} headers={headers} pageSize={5} actionsConfig={actionsConfig} buttonType="simple" />
    );
}

export default BookingTable;


