import type { ChangeEvent } from 'react'

type Props = {
  text?: string
  onChangeText: (value: string) => void
  onBack: () => void
}

export default function SettingsPanel({ text, onChangeText, onBack }: Props) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => onChangeText(e.target.value)
  return (
    <div style={{ width: 300, background: '#fff', borderLeft: '1px solid #eee', padding: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={onBack} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 18 }}>←</button>
        <div style={{ fontWeight: 600 }}>Message</div>
      </div>
      <div style={{ fontSize: 12, color: '#666' }}>Text</div>
      <textarea value={text ?? ''} onChange={handleChange} rows={6} style={{ width: '100%', resize: 'vertical', padding: 8, borderRadius: 6, border: '1px solid #ddd' }} />
    </div>
  )
}
