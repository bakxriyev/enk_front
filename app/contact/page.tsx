"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Skeleton } from "@/components/ui/loading-skeleton"
import {
  Facebook,
  Instagram,
  Send,
  Youtube,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Stethoscope,
  Activity,
} from "lucide-react"
import { useLanguage } from "../../context/language-context"
import { api } from "@/lib/api"
import type { About } from "@/lib/types"

const backgroundIcons = [Heart, Stethoscope, Activity, Heart, Stethoscope, Activity]

export default function ContactPage() {
  const { language, t } = useLanguage()
  const [about, setAbout] = useState<About | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api
      .getAbout()
      .then((data) => {
        if (data && data.length > 0) {
          setAbout(data[0])
        }
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const contactInfo = {
    uz: {
      description:
        "Bizning Sog'lom Ona va Bola klinikamiz 24/7 ish faoliyatida. Bilimli va malakali mehribon, mehnatsevar xodimlar xizmat ko'rsatadi. Laboratoriya, Fizoterapiya, Ambulator va statsionar davolash, tez tibbiy yordam xizmati (1299) mavjud.",
      workingHours: "Dushanba - Juma: 08:00 - 20:00",
      saturday: "Shanba: 09:00 - 18:00",
      sunday: "Yakshanba: Dam olish",
      emergency: "Shoshilinch yordam: 24/7",
    },
    ru: {
      description:
        "Наша клиника 'Здоровая Мать и Ребенок' работает 24/7. Знающие и квалифицированные, заботливые и трудолюбивые сотрудники оказывают услуги. Доступны лаборатория, физиотерапия, амбулаторное и стационарное лечение, служба скорой помощи (1299).",
      workingHours: "Понедельник - Пятница: 08:00 - 20:00",
      saturday: "Суббота: 09:00 - 18:00",
      sunday: "Воскресенье: Выходной",
      emergency: "Экстренная помощь: 24/7",
    },
  }

  const currentContent = contactInfo[language]

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-5">
        {backgroundIcons.map((Icon, i) => (
          <div
            key={i}
            className="absolute text-[#1e4a8d]"
            style={{
              left: `${(i * 18) % 100}%`,
              top: `${(i * 25) % 100}%`,
              animation: `float-contact ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1}s`,
            }}
          >
            <Icon className="w-24 h-24 md:w-32 md:h-32" />
          </div>
        ))}
      </div>

      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1e4a8d] via-[#0d7377] to-[#d32f2f] py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent w-full animate-pulse"
              style={{ top: `${20 + i * 15}%`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
            {t("Biz bilan bog'lanish", "Связаться с нами")}
          </h1>
          <p className="text-white/90 max-w-2xl text-lg drop-shadow-lg">{currentContent.description}</p>

          <button className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm hover:bg-white/20 transition-all shadow-lg">
            {t("Pastga aylantiring", "Прокрутите вниз")} <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          {/* Social links */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
            {[
              { Icon: Facebook, link: about?.facebook || "#" },
              { Icon: Instagram, link: about?.instagram || "#" },
              { Icon: Send, link: about?.telegram || "#" },
              { Icon: Youtube, link: about?.youtube || "#" },
            ].map(({ Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up border border-gray-100 hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-bold text-[#1e4a8d] mb-6">
              {t("Bog'lanish uchun ma'lumotlar", "Контактная информация")}
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1e4a8d] font-semibold block mb-1">E-mail:</span>
                    <a href={`mailto:${about?.gmail}`} className="text-[#0d7377] hover:underline font-medium">
                      {about?.gmail || "info@soglomona.uz"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1e4a8d] font-semibold block mb-1">{t("Telefon:", "Телефон:")}</span>
                    <div className="space-y-1">
                      <a href={`tel:${about?.phone}`} className="text-[#0d7377] hover:underline font-medium block">
                        {about?.phone || "+998 71 203-30-03"}
                      </a>
                      {about?.phone2 && (
                        <a href={`tel:${about.phone2}`} className="text-[#0d7377] hover:underline font-medium block">
                          {about.phone2}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1e4a8d] font-semibold block mb-1">{t("Manzil:", "Адрес:")}</span>
                    <p className="text-gray-600 font-medium">
                      {language === "ru"
                        ? about?.manzil_ru || "г. Ташкент, Бектемирский район, ул. Обод, 123"
                        : about?.manzil || "Toshkent shahri, Bektemir tumani, Obod ko'chasi, 123"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[#1e4a8d] font-semibold block mb-2">{t("Ish vaqti:", "Часы работы:")}</span>
                    <div className="space-y-1 text-gray-600 text-sm">
                      <p>{currentContent.workingHours}</p>
                      <p>{currentContent.saturday}</p>
                      <p>{currentContent.sunday}</p>
                      <p className="text-[#d32f2f] font-semibold mt-2">{currentContent.emergency}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Message Card */}
          <div
            className="bg-gradient-to-br from-[#1e4a8d] to-[#0d7377] rounded-2xl shadow-xl p-8 text-white animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-2xl font-bold mb-4">{t("Tezkor xabar", "Быстрое сообщение")}</h2>
            <p className="mb-6 text-white/90">
              {t(
                "Savollaringiz bormi? Bizga xabar yuboring va biz tez orada siz bilan bog'lanamiz.",
                "Есть вопросы? Отправьте нам сообщение, и мы свяжемся с вами в ближайшее время.",
              )}
            </p>
            <a
              href="https://t.me/bakxriyevvv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#1e4a8d] px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all shadow-lg"
            >
              <Send className="w-5 h-5" />
              {t("Telegram orqali yozish", "Написать в Telegram")}
            </a>

            <div className="mt-8 pt-8 border-t border-white/20">
              <h3 className="font-semibold mb-3">{t("Ijtimoiy tarmoqlar", "Социальные сети")}</h3>
              <div className="flex gap-3">
                {[
                  { Icon: Facebook, link: about?.facebook || "#" },
                  { Icon: Instagram, link: about?.instagram || "#" },
                  { Icon: Send, link: about?.telegram || "#" },
                  { Icon: Youtube, link: about?.youtube || "#" },
                ].map(({ Icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-contact {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(25px, -35px) rotate(15deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  )
}
