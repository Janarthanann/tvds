import { Button, Tooltip, theme } from "antd";
import { HiUpload } from "react-icons/hi";
import { MdPictureAsPdf, MdPrint,MdPreview } from "react-icons/md";

const {useToken}=theme;
export default function ChallanDetails(){
	const {token}=useToken();
	return(
		<>
			<div className="p-2 flex justify-between items-center">
                Challan Details
				<div className="gap-1 flex">
					<Tooltip placement="top" title={"Upload Template"}>
						<Button className="text-blue-500 border-blue-500"><HiUpload /></Button>
					</Tooltip>
					<Tooltip placement="top" title={"Show Preview"}>
						<Button className="text-blue-500 border-blue-500"><MdPreview /></Button>
					</Tooltip>
					<Tooltip placement="top" title={"Download PDF"}>
						<Button className="text-blue-500 border-blue-500"><MdPictureAsPdf/></Button>
					</Tooltip>
					<Tooltip placement="top" title={"Print"}>
						<Button className="text-blue-500 border-blue-500"><MdPrint/></Button>
					</Tooltip>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4 px-4 pt-2" style={{borderStyle: token.lineType, borderTopWidth: token.lineWidth, borderBottomWidth: token.lineWidth, borderColor: token.colorBorder}}>
				<div className="grid gap-2">
					<span>Challan Number</span>
					<span>Vehicle Number</span>
					<span>Vehicle Type</span>
					<span>Fine Amount</span>
					<span>Time</span>
					<span>Paid Date</span>
				</div>
				<div className="grid gap-2">
					<span>1</span>
					<span className="flex gap-1 items-center">TN02BT7246</span>
					<span>Bike</span>
					<span>100</span>
					<span>05-04-2021T11:20:45.902Z</span>
					<span>-</span>
				</div>
			</div>
		</>
	);
}
