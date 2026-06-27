import { useState } from 'react'
import { Link } from 'react-router-dom'
import { quizQuestions, getResultCategory, infoEmpati } from '../data/quizData'
import { RotateCcw, BookOpenText, HeartHandshake, AlertCircle } from 'lucide-react'

export default function Kuis() {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const finished = step >= quizQuestions.length
  const maxScore = quizQuestions.length * 10

  function handleAnswer(optionScore) {
    setScore((s) => s + optionScore)
    setStep((s) => s + 1)
  }

  function reset() {
    setScore(0)
    setStep(0)
  }

  if (finished) {
    const result = getResultCategory(score, quizQuestions.length)
    return (
      <section className="px-5 py-16 md:py-20">
        <div className="max-w-xl mx-auto text-center bg-white rounded-bubble border border-purple-100 p-8 md:p-10">
          <div className="text-6xl mb-4">{result.emoji}</div>
          <p className="text-sm font-semibold text-purple-500 mb-1">Skor kamu: {score} / {maxScore}</p>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-4">
            {result.title}
          </h1>
          <p className="text-ink/70 leading-relaxed mb-5">{result.desc}</p>
          <div className="bg-purple-50 rounded-2xl p-4 text-left text-sm text-ink/75">
            <p className="font-semibold text-purple-600 mb-1">Tips untukmu:</p>
            <p>{result.tips}</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-purple-200 text-purple-600 font-semibold hover:bg-purple-50 transition-colors"
            >
              <RotateCcw size={16} /> Coba Lagi
            </button>
            <Link
              to="/cerita"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors"
            >
              <BookOpenText size={16} /> Baca Cerita Nyata
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const current = quizQuestions[step]
  const progress = (step / quizQuestions.length) * 100

  return (
    <section className="px-5 py-12 md:py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink text-center mb-2">
          Kuis Empati
        </h1>
        <p className="text-center text-sm text-ink/65 mb-8">
          Seberapa empatik kamu? Jawab {quizQuestions.length} pertanyaan berikut dengan jujur. Tidak ada jawaban benar
          atau salah — hanya cerminan dirimu hari ini.
        </p>

        {/* Info edukasi singkat, hanya tampil sebelum soal pertama dijawab */}
        {step === 0 && (
          <div className="bg-white rounded-bubble border border-purple-100 p-6 mb-6">
            <h2 className="font-display font-bold text-base text-ink mb-1.5">{infoEmpati.title}</h2>
            <p className="text-sm text-ink/65 leading-relaxed mb-4">{infoEmpati.intro}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-purple-600">
                  <HeartHandshake size={16} />
                  <p className="text-xs font-semibold">{infoEmpati.positif.label}</p>
                </div>
                <ul className="space-y-1.5">
                  {infoEmpati.positif.points.map((point) => (
                    <li key={point} className="text-xs text-ink/65 leading-relaxed pl-3 relative">
                      <span className="absolute left-0">•</span>{point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-rose">
                  <AlertCircle size={16} />
                  <p className="text-xs font-semibold">{infoEmpati.negatif.label}</p>
                </div>
                <ul className="space-y-1.5">
                  {infoEmpati.negatif.points.map((point) => (
                    <li key={point} className="text-xs text-ink/65 leading-relaxed pl-3 relative">
                      <span className="absolute left-0">•</span>{point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-2 bg-purple-100 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-purple-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-ink/50 mb-6">
          Soal {step + 1} dari {quizQuestions.length}
        </p>

        <div className="bg-white rounded-bubble border border-purple-100 p-6 md:p-7">
          <h2 className="font-semibold text-ink text-base md:text-lg mb-5 leading-relaxed">
            {current.question}
          </h2>
          <div className="flex flex-col gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleAnswer(opt.score)}
                className="text-left px-4 py-3 rounded-xl border border-purple-100 hover:border-purple-400 hover:bg-purple-50 transition-colors text-sm text-ink/80 flex gap-3"
              >
                <span className="font-bold text-purple-500 shrink-0">{opt.label}</span>
                <span>{opt.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
