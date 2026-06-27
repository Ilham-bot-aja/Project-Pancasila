import { useState, useRef } from 'react'
import { stories } from '../data/storiesData'
import { X, Share2 } from 'lucide-react'
import html2canvas from 'html2canvas'

const STORAGE_KEY = 'empatiku_reflections'

export default function Cerita() {
  const [selected, setSelected] = useState(null)
  const [draft, setDraft] = useState('')
  const [reflections, setReflections] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  )
  const [sharing, setSharing] = useState(false)
  const cardRef = useRef(null)

  function openStory(story) {
    setSelected(story)
    setDraft(reflections[story.id] || '')
  }

  function closeModal() {
    setSelected(null)
    setSharing(false)
  }

  function handleSaveReflection() {
    if (!draft.trim()) return
    const updated = { ...reflections, [selected.id]: draft.trim() }
    setReflections(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  async function handleShare() {
    if (!cardRef.current) return
    setSharing(true)
    try {
      const canvas = await html2canvas(cardRef.current, { scale: 3 })
      canvas.toBlob(async (blob) => {
        setSharing(false)
        if (!blob) return
        const file = new File([blob], `empatiku-refleksi-${selected.id}.png`, { type: 'image/png' })

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Refleksi EmpatiKu',
              text: 'Aku ikut berefleksi bersama EmpatiKu 💜',
            })
          } catch {
            // pengguna membatalkan share, tidak perlu ditangani
          }
        } else {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'empatiku-refleksi.png'
          a.click()
          URL.revokeObjectURL(url)
          alert('Kartu refleksi berhasil diunduh! Yuk upload manual ke Instagram Story kamu 💜')
        }
      }, 'image/png')
    } catch {
      setSharing(false)
      alert('Gagal membuat kartu refleksi. Coba lagi ya.')
    }
  }

  const hasSaved = selected && Boolean(reflections[selected.id])

  return (
    <section className="px-5 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink text-center mb-2">
          Cerita Nyata
        </h1>
        <p className="text-center text-sm text-ink/65 mb-10 max-w-xl mx-auto">
          Cerita-cerita berikut adalah fiksi, tapi situasinya nyata. Bacalah dengan hati terbuka.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {stories.map((story) => (
            <article
              key={story.id}
              className="bg-white rounded-bubble border border-purple-100 p-6 flex flex-col"
            >
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-sky-400/15 text-sky-500 text-xs font-semibold mb-3">
                {story.tag}
              </span>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{story.title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed mb-4 flex-1">{story.excerpt}</p>
              <button
                onClick={() => openStory(story)}
                className="self-start text-sm font-semibold text-purple-500 hover:text-purple-600 transition-colors"
              >
                Baca Selengkapnya →
              </button>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm flex items-center justify-center px-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-bubble max-w-lg w-full max-h-[88vh] overflow-y-auto p-7 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-purple-100 transition-colors"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-sky-400/15 text-sky-500 text-xs font-semibold mb-3">
              {selected.tag}
            </span>
            <h2 className="font-display font-bold text-xl text-ink mb-4">{selected.title}</h2>
            <div className="text-sm text-ink/75 leading-relaxed whitespace-pre-line space-y-3">
              {selected.content}
            </div>

            <div className="mt-6 bg-purple-50 rounded-2xl p-4">
              <p className="text-sm font-semibold text-purple-600 mb-1">Pertanyaan Refleksi:</p>
              <p className="text-sm text-ink/75 italic">{selected.reflection}</p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Jawabanmu
              </label>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value.slice(0, 180))}
                maxLength={180}
                rows={3}
                placeholder="Tuliskan refleksimu di sini..."
                className="w-full px-4 py-2.5 rounded-xl border border-purple-100 focus:outline-none focus:border-purple-400 text-sm resize-none"
              />
              <div className="flex items-center justify-between mt-1 mb-3">
                <p className="text-xs text-ink/40">{draft.length}/180</p>
                <p className="text-xs text-ink/40">Tersimpan privat di device-mu</p>
              </div>
              <button
                onClick={handleSaveReflection}
                disabled={!draft.trim()}
                className="w-full py-2.5 rounded-full bg-purple-500 text-white text-sm font-semibold hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Simpan Refleksiku
              </button>
            </div>

            {hasSaved && (
              <div className="mt-6 pt-6 border-t border-purple-100">
                <p className="text-sm font-semibold text-ink mb-3">Kartu Refleksimu</p>

                <div
                  ref={cardRef}
                  style={{ width: 270, height: 480 }}
                  className="mx-auto rounded-3xl p-6 flex flex-col justify-between text-white bg-gradient-to-br from-purple-500 to-purple-700"
                >
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider opacity-80">
                      {selected.tag.toUpperCase()}
                    </p>
                    <p className="font-display font-bold text-sm mt-3 leading-snug">
                      {selected.reflection}
                    </p>
                  </div>
                  <div className="bg-white/15 rounded-2xl p-3.5">
                    <p className="text-xs leading-relaxed italic">"{reflections[selected.id]}"</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display font-bold text-base">EmpatiKu 💜</p>
                    <p className="text-[10px] opacity-70 mt-0.5">Yuk, ikut berefleksi juga</p>
                  </div>
                </div>

                <button
                  onClick={handleShare}
                  disabled={sharing}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-white border border-purple-200 text-purple-600 text-sm font-semibold hover:bg-purple-50 disabled:opacity-50 transition-colors"
                >
                  {sharing ? (
                    'Menyiapkan kartu...'
                  ) : (
                    <>
                      <Share2 size={16} /> Bagikan ke Instagram
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
