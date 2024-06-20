import ChallanDetails from "./sidebarRight";
import ChallanList from "./table";

export default function Challan(){
    return(
        <div className="grid col-span-2 grid-cols-[minmax(0,_1fr)_23rem]" >
            <div>
                <ChallanList />
            </div>
            <div>
                <ChallanDetails />
            </div>
        </div>
    )
}
