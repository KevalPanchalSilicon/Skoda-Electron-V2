import ServerGridConfig from "../../../config/ServerGridConfig";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import useStore from "../../../store";
import { observer } from "mobx-react";
import { vsmCommon } from "../../../config/messages";
import { CurrencyFormat, DateComparator } from "../../../utils/GlobalFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";

const ActionRenderer = observer((props) => {
	const { AUTH } = useStore();
	const {
		openViewLedgerModal,
	} = props.agGridReact.props.frameworkComponents;

	return (
		<div className="action-column">
			{(AUTH.checkPrivileges("#8010#") || AUTH.checkPrivileges("#8160#") || AUTH.checkPrivileges("#8187#") || AUTH.checkPrivileges("#8195#") || AUTH.checkPrivileges("#8255#") || AUTH.checkPrivileges("#8310#") || AUTH.checkPrivileges("#8205#")) && (
				<Button
					type="text"
					title={"View"}
					className="viewIcon mr-10"
					size="large"
					style={{ padding: 7 }}
					onClick={() => {
						openViewLedgerModal(props.data);
					}}
				>
					<FontAwesomeIcon icon={faEye} />
				</Button>
			)}
		</div>
	);
});

const ListComponent = observer((props) => {
	const {
		openViewLedgerModal,
	} = props;
	const {
		OpenCancellation: { setupGrid }
	} = useStore();


	const gridOptions = {
		columnDefs: [
			{
				headerName: "Z-Form",
				field: "booking_ledger.booking_id",
				filter: "agNumberColumnFilter",
				sortable: false
			},
			{
				headerName: "CONO",
				field: "co_no",
				initialHide: true,
				sortable: false
			},
			{
				headerName: "Date",
				field: "date",
				filter: "agDateColumnFilter",
				sortable: false,
				filterParams: {
					buttons: ['reset'],
					inRangeInclusive: true,
					suppressAndOrCondition: true,
					comparator: DateComparator
				},
			},
			{
				headerName: "Customer",
				field: "booking_customer.full_name",
				sortable: false,
			},
			{
				headerName: "Variant",
				field: "booking_model.variant.name",
				initialHide: true,
				sortable: false
			},
			{
				headerName: "Location",
				field: "location.name",
				initialHide: true,
				sortable: false
			},
			{
				headerName: "Consultant",
				field: "sales_consultant.name",
				initialHide: true,
				sortable: false
			},
			{
				headerName: "On Road",
				field: "booking_ledger.on_road_price",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.on_road_price} />
				},
				sortable: false
			},
			{
				headerName: "Credits",
				field: "booking_ledger.total_credits",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.total_credits} />
				},
				sortable: false
			},
			{
				headerName: "Refund",
				field: "booking_ledger.total_refund",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.total_refund} />
				},
				sortable: false
			},
			{
				headerName: "Excess Disc.",
				field: "booking_ledger.excess_disc",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.excess_disc} />
				},
				sortable: false
			},
			{
				headerName: "Balance",
				field: "booking_ledger.balance",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.balance} />
				},
				sortable: false
			},
			{
				headerName: "Settlement",
				field: "booking_ledger.settlement",
				filter: "agNumberColumnFilter",
				cellRendererFramework: function (params) {
					return <CurrencyFormat value={params.data.booking_ledger.settlement} />
				},
				sortable: false
			},
			{
				headerName: "Actions",
				field: "actions",
				type: "actionColumn",
				filter: false,
				sortable: false,
				pinned: "right",
				minWidth: 120,
				width: 120,
			},
		],
	};
	return (
		<div className="ag-theme-alpine grid_wrapper">
			<AgGridReact
				rowHeight={ServerGridConfig.rowHeight}
				headerHeight={ServerGridConfig.headerHeight}
				modules={AllModules}
				columnDefs={gridOptions.columnDefs}
				defaultColDef={ServerGridConfig.defaultColDef}
				columnTypes={ServerGridConfig.columnTypes}
				overlayNoRowsTemplate={vsmCommon.noRecord}
				frameworkComponents={{
					ActionRenderer,
					openViewLedgerModal
				}}
				onGridReady={setupGrid}
				gridOptions={ServerGridConfig.options}
			/>
		</div>
	);
});

export default ListComponent;
