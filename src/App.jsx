import React, { useState } from 'react';
import './App.css';
import { Button, Card, Input, Table } from './components';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 表格示例数据 - 版本管理表格数据
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

  const handleRowClick = (row) => {
    console.log('选择的版本:', row);
    alert(`选择了版本: ${row.version}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // 模拟表单提交
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Trae UI Components</h1>
        <p>一个现代化的React UI组件库</p>
      </header>

      <main className="app-main">
        <section className="components-section">
          <h2>基础组件展示</h2>
          
          <div className="cards-grid">
            <Card title="Button 组件" description="多种样式和状态的按钮组件">
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button size="small">Small</Button>
                <Button size="large">Large</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </Card>

            <Card title="Input 组件" description="表单输入组件，支持多种类型和验证">
              <div style={{ gap: '16px', display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                <Input
                  label="用户名"
                  placeholder="请输入用户名"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  label="邮箱"
                  placeholder="请输入邮箱地址"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </Card>

            <Card title="Card 组件" description="可定制的卡片容器组件" elevated rounded>
              <p>这是一个带有增强样式的卡片组件示例。</p>
              <p>卡片组件可以包含标题、描述、内容和页脚。</p>
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <Button variant="secondary">了解更多</Button>
                <Button>立即使用</Button>
              </div>
            </Card>
          </div>
          
          <div style={{ marginTop: '32px' }}>
            <h3>Table 组件</h3>
            <p>版本管理表格示例，支持排序、筛选和行操作</p>
            <div style={{ marginTop: '16px' }}>
              <Table
                data={versionData}
                columns={columns}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2>表单示例</h2>
          <Card padded elevated>
            <form onSubmit={handleSubmit} style={{ gap: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3>用户信息表单</h3>
              
              <div style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
                <Input
                  label="姓名"
                  placeholder="请输入您的姓名"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                
                <Input
                  type="email"
                  label="邮箱"
                  placeholder="请输入您的邮箱"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                
                <Input
                  type="password"
                  label="密码"
                  placeholder="请设置密码"
                  required
                />
              </div>
              
              <div style={{ marginTop: '8px' }}>
                <Button type="submit" size="large" disabled={isSubmitted}>
                  {isSubmitted ? '提交中...' : '提交表单'}
                </Button>
              </div>
            </form>
          </Card>
        </section>
      </main>

      <footer className="app-footer">
        <p>Trae UI Components - 为现代Web应用提供优雅的UI解决方案</p>
      </footer>
    </div>
  );
}

export default App
