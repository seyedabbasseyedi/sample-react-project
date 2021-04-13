import React, { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Space, Input, Button, Badge, Table, Pagination } from "antd";
import Highlighter from "react-highlight-words";
import { useAuth } from "../../context/auth";
import Service from "../../api";
import convertDateToJalali from "../../utils/date";

const PostList = (props) => {
  // auth config
  const { setAuthToken } = useAuth();

  const logOut = () => {
    setAuthToken();
    localStorage.removeItem("TOKEN");
    window.location = "/";
  };
  // auth config end

  // search config
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  let searchInput = null;

  const getColumnSearchProps = (dataIndex, dataIndexTitle) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`جستجو در ${dataIndexTitle}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            جستجو
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            پاک کردن
          </Button>
        </Space>
      </div>
    ),
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
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
		
		// search text
		let params;
    if (selectedKeys.length > 0) {
      params = createParams(`filter[${dataIndex}]`, selectedKeys[0]);
    } else {
      params = removeParams(`filter[${dataIndex}]`);
		}

		confirm();
  };

  const handleReset = (clearFilters, confirm, dataIndex) => {
    clearFilters();
		setSearchText("");

		let params = removeParams(`filter[${dataIndex}]`);
		confirm();
  };
  // search config end

  // load post list
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const [metaInfo, setMetaInfo] = useState({
    currentPage: 0,
    pageCount: 0,
    perPage: 20,
    totalCount: 0,
  });

  useEffect(() => {
    const params = createParams();
    getPostList(params);
  }, []);

  const getParamsFromUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
    const paramsObj = {};
    for (const entry of entries) {
      paramsObj[entry[0]] = entry[1];
    }
    return paramsObj;
  };

  const createParams = (paramKey, paramValue) => {
    const { history } = props;
    let paramsObj = getParamsFromUrl();

    if (metaInfo.currentPage === 0) {
      paramsObj["page"] = "1";
    } else {
      paramsObj["page"] = paramKey === "page" ? paramValue : "1";
    }

    paramsObj[paramKey] = paramValue;

    let params = "?";
    for (const item of Object.keys(paramsObj)) {
      if (paramsObj[item]) params += `${item}=${paramsObj[item]}&`;
    }
    params = params.slice(0, -1);
    history.push({ search: params });
    return params;
  };

  const removeParams = (paramKey) => {
    const { history } = props;
    let paramsObj = getParamsFromUrl();
    let params = "?";
    for (const item of Object.keys(paramsObj)) {
      if (paramsObj[item] && item !== paramKey)
        params += `${item}=${paramsObj[item]}&`;
    }
    params = params.slice(0, -1);
    history.push({ search: params });
    return params;
  };

  const getPostList = (params) => {
    setLoading(true);
    let _params = params || "";
    Service.getPosts(_params)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.result;
          setLoading(false);
          setPostList(data.items);
          setMetaInfo(data._meta);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

	// sort & filter
  const onChangeTable = (pagination, filters, sorter, extra) => {
    let params;

    // filter
    if (filters?.status !== null && filters?.status.length > 0) {
      params = createParams("filter[status]", filters.status[0].toString());
    } else {
      params = removeParams("filter[status]");
    }

    // sort
    if (sorter?.column !== undefined) {
      let sortValue = (sorter.order === "descend" ? "-" : "") + sorter.field;
      params = createParams("sort", sortValue);
    } else {
      params = removeParams("sort");
		}
		
    getPostList(params);
  };

  const onChangePagination = (page, pageSize) => {
    let params = createParams("page", page);
    getPostList(params);
  };
  // load post list end

  const columns = [
    {
      title: "عنوان",
      dataIndex: "title",
      align: "center",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("title", "عنوان"),
    },
    {
      title: "توضیحات",
      dataIndex: "content",
      align: "center",
      sorter: true,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("content", "توضیحات"),
    },
    {
      title: "وضعیت",
      dataIndex: "status",
      align: "center",
      render: (status) => (
        <span>
          <Badge status={status ? "success" : "error"} />
        </span>
      ),
      filters: [
        {
          text: "فعال",
          value: 1,
        },
        {
          text: "غیر فعال",
          value: 0,
        },
      ],
      filterMultiple: false,
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "تاریخ ایجاد",
      dataIndex: "created_at",
      align: "center",
      className: "ltrDir",
      render: (created_at) => (created_at ? convertDateToJalali(created_at) : "-"),
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "تاریخ بروز رسانی",
      dataIndex: "updated_at",
      align: "center",
      className: "ltrDir",
      render: (updated_at) => (updated_at ? convertDateToJalali(updated_at) : "-"),
      sorter: true,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={24} style={{ textAlign: "center" }}>
          <Table
            bordered
            align="center"
            rowKey="id"
            columns={columns}
            loading={loading}
            pagination={false}
            dataSource={postList}
            onChange={onChangeTable}
          />

          {!loading && (
            <Pagination
              style={{ padding: "20px 0 50px" }}
              size="small"
              showSizeChanger={false}
              current={metaInfo.currentPage}
              pageSize={metaInfo.perPage}
              total={metaInfo.totalCount}
              onChange={onChangePagination}
            />
          )}
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          {!loading && <Button onClick={logOut}>خروج</Button>}
        </Col>
      </Row>
    </>
  );
};

export default PostList;