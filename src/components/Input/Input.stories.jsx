import React, { useState } from 'react';
import Input from './Input';

// 配置元数据
export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
  },
};

// 定义模板
const Template = (args) => {
  const [value, setValue] = useState(args.value || '');
  
  const handleChange = (e) => {
    setValue(e.target.value);
    if (args.onChange) {
      args.onChange(e);
    }
  };
  
  return <Input {...args} value={value} onChange={handleChange} />;
};

// 创建基础输入框故事
export const Default = Template.bind({});
Default.args = {
  label: 'Input Label',
  placeholder: 'Enter text here...',
  value: '',
};

// 创建带标签的输入框故事
export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'Full Name',
  placeholder: 'John Doe',
  required: true,
};

// 创建密码输入框故事
export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  required: true,
};

// 创建邮箱输入框故事
export const Email = Template.bind({});
Email.args = {
  type: 'email',
  label: 'Email Address',
  placeholder: 'user@example.com',
};

// 创建数字输入框故事
export const Number = Template.bind({});
Number.args = {
  type: 'number',
  label: 'Quantity',
  placeholder: '0',
  inputProps: {
    min: 0,
    max: 100,
    step: 1,
  },
};

// 创建小尺寸输入框故事
export const Small = Template.bind({});
Small.args = {
  label: 'Small Input',
  placeholder: 'Small size',
  size: 'small',
};

// 创建大尺寸输入框故事
export const Large = Template.bind({});
Large.args = {
  label: 'Large Input',
  placeholder: 'Large size',
  size: 'large',
};

// 创建禁用状态输入框故事
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'This is disabled',
  value: 'Cannot edit this',
  disabled: true,
};

// 创建只读状态输入框故事
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Read Only Input',
  value: 'This is read only',
  readOnly: true,
};

// 创建错误状态输入框故事
export const WithError = Template.bind({});
WithError.args = {
  label: 'Input with Error',
  placeholder: 'Try submitting with this',
  error: 'This field is required',
  value: '',
};

// 创建带初始值的输入框故事
export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  label: 'Input with Initial Value',
  value: 'Initial value',
};

// 创建输入框组合展示
export const AllVariants = () => {
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  
  return (
    <div style={{ width: '100%', maxWidth: '400px', gap: '20px', display: 'flex', flexDirection: 'column' }}>
      <h3>All Input Variants</h3>
      
      <Input
        label="Text Input"
        placeholder="Regular text input"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      
      <Input
        type="email"
        label="Email Input"
        placeholder="email@example.com"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      
      <Input
        type="password"
        label="Password Input"
        placeholder="••••••••"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      
      <Input
        label="Small Input"
        size="small"
        placeholder="Small size"
      />
      
      <Input
        label="Large Input"
        size="large"
        placeholder="Large size"
      />
      
      <Input
        label="Disabled Input"
        placeholder="Cannot edit"
        disabled
        value="Disabled"
      />
      
      <Input
        label="Read Only Input"
        value="Read only content"
        readOnly
      />
      
      <Input
        label="Input with Error"
        placeholder="Try submitting"
        error="This field is required"
      />
    </div>
  );
};

AllVariants.parameters = {
  controls: {
    disable: true,
  },
};