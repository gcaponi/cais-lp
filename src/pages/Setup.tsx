import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { trpc } from '@/providers/trpc'
import { Mail, Server, Lock, ArrowLeft, CheckCircle, AlertCircle, Save } from 'lucide-react'

export default function Setup() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const { data: status } = trpc.config.status.useQuery(undefined, {
    enabled: authenticated,
    refetchInterval: 5000,
  })

  const [form, setForm] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    user: '',
    pass: '',
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const setSmtp = trpc.config.setSmtp.useMutation({
    onSuccess: () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  useEffect(() => {
    if (status?.smtpUser) {
      setForm(f => ({ ...f, user: status.smtpUser, host: status.smtpHost || 'smtp.gmail.com', port: status.smtpPort || '587' }))
    }
  }, [status])

  const handleLogin = () => {
    if (password === 'cais2025') setAuthenticated(true)
    else alert('Password errata')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.user || !form.pass) {
      setError('Inserisci email e password')
      return
    }
    setSmtp.mutate(form)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>CAIS Setup</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Configurazione Email SMTP</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg text-sm mb-4"
            style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--text-inverse)' }}
          >
            ACCEDI
          </button>
          <button onClick={() => navigate('/')} className="mt-4 text-sm w-full text-center hover:underline" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={14} className="inline mr-1" /> Torna al sito
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-lg mx-auto">
        <button onClick={() => navigate('/')} className="text-sm mb-8 flex items-center gap-1 hover:underline" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={14} /> Torna al sito
        </button>

        <h1 className="font-['Space_Grotesk'] font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
          Configurazione Email
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          Inserisci le credenziali SMTP per ricevere le notifiche dei contatti.
        </p>

        {/* Status */}
        <div className="mb-6 p-4 rounded-xl border flex items-center gap-3" style={{ backgroundColor: 'var(--card-bg)', borderColor: status?.envConfigured || status?.runtimeConfigured ? 'rgba(16,185,129,0.3)' : 'rgba(253,137,37,0.3)' }}>
          {status?.envConfigured || status?.runtimeConfigured ? (
            <>
              <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-400">Email configurata</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Le notifiche verranno inviate a caponi.ai.studio@gmail.com</p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle size={20} className="text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-400">Email non configurata</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Inserisci le credenziali qui sotto per attivare le notifiche</p>
              </div>
            </>
          )}
        </div>

        {/* Gmail instructions */}
        <div className="mb-6 p-4 rounded-xl border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Come ottenere l'App Password (Gmail)</h3>
          <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: 'var(--text-secondary)' }}>
            <li>Vai su <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-cyan)' }}>Google Account &gt; Sicurezza</a></li>
            <li>Attiva "Verifica in 2 passaggi"</li>
            <li>Cerca "Password per le app"</li>
            <li>Genera una nuova password (16 caratteri)</li>
            <li>Incollala nel campo "App Password" qui sotto</li>
          </ol>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>SMTP Host</label>
              <div className="flex items-center gap-2">
                <Server size={14} style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={form.host}
                  onChange={(e) => setForm(f => ({ ...f, host: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Porta</label>
              <input
                type="text"
                value={form.port}
                onChange={(e) => setForm(f => ({ ...f, port: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Email (SMTP User)</label>
            <div className="flex items-center gap-2">
              <Mail size={14} style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={form.user}
                onChange={(e) => setForm(f => ({ ...f, user: e.target.value }))}
                placeholder="caponi.ai.studio@gmail.com"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>App Password</label>
            <div className="flex items-center gap-2">
              <Lock size={14} style={{ color: 'var(--text-muted)' }} />
              <input
                type="password"
                value={form.pass}
                onChange={(e) => setForm(f => ({ ...f, pass: e.target.value }))}
                placeholder="xxxx xxxx xxxx xxxx"
                className="w-full px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs">{error}</p>
          )}

          {saved && (
            <p className="text-green-400 text-xs flex items-center gap-1">
              <CheckCircle size={12} /> Configurazione salvata con successo!
            </p>
          )}

          <button
            type="submit"
            disabled={setSmtp.isPending}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{ backgroundColor: 'var(--accent-cyan)', color: 'var(--text-inverse)' }}
          >
            {setSmtp.isPending ? 'Salvataggio...' : <><Save size={16} /> Salva Configurazione</>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Nota:</strong> Le credenziali vengono salvate in memoria sul server. Dopo un riavvio del server, dovrai reinserirle. Per una configurazione permanente, aggiungi le variabili SMTP nel pannello di controllo della tua piattaforma di hosting.
          </p>
        </div>
      </div>
    </div>
  )
}
