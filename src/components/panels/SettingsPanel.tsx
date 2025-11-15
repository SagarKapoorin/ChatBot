import type { ChangeEvent } from 'react'
import type {
  AppRFNode,
  ButtonNodeData,
  ConditionalNodeData,
  ImageNodeData,
  TextNodeData,
} from '../../types/flow.types'

type Props = {
  node?: AppRFNode
  onChange: (updater: (node: AppRFNode) => AppRFNode) => void
  onBack: () => void
}

export default function SettingsPanel({ node, onChange, onBack }: Props) {
  const type = node?.type
  return (
    <div
      style={{
        width: 300,
        background: '#fff',
        borderLeft: '1px solid #eee',
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={onBack}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}
        >
          ←
        </button>
        <div style={{ fontWeight: 600 }}>{labelFor(type)}</div>
      </div>
      {/*added per node type settings rendered conditionally */}
      {type === 'text' && node && (
        <TextSettings
          data={node.data}
          onChange={(d) => onChange((n) => (n.type === 'text' ? { ...n, data: d } : n))}
        />
      )}
      {type === 'image' && node && (
        <ImageSettings
          data={node.data}
          onChange={(d) => onChange((n) => (n.type === 'image' ? { ...n, data: d } : n))}
        />
      )}
      {type === 'button' && node && (
        <ButtonSettings
          data={node.data}
          onChange={(d) => onChange((n) => (n.type === 'button' ? { ...n, data: d } : n))}
        />
      )}
      {type === 'conditional' && node && (
        <ConditionalSettings
          data={node.data}
          onChange={(d) => onChange((n) => (n.type === 'conditional' ? { ...n, data: d } : n))}
        />
      )}
    </div>
  )
}

function labelFor(type: AppRFNode['type'] | undefined) {
  switch (type) {
    case 'text':
      return 'Message'
    case 'image':
      return 'Image'
    case 'button':
      return 'Quick Reply'
    case 'conditional':
      return 'Condition'
    default:
      return 'Settings'
  }
}

function TextSettings({
  data,
  onChange,
}: {
  data?: TextNodeData
  onChange: (d: TextNodeData) => void
}) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => onChange({ text: e.target.value })
  return (
    <>
      <div style={{ fontSize: 12, color: '#666' }}>Text</div>
      <textarea
        value={data?.text ?? ''}
        onChange={handleChange}
        rows={6}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: 8,
          borderRadius: 6,
          border: '1px solid #ddd',
        }}
      />
    </>
  )
}

function ImageSettings({
  data,
  onChange,
}: {
  data?: ImageNodeData
  onChange: (d: ImageNodeData) => void
}) {
  const onUrl = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ imageUrl: e.target.value, caption: data?.caption })
  const onCaption = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ imageUrl: data?.imageUrl || '', caption: e.target.value })
  return (
    <>
      <div style={{ fontSize: 12, color: '#666' }}>Image URL</div>
      <input
        value={data?.imageUrl ?? ''}
        onChange={onUrl}
        placeholder="https://..."
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <div style={{ fontSize: 12, color: '#666' }}>Caption</div>
      <input
        value={data?.caption ?? ''}
        onChange={onCaption}
        placeholder="Optional"
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
    </>
  )
}

function ButtonSettings({
  data,
  onChange,
}: {
  data?: ButtonNodeData
  onChange: (d: ButtonNodeData) => void
}) {
  const buttons = data?.buttons ?? []
  const setText = (e: ChangeEvent<HTMLInputElement>) => onChange({ text: e.target.value, buttons })
  const setBtn = (idx: number, key: 'label' | 'value') => (e: ChangeEvent<HTMLInputElement>) => {
    const next = buttons.map((b, i) => (i === idx ? { ...b, [key]: e.target.value } : b))
    onChange({ text: data?.text || '', buttons: next })
  }
  const addBtn = () =>
    onChange({
      text: data?.text || '',
      buttons: [...buttons, { label: 'Option', value: `opt_${buttons.length + 1}` }],
    })
  const removeBtn = (idx: number) =>
    onChange({ text: data?.text || '', buttons: buttons.filter((_, i) => i !== idx) })
  return (
    <>
      <div style={{ fontSize: 12, color: '#666' }}>Prompt</div>
      <input
        value={data?.text ?? ''}
        onChange={setText}
        placeholder="Ask a question"
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <div style={{ fontWeight: 600 }}>Buttons</div>
      {buttons.map((b, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <input
            value={b.label}
            onChange={setBtn(i, 'label')}
            placeholder="Label"
            style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}
          />
          <input
            value={b.value}
            onChange={setBtn(i, 'value')}
            placeholder="Value"
            style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #ddd' }}
          />
          <button onClick={() => removeBtn(i)} style={{ padding: '6px 8px' }}>
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addBtn}
        style={{
          alignSelf: 'flex-start',
          padding: '6px 10px',
          borderRadius: 6,
          border: '1px solid #ddd',
          background: '#f7f7f7',
        }}
      >
        + Add Button
      </button>
    </>
  )
}

function ConditionalSettings({
  data,
  onChange,
}: {
  data?: ConditionalNodeData
  onChange: (d: ConditionalNodeData) => void
}) {
  const onVar = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ variable: e.target.value, condition: data?.condition || '' })
  const onCond = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ variable: data?.variable || '', condition: e.target.value })
  return (
    <>
      <div style={{ fontSize: 12, color: '#666' }}>Variable</div>
      <input
        value={data?.variable ?? ''}
        onChange={onVar}
        placeholder="e.g. answer"
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <div style={{ fontSize: 12, color: '#666' }}>Condition</div>
      <input
        value={data?.condition ?? ''}
        onChange={onCond}
        placeholder={'e.g. == "yes"'}
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <div style={{ fontSize: 12, color: '#666' }}>Outputs: true, false</div>
    </>
  )
}
