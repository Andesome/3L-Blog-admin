import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import styles from './order-table.less';


export default class CustomizableTable extends React.Component {
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    if (this.props.onSelectRow) {
      this.props.onSelectRow(selectedRows);
    }
  };

  handleTableChange = (pagination, filters, sorter) => {
    this.props.onChange(pagination, filters, sorter);
  }

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  }

  render() {
    const { data, columns, defaultPage, loading, total, rowSelection, scroll, rowKey } = this.props;
    const selectedRowKeys = rowSelection ? rowSelection.selectedRowKeys : [];
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      defaultCurrent: defaultPage ? defaultPage - 0 : 1,
      total,
    };
    console.log('table', data, columns);

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={rowKey || 'create_time'}
          rowSelection={rowSelection}
          dataSource={data}
          columns={columns}
          // pagination={paginationProps}
          // onChange={this.handleTableChange}
          scroll={scroll || { x: 1800 }}
        />
      </div>
    );
  }
}

CustomizableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};
