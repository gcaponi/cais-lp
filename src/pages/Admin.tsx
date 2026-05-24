import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { useNavigate } from 'react-router'
import { Mail, Phone, User, Calendar, ArrowLeft, RefreshCw } from 'lucide-react'

export default function Admin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)

  const { data: contacts, isLoading, refetch } = trpc.contact.list.useQuery(undefined, {
    enabled: authenticated,
    refetchInterval: 5000,
  })

  const handleLogin = () => {
    if (password === 'cais2025') setAuthenticated(true)
    else alert('Password errata')
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: 'var(--color-void-base)' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>CAIS Admin</h1>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Inserisci la password per accedere</p>
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
          <button onClick={handleLogin} className="btn-ember w-full">ACCEDI</button>
          <button onClick={() => navigate('/')} className="mt-4 text-sm w-full text-center hover:underline" style={{ color: 'var(--text-muted)' }}>
            <ArrowLeft size={14} className="inline mr-1" /> Torna al sito
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: 'var(--color-void-base)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>Contatti Ricevuti</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {contacts?.length || 0} messaggi totali
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => refetch()} className="btn-frosted flex items-center gap-2">
              <RefreshCw size={14} /> Aggiorna
            </button>
            <button onClick={() => navigate('/')} className="btn-ember text-sm">
              Torna al sito
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20" style={{ color: 'var(--text-muted)' }}>Caricamento...</div>
        ) : !contacts || contacts.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
            <p style={{ color: 'var(--text-muted)' }}>Nessun contatto ricevuto ancora.</p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>I contatti inviati dal form appariranno qui automaticamente.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.slice().reverse().map((contact) => (
              <div
                key={contact.id}
                className="rounded-2xl border p-6 transition-all hover:border-[var(--accent-cyan)]/40"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-cyan)]/10 flex items-center justify-center">
                      <User size={18} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{contact.name}</h3>
                      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="flex items-center gap-1"><Mail size={12} /> {contact.email}</span>
                        {contact.phone && <span className="flex items-center gap-1"><Phone size={12} /> {contact.phone}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <Calendar size={14} />
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleString('it-IT') : 'N/A'}
                  </div>
                </div>
                <div className="pl-13 ml-[52px]">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{contact.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
