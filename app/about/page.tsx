"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { useLanguage } from "../../context/language-context"
import { api } from "@/lib/api"
import { getImageUrl } from "../../lib/config"
import type { About, Stat, Feature } from "@/lib/types"
import { Heart, Stethoscope, Activity, Cross } from "lucide-react"

const backgroundIcons = [Heart, Stethoscope, Activity, Cross, Heart, Stethoscope, Activity, Cross]

export default function AboutPage() {
  const { language, t } = useLanguage()
  const [about, setAbout] = useState<About | null>(null)
  const [stats, setStats] = useState<Stat[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getAbout().catch(() => []),
      api.getStats().catch(() => []),
      api.getFeatures().catch(() => []),
    ]).then(([aboutData, statsData, featuresData]) => {
      if (aboutData && aboutData.length > 0) {
        setAbout(aboutData[0])
      }
      setStats(statsData)
      setFeatures(featuresData)
      setIsLoading(false)
    })
  }, [])

  const detailedAboutUz = `Sog'lom Ona va Bola shifoxonasi 2022 yil oktabr oyida o'z faoliyatini boshlagan. Shifoxonamiz Toshkent shahar Bektemir tumani, Obod ko'chasi 123-uyda joylashgan bo'lib, klinikamizda Pediatriya, Nevrologiya, Endokrinologiya, Ginekologiya, Umumiy Terapiya, Otorinolaringologiya bo'limlari tashkil qilingan va 25 o'rinli joy turi bilan ta'minlangan. Palatalarimizda barcha sharoitlar mavjud bo'lib, lyuks toifasiga kiradi.

Sog'lom Ona va Bola klinikasi 2022 yildan buyon ona va bola hamda nuroniylarimizning sog'lig'ini muhofaza qilish, erta tashxis va sifatli davolash ishlarini amalga oshirib kelmoqda. Klinikamiz zamonaviy tibbiy jihozlar bilan ta'minlangan bo'lib, yuqori malakali shifokorlar tomonidan bemorlarga sifatli tibbiy xizmat ko'rsatiladi.

Klinika ish vaqti 24/7 ish faoliyatida bo'lib, klinikamizda Laboratoriya, Fizoterapiya, Ambulator davolash, statsionar davolash, tez tibbiy yordam xizmati (1299), bilimli va malakali mehribon, mehnatsevar xodimlar xizmat ko'rsatadi.

2024 yildan buyon Qozog'iston, Tojikiston davlatlaridan juda sezilarli darajada bemorlar oqimi ko'paymoqda. Va biz kelgusida chet el fuqarolari uchun yanada ko'proq yengilliklar bilan ularni xursand qilish istagidamiz.

Shu kunga qadar bizning Sog'lom Ona va Bola klinikamizda jami 2,500 ta statsionar va 25,000 dan ortiq ambulator bemorlarga tibbiy xizmat ko'rsatilgan.`

  const detailedAboutRu = `Клиника "Здоровая Мать и Ребенок" начала свою деятельность в октябре 2022 года. Наша клиника расположена в Бектемирском районе города Ташкента по адресу: улица Обод, дом 123. В клинике организованы отделения педиатрии, неврологии, эндокринологии, гинекологии, общей терапии и оториноларингологии, оснащенные 25 койко-местами. Все наши палаты имеют все удобства и относятся к категории люкс.

Клиника "Здоровая Мать и Ребенок" с 2022 года занимается охраной здоровья матери, ребенка и новорожденных, ранней диагностикой и качественным лечением. Наша клиника оснащена современным медицинским оборудованием, а высококвалифицированные врачи предоставляют пациентам качественные медицинские услуги.

Клиника работает круглосуточно 24/7. В нашей клинике работают лаборатория, физиотерапия, амбулаторное и стационарное лечение, служба скорой медицинской помощи (1299), знающие и квалифицированные, заботливые и трудолюбивые сотрудники.

С 2024 года значительно увеличился поток пациентов из Казахстана и Таджикистана. И мы стремимся в будущем порадовать иностранных граждан еще большими удобствами.

На сегодняшний день в нашей клинике "Здоровая Мать и Ребенок" оказана медицинская помощь 2,500 стационарным и более 25,000 амбулаторным пациентам.`

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        {backgroundIcons.map((Icon, i) => (
          <div
            key={i}
            className="absolute text-[#1e4a8d]"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
              animation: `float-bg ${10 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.2}s`,
            }}
          >
            <Icon className="w-24 h-24 md:w-32 md:h-32" />
          </div>
        ))}
      </div>

      <Header />

      {/* Hero */}
      <div className="relative h-[400px] bg-gradient-to-br from-[#1e4a8d] via-[#0d7377] to-[#1e4a8d] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-full animate-pulse-line"
              style={{
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
              }}
            />
          ))}
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in-up drop-shadow-2xl">
            {language === "ru" ? "О клинике" : "Klinika haqida"}
          </h1>
          <p
            className="text-white/90 text-lg max-w-2xl animate-fade-in-up drop-shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {t(
              "Sog'lom Ona va Bola - ona va bola salomatligi uchun ishonchli hamkor",
              "Здоровая Мать и Ребенок - надежный партнер для здоровья матери и ребенка",
            )}
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in-up">
            {isLoading ? (
              <Skeleton className="h-80 w-full rounded-2xl" />
            ) : (
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src={
                    about?.logo
                      ? getImageUrl("about", about.logo)
                      : "/placeholder.svg?height=400&width=600&query=modern hospital building"
                  }
                  alt="Sog'lom Ona va Bola"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#1e4a8d] via-[#0d7377] to-[#d32f2f] bg-clip-text text-transparent mb-6">
              {t("Bizning tarix", "Наша история")}
            </h2>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="text-gray-600 leading-relaxed space-y-4">
                {(language === "ru" ? detailedAboutRu : detailedAboutUz).split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats from backend */}
        {stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up border border-gray-100"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{language === "ru" ? stat.label_ru : stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Features from backend */}
        {features.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-[#1e4a8d] mb-8 text-center">{t("Nima uchun biz?", "Почему мы?")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up border border-gray-100"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  {feature.icon && (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center mb-4 shadow-lg">
                      <Image
                        src={getImageUrl("features", feature.icon) || "/placeholder.svg"}
                        alt=""
                        width={28}
                        height={28}
                        className="w-7 h-7 brightness-0 invert"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {language === "ru" ? feature.title_ru : feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === "ru" ? feature.description_ru : feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mission */}
        {about?.mission && (
          <div className="bg-gradient-to-br from-[#1e4a8d] via-[#0d7377] to-[#1e4a8d] rounded-2xl p-8 md:p-12 text-white animate-fade-in-up shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Heart className="absolute top-4 right-4 w-32 h-32" />
              <Stethoscope className="absolute bottom-4 left-4 w-24 h-24" />
            </div>
            <h2 className="text-3xl font-bold mb-6 relative z-10">{t("Bizning missiyamiz", "Наша миссия")}</h2>
            <p className="text-white/90 text-lg leading-relaxed relative z-10">
              {language === "ru" ? about.mission_ru : about.mission}
            </p>
          </div>
        )}
      </main>

      <Footer />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-bg {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          33% { transform: translate(-30px, -40px) rotate(-10deg); opacity: 0.5; }
          66% { transform: translate(30px, -20px) rotate(10deg); opacity: 0.4; }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.2; transform: translateX(-100%); }
          50% { opacity: 0.5; transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
