import React from "react";
import { Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";


class getColumnSearchProps extends React.Component {
	constructor(props) {
		super(props);
	
		state = {
		  searchText: "",
		  searchedColumn: "",
		};

		const dataIndex = props.dataIndex;
	}

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
		  searchText: selectedKeys[0],
		  searchedColumn: dataIndex,
		});
	  };
	
	  handleReset = (clearFilters) => {
		clearFilters();
		this.setState({ searchText: "" });
	  };

	filterDropdown: ({
		setSelectedKeys,
		selectedKeys,
		confirm,
		clearFilters,
	  }) => (
		<div style={{ padding: 8 }}>
		  <Input
			ref={(node) => {
			  this.searchInput = node;
			}}
			placeholder={`Search ${dataIndex}`}
			value={selectedKeys[0]}
			onChange={(e) =>
			  setSelectedKeys(e.target.value ? [e.target.value] : [])
			}
			onPressEnter={() =>
			  this.handleSearch(selectedKeys, confirm, dataIndex)
			}
			style={{ width: 188, marginBottom: 8, display: "block" }}
		  />
		  <Space>
			<Button
			  type="primary"
			  onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
			  icon={<SearchOutlined />}
			  size="small"
			  style={{ width: 90 }}
			>
			  جستجو
			</Button>
			<Button
			  onClick={() => this.handleReset(clearFilters)}
			  size="small"
			  style={{ width: 90 }}
			>
			  پاک کردن
			</Button>
			<Button
			  type="link"
			  size="small"
			  onClick={() => {
				confirm({ closeDropdown: false });
				this.setState({
				  searchText: selectedKeys[0],
				  searchedColumn: dataIndex,
				});
			  }}
			>
			  فیلتر
			</Button>
		  </Space>
		</div>
	  );
	  filterIcon: (filtered) => (
		<SearchOutlined style={{ color: filtered ? "#921349" : undefined }} />
	  ),
	  onFilter: (value, record) =>
		record[dataIndex]
		  ? record[dataIndex]
			  .toString()
			  .toLowerCase()
			  .includes(value.toLowerCase())
		  : "",
	  onFilterDropdownVisibleChange: (visible) => {
		if (visible) {
		  setTimeout(() => this.searchInput.select(), 100);
		}
	  },
	  render: (text) =>
		this.state.searchedColumn === dataIndex ? (
		  <Highlighter
			highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
			searchWords={[this.state.searchText]}
			autoEscape
			textToHighlight={text ? text.toString() : ""}
		  />
		) : (
		  text
	  ),
}

export default SearchTableColumn;
