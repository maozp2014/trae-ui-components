import React from 'react';
import Table from './Table';

// 定义表格组件的元数据
export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onRowClick: { action: 'rowClicked' },
    theme: {
      control: 'object',
      description: '表格主题配置',
    },
  },
};

// 默认模板
const Template = (args) => <Table {...args} />;

// 示例数据 - 版本管理表格数据
const versionData = [
  {
    id: '48369',
    version: '4.8.3.9',
    fileType: 'App bundle',
    uploadDate: '2025年8月20日 09:26',
    downloads: '9905',
    status: '有效',
  },
  {
    id: '48269',
    version: '4.8.2.9',
    fileType: 'App bundle',
    uploadDate: '2025年8月18日 09:33',
    downloads: '5100',
    status: '无效',
  },
  {
    id: '48200',
    version: '4.8.2.0',
    fileType: 'App bundle',
    uploadDate: '2025年8月10日 10:38',
    downloads: '3898',
    status: '有效',
  },
  {
    id: '48100',
    version: '4.8.1.0',
    fileType: 'App bundle',
    uploadDate: '2025年8月4日 00:32',
    downloads: '862',
    status: '无效',
  },
  {
    id: '48010',
    version: '4.8.0.1',
    fileType: 'App bundle',
    uploadDate: '2025年7月29日 10:29',
    downloads: '527',
    status: '无效',
  },
];

// 表格列配置
const columns = [
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '文件类型',
    dataIndex: 'fileType',
    key: 'fileType',
  },
  {
    title: '已上传',
    dataIndex: 'uploadDate',
    key: 'uploadDate',
  },
  {
    title: '安装人数',
    dataIndex: 'downloads',
    key: 'downloads',
  },
  {
    title: '版本状态',
    dataIndex: 'status',
    key: 'status',
  },
];

// 基础表格故事
export const BasicTable = Template.bind({});
BasicTable.args = {
  data: versionData,
  columns: columns,
};

// 空数据表格故事
export const EmptyTable = Template.bind({});
EmptyTable.args = {
  data: [],
  columns: columns,
};

// 自定义主题表格故事
export const CustomThemeTable = Template.bind({});
CustomThemeTable.args = {
  data: versionData,
  columns: columns,
  theme: {
    primaryColor: '#28a745',
    backgroundColor: '#f8f9fa',
    hoverBackgroundColor: '#e9ecef',
    headerBackgroundColor: '#e9ecef',
  },
};

// 带有点击事件的表格故事
export const TableWithClickHandler = Template.bind({});
TableWithClickHandler.args = {
  data: versionData,
  columns: columns,
  onRowClick: (row) => {
    console.log('Row clicked:', row);
  },
};

// 自定义单元格渲染表格故事
export const TableWithCustomRender = Template.bind({});
TableWithCustomRender.args = {
  data: versionData,
  columns: [
    {
      title: '版本号',
      dataIndex: 'version',
      key: 'version',
      render: (value) => <strong>{value}</strong>,
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: '已上传',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
    },
    {
      title: '安装人数',
      dataIndex: 'downloads',
      key: 'downloads',
      render: (value) => `${value} 次`,
    },
    {
      title: '版本状态',
      dataIndex: 'status',
      key: 'status',
    },
  ],
};