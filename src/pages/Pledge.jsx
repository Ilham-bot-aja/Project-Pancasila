import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { defaultPledges } from '../data/pledgeData'
import { supabase } from '../supabaseClient'

export default function Pledge() {
  const [nama, setNama] = useState('')
  const [ikrar, setIkrar] = useState('')
  const [pledges, setPledges] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Fetch pledges dari Supabase saat halaman dibuka
  useEffect(() => {
    fetchPledges()

    // Realtime: otomatis update kalau ada pledge baru dari user lain
    const channel = supabase
      .channel('pledges-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pledges' }, (payload) => {
        const newPledge = payload.new
        setPledges((prev) => [formatPledge(newPledge), ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  function formatPledge(p) {
    return {
      id: p.id,
      nama: p.nama,
      ikrar: p.ikrar,
      waktu: formatWaktu(p.created_at),
    }
  }

  function formatWaktu(isoString) {
    if (!isoString) return 'Baru saja'
    const date = new Date(isoString)
    const now = new Date()
    const diffMs = now - date
    const diffMin = Math.floor(diffMs / 60000)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffMin < 1) return 'Baru saja'
    if (diffMin < 60) return `${diffMin} menit lalu`
    if (diffHour < 24) return `${diffHour} jam lalu`
    return `${diffDay} hari lalu`
  }

  async function fetchPledges() {
    setLoading(true)
    const { data, error } = await supabase
      .from('pledges')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching pledges:', error)
    } else {
      setPledges(data.map(formatPledge))
    }
    setLoading(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nama.trim() || !ikrar.trim()) return

    setSubmitting(true)

    const { error } = await supabase
      .from('pledges')
      .insert([{ nama: nama.trim(), ikrar: ikrar.trim() }])

    if (error) {
      console.error('Error inserting pledge:', error)
      alert('Gagal menyimpan ikrar, coba lagi ya!')
    } else {
      setNama('')
      setIkrar('')
    }

    setSubmitting(false)
  }

  const allPledges = [...pledges, ...defaultPledges]

  return (
    <section className="px-5 py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-2">
          Ikrar Anti Bullying 💜
        </h1>
        <p className="text-sm text-ink/65">
          Tuliskan namamu dan janjimu. Satu ikrar kecil bisa mengubah banyak hal.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white rounded-bubble border border-purple-100 p-6 mb-4"
      >
        <label className="block text-sm font-semibold text-ink mb-1.5">Nama</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu"
          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:border-purple-400 text-sm mb-4"
          required
        />

        <label className="block text-sm font-semibold text-ink mb-1.5">Ikrarku</label>
        <textarea
          value={ikrar}
          onChange={(e) => setIkrar(e.target.value.slice(0, 150))}
          maxLength={150}
          rows={3}
          placeholder="Tuliskan janjimu untuk lebih berempati..."
          className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:border-purple-400 text-sm resize-none"
          required
        />
        <p className="text-xs text-ink/40 text-right mt-1 mb-4">{ikrar.length}/150</p>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Menyimpan...' : 'Posting Ikrarku'}
        </button>
      </form>

      <p className="text-center text-sm text-purple-500 font-semibold mb-10">
        {allPledges.length} orang telah berikrar bersama EmpatiKu
      </p>

      {loading ? (
        <p className="text-center text-sm text-ink/50">Memuat ikrar...</p>
      ) : (
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPledges.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-bubble border border-purple-100 p-5"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold text-ink text-sm">{p.nama}</p>
                <Heart size={16} className="text-rose shrink-0 mt-0.5" fill="currentColor" />
              </div>
              <p className="text-sm text-ink/70 leading-relaxed mb-2">{p.ikrar}</p>
              <p className="text-xs text-ink/40">{p.waktu}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
