import React, { useState } from 'react';
import './App.css';
import { Button, Card, Input } from './components';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
