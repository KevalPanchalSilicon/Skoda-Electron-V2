import LocalGridConfig from "../../../../config/LocalGridConfig";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import useStore from "../../../../store";
import { observer } from "mobx-react";
import { Button, } from "antd";
import { vsmCommon } from "../../../../config/messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { DateComparator } from "../../../../utils/GlobalFunction";

const ActionRenderer = observer((props) => {
	const { AUTH } = useStore();
	const { openViewModal, openReopenModal } = props.agGridReact.props.frameworkComponents;

	return (
		<div className="action-column">
			{AUTH.checkPrivileges("#3455#") && (
				<Button
					type="text"
					className="viewIcon mr-15"
					size="large"
					title="View"
					style={{ padding: 7 }}
					onClick={() => {
						openViewModal(props.data);
					}}
				>
					<FontAwesomeIcon icon={faEye} />
				</Button>
			)}
			{(AUTH.checkPrivileges("#3410") || AUTH.checkPrivileges("#3460#")) && (
				<Button
					type="text"
					className="reopenIcon"
					size="large"
					style={{ padding: 7 }}
					title="Reopen"
					onClick={() => {
						openReopenModal(props.data);
					}}
				>
					<FontAwesomeIcon icon={faRedoAlt} />
				</Button>
			)}
		</div>
	);
});

const ListComponent = observer((props) => {
	const { openViewModal, openReopenModal } = props;
	const {
		ClosedInquiriesStore: { list_data, setupGrid, onFilterChanged },
	} = useStore();

	const gridOptions = {
		columnDefs: [
			{
				headerName: "# ID",
				field: "id",
				filter: "agNumberColumnFilter",
				pinned: "left",
				minWidth: 120,
				width: 120,
			},
			{
				headerName: "Code",
				field: "code",
			},
			{
				headerName: "Inquiry Id",
				field: "mfg_code",
			},
			{
				headerName: "Opened On",
				field: "date_changed",
				filter: 'agDateColumnFilter',
				filterParams: {
					buttons: ['reset'],
					inRangeInclusive: true,
					suppressAndOrCondition: true,
					comparator: DateComparator
				}
			},
			{
				headerName: "Closed On",
				field: "closure_changed",
				filter: 'agDateColumnFilter',
				filterParams: {
					buttons: ['reset'],
					inRangeInclusive: true,
					suppressAndOrCondition: true,
					comparator: DateComparator
				}
			},
			{
				headerName: "Closure Type",
				field: "closure_type.name",
			},
			{
				headerName: "Customer",
				field: "full_name",

			},
			{
				headerName: "Phone",
				field: "phone",
			},
			{
				headerName: "Model",
				field: "model.name",
				filter: 'agSetColumnFilter',
			},
			{
				headerName: "Variant",
				field: "variant.name",
				filter: 'agSetColumnFilter',
			},
			{
				headerName: "Consultant",
				field: "sales_consultant.name",
				filter: 'agSetColumnFilter',
			},
			{
				headerName: "Reporting To",
				field: "sales_consultant",
				valueGetter: (params) =>
					params.data && params.data.sc_id === null ? "N/A" : params.data.sales_consultant.reporting_to.name,
			},
			{
				headerName: "Location",
				field: "location.name",
				filter: 'agSetColumnFilter',
			},
			{
				headerName: "Days Opened",
				field: "days_opened",
				filter: "agNumberColumnFilter",
			},
			{
				headerName: "Actions",
				field: "actions",
				type: "actionColumn",
				filter: false,
				sortable: false,
				pinned: "right",
				minWidth: 180,
				width: 180,
			},
		],
	};
	return (
		<div className="ag-theme-alpine grid_wrapper">
			<AgGridReact
				rowHeight={LocalGridConfig.rowHeight}
				headerHeight={LocalGridConfig.headerHeight}
				rowData={list_data}
				modules={AllModules}
				columnDefs={gridOptions.columnDefs}
				defaultColDef={LocalGridConfig.defaultColDef}
				columnTypes={LocalGridConfig.columnTypes}
				overlayNoRowsTemplate={vsmCommon.noRecord}
				frameworkComponents={{ ActionRenderer, openViewModal, openReopenModal }}
				onGridReady={setupGrid}
				gridOptions={LocalGridConfig.options}
				onFilterChanged={onFilterChanged}
				onSortChanged={onFilterChanged}
			/>
		</div>
	);
});

export default ListComponent;
