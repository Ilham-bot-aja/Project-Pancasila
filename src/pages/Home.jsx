import { Link } from 'react-router-dom'
import { HeartHandshake, BookOpenText, Users2, ArrowRight } from 'lucide-react'

const features = [
  {
    to: '/kuis',
    icon: HeartHandshake,
    title: 'Kuis Empati',
    desc: '8 situasi sehari-hari untuk mengukur seberapa peka kamu terhadap perasaan orang lain.',
  },
  {
    to: '/cerita',
    icon: BookOpenText,
    title: 'Cerita Nyata',
    desc: 'Kisah-kisah fiksi yang situasinya nyata terjadi di sekitar pelajar Indonesia.',
  },
  {
    to: '/pledge',
    icon: Users2,
    title: 'Pledge Wall',
    desc: 'Tuliskan ikrarmu dan bergabung bersama ratusan orang yang berkomitmen untuk peduli.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-16 pb-20 md:pt-24 md:pb-28">
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-70 animate-floatSlow"
        />
        <div
          aria-hidden="true"
          className="absolute top-40 -left-16 w-60 h-60 bg-sky-400/20 rounded-full blur-3xl opacity-70 animate-floatSlow"
        />

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold tracking-wide mb-6">
            EDUKASI ANTI-BULLYING DIGITAL
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-tight text-ink">
            Jadilah Manusia yang{' '}
            <span className="text-purple-500">Berempati</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed">
            EmpatiKu hadir sebagai ruang refleksi digital untuk pelajar dan mahasiswa Indonesia.
            Di sini kamu bisa menguji empatimu, membaca kisah nyata, dan bergabung bersama ribuan
            orang yang berkomitmen untuk peduli.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/kuis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:bg-purple-600 transition-colors"
            >
              Mulai Kuis Empati <ArrowRight size={18} />
            </Link>
            <Link
              to="/cerita"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-purple-600 font-semibold border border-purple-200 hover:bg-purple-50 transition-colors"
            >
              Baca Cerita Nyata
            </Link>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="px-5 -mt-6 md:-mt-10 relative z-10">
        <div className="max-w-3xl mx-auto bg-purple-500 rounded-bubble text-white px-6 py-6 md:px-10 md:py-8 text-center shadow-xl shadow-purple-500/20">
          <p className="font-display font-bold text-lg md:text-2xl leading-snug">
            1 dari 3 pelajar pernah mengalami bullying
          </p>
          <p className="mt-1 text-sm md:text-base text-white/85">
            — dan kebanyakan pelaku tidak menyadarinya.
          </p>
        </div>
      </section>

      {/* Feature cards */}
      <section className="px-5 py-16 md:py-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
          {features.map(({ to, icon: Icon, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="group bg-white rounded-bubble p-6 border border-purple-100 hover:border-purple-300 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed">{desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-purple-500 mt-4">
                Mulai <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
