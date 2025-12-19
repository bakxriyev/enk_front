"use client"

import Image from "next/image"
import { Globe, Users, Cpu, DockIcon, HelpCircle, Heart, Stethoscope, Activity } from "lucide-react"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { useLanguage } from "../../context/language-context"

interface AboutSectionProps {
  isLoading?: boolean
}

const features = [
  { icon: Globe, title: "LABORATORIYA", title_ru: "ЛАБОРАТОРИЯ" },
  { icon: Users, title: "FIZIOTERAPIYA", title_ru: "ФИЗИОТЕРАПИЯ" },
  { icon: Cpu, title: "AMBULATOR VA STATSIONAR DAVOLASH", title_ru: "АМБУЛАТОРНОЕ И СТАЦИОНАРНОЕ ЛЕЧЕНИЕ" },
  { icon: DockIcon, title: "TEZ TIBBIY YORDAM (1299)", title_ru: "СКОРАЯ МЕДИЦИНСКАЯ ПОМОЩЬ (1299)" },
  { icon: HelpCircle, title: "MASLAHAT BERISH XIZMATI", title_ru: "КОНСУЛЬТАЦИОННАЯ СЛУЖБА" },
]

const backgroundIcons = [Heart, Stethoscope, Activity, Heart, Stethoscope]

export function AboutSection({ isLoading }: AboutSectionProps) {
  const { language, t } = useLanguage()

  if (isLoading) {
    return (
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <Skeleton className="w-full lg:w-1/2 h-80 rounded-2xl" />
          <div className="w-full lg:w-1/2 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-40" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const aboutTextUz = `ENDOKRINOLOGIYA shifoxonasi 2022 yil oktabr oyida o'z faoliyatini boshlagan. Klinikamiz Toshkent shahar Bektemir tumani, Obod ko'chasi 123-uyda joylashgan. Klinikamizda quyidagi bo'limlar mavjud: Pediatriya, Nevrologiya, Endokrinologiya, Ginekologiya, Umumiy terapiya, Otorinolaringologiya. Klinika 25 o'rinli joy bilan ta'minlangan. Palatalarda barcha sharoitlar mavjud bo'lib, lyuks toifasiga kiradi.`

  const aboutTextRu = `Клиника "ENDOKRINOLOGIYA" начала свою деятельность в октябре 2022 года. Наша клиника расположена в Бектемирском районе города Ташкента, по адресу: улица Обод, дом 123. В клинике работают следующие отделения: Педиатрия, Неврология, Эндокринология, Гинекология, Общая терапия, Оториноларингология. Клиника располагает 25 койко-местами. Все палаты оснащены всеми удобствами и относятся к категории люкс.`

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        {backgroundIcons.map((Icon, i) => (
          <div
            key={i}
            className="absolute text-[#1e4a8d]"
            style={{
              left: `${(i * 20 + 10) % 90}%`,
              top: `${(i * 30 + 10) % 80}%`,
              animation: `float-icon ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <Icon className="w-20 h-20" />
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
        {/* Image */}
        <div className="w-full lg:w-1/2 animate-fade-in-up">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/photo4.jpg"
              alt="Sog'lom Ona va Bola"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1e4a8d] via-[#0d7377] to-[#d32f2f] bg-clip-text text-transparent mb-6">
            {t("Klinika haqida", "О клинике")}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="text-base md:text-lg">{language === "ru" ? aboutTextRu : aboutTextUz}</p>
            <p className="text-base font-medium text-[#1e4a8d]">
              {t(
                "ENDOKRINOLOGIYA klinikasi 2022 yildan buyon ona va bola hamda nuroniylarimizning sog'lig'ini muhofaza qilish, erta tashxis va sifatli davolash ishlarini amalga oshirib kelmoqda.",
                "Клиника 'ENDOKРИНОЛОГИЯ' с 2022 года занимается охраной здоровья матери и ребенка, ранней диагностикой и качественным лечением.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in-up border border-gray-100"
                style={{ animationDelay: `${0.3 + 0.1 * index}s` }}
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-[#1e4a8d] leading-tight pt-2">
                  {language === "ru" ? feature.title_ru : feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-icon {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(20px, -30px) rotate(10deg); opacity: 0.6; }
        }
      `}</style>
    </section>
  )
}
