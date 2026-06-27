import { Scale, BookMarked, Users, ExternalLink } from 'lucide-react'

// 👉 Ganti nilai "url" di bawah ini dengan link asli sumber referensi kamu
const sumber = [
  { name: 'Alodokter', url: 'https://www.alodokter.com/memahami-arti-ciri-ciri-dan-manfaat-empati' },
  { name: 'Halodoc', url: 'https://www.halodoc.com/artikel/kurang-empati-pada-orang-lain-bisa-jadi-gangguan-narsistik' },
  { name: 'Alinea.id', url: 'https://www.alinea.id/gaya-hidup/apa-penyebab-hilangnya-empati-b2k8w9PZK' },
  { name: 'IDN Times', url: 'https://www.idntimes.com/life/inspiration/5-tanda-kamu-kehilangan-empati-gemar-menghakimi-orang-01-p276n-lytpxy' },
  { name: 'BPIP', url: 'https://bpip.go.id/artikel/begini-contoh-pengamalan-sila-ke-2-pancasila-dalam-kehidupan-kehidupan-sehari-hari' },
  { name: 'HelloSehat', url: 'https://hellosehat.com/mental/stres/cara-mengatasi-perasaan-sensitif/' },
]

const tim = ['Ilham Ramadan', 'Fazan Al-Habsy', 'Halim Fatur Rohman']

function getInitials(nama) {
  const parts = nama.trim().split(' ').filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function Tentang() {
  return (
    <section className="px-5 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-ink text-center mb-12">
          Tentang EmpatiKu
        </h1>

        {/* Misi */}
        <div className="bg-white rounded-bubble border border-purple-100 p-6 md:p-7 mb-6">
          <h2 className="font-display font-bold text-lg text-ink mb-3">Misi Kami</h2>
          <p className="text-sm text-ink/70 leading-relaxed">
            EmpatiKu lahir dari keprihatinan terhadap meningkatnya kasus bullying dan menurunnya
            empati di kalangan pelajar dan mahasiswa Indonesia. Kami percaya bahwa perubahan
            dimulai dari kesadaran diri — dan kesadaran dimulai dari satu langkah kecil.
          </p>
        </div>

        {/* Landasan Nilai */}
        <div className="bg-purple-500 rounded-bubble p-6 md:p-7 mb-6 text-white">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-3">
            <Scale size={20} />
          </div>
          <h2 className="font-display font-bold text-lg mb-3">Landasan Nilai</h2>
          <p className="text-sm leading-relaxed text-white/90">
            Aplikasi ini mengimplementasikan nilai <strong>Sila ke-2 Pancasila: Kemanusiaan yang
            Adil dan Beradab</strong>. Nilai ini mengamanatkan setiap warga negara untuk
            menghormati harkat dan martabat sesama manusia, bersikap adil, dan menolong orang yang
            membutuhkan tanpa memandang perbedaan.
          </p>
        </div>

        {/* Sumber Materi */}
        <div className="bg-white rounded-bubble border border-purple-100 p-6 md:p-7 mb-6">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center mb-3 text-purple-600">
            <BookMarked size={20} />
          </div>
          <h2 className="font-display font-bold text-lg text-ink mb-3">Sumber Materi</h2>
          <div className="flex flex-wrap gap-2">
            {sumber.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors"
              >
                {s.name}
                <ExternalLink size={12} className="opacity-60" />
              </a>
            ))}
          </div>
        </div>

        {/* Tim */}
        <div className="bg-white rounded-bubble border border-purple-100 p-6 md:p-7">
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center mb-3 text-purple-600">
            <Users size={20} />
          </div>
          <h2 className="font-display font-bold text-lg text-ink mb-4">Tim Pembuat</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {tim.map((nama) => (
              <div
                key={nama}
                className="text-center bg-purple-50 rounded-2xl p-5"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-purple-200 flex items-center justify-center font-display font-bold text-purple-600 mb-3">
                  {getInitials(nama)}
                </div>
                <p className="font-semibold text-ink text-sm">{nama}</p>
                <p className="text-xs text-ink/55 mt-1">Mahasiswa Informatika - UIN Sunan Gunung Djati</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
