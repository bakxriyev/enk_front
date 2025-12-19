"use client"

import Link from "next/link"
import { Plus, Globe, Shield, Layers, Users, Briefcase, Heart, Activity, Stethoscope, Cross } from "lucide-react"
import { HeroSkeleton } from "@/components/ui/loading-skeleton"
import { useLanguage } from "../../context/language-context"
import { useState, useEffect } from "react"
import Image from "next/image"

interface HeroSectionProps {
  isLoading?: boolean
}

const quickActions = [
  { icon: Plus, label: "Qabulga yozilish", label_ru: "Записаться на прием", href: "/appointment" },
  { icon: Globe, label: "Chet elliklar uchun", label_ru: "Для иностранцев", href: "/international" },
  { icon: Shield, label: "Sug'urta", label_ru: "Страховка", href: "/insurance" },
  { icon: Layers, label: "Bo'limlar", label_ru: "Отделения", href: "/departments" },
  { icon: Users, label: "Shifokorlar", label_ru: "Врачи", href: "/doctors" },
  { icon: Briefcase, label: "Bo'sh ish o'rinlari", label_ru: "Вакансии", href: "/career" },
]

const heroContent = {
  uz: {
    title: "Sizga bo'lgan g'amxo'rligimiz —",
    titleSecond: "bizning kasbimiz.",
    subtitle: "Endokrinologiya klinikasi -  salomatligi uchun ishonchli hamkor.",
    buttonPatients: "Biz bilan bog'lanish",
    buttonDoctors: "Shifokorlarimiz haqida",
  },
  ru: {
    title: "Забота о вас —",
    titleSecond: "наша профессия.",
    subtitle: "Клиника 'ENDOKRINOLOGIYA' - надежный партнер для здоровья.",
    buttonPatients: "Связаться с нами",
    buttonDoctors: "О наших врачах",
  },
}

// Sample video data - replace with actual API data
const sampleVideos = [
  { id: 1, thumbnail: "/photo1.jpg", title: "Klinika interyeri" },
  { id: 2, thumbnail: "/photo2.jpg", title: "Zamonaviy jihozlar" },
  { id: 3, thumbnail: "/photo3.jpg", title: "Mutaxassislar jamoasi" },
  { id: 4, thumbnail: "/photo4.jpg", title: "Bemor parvarishi" },
]

const backgroundIcons = [Heart, Activity, Stethoscope, Cross, Heart, Activity, Stethoscope, Cross]

export function HeroSection({ isLoading }: HeroSectionProps) {
  const { language } = useLanguage()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % sampleVideos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return <HeroSkeleton />
  }

  const content = heroContent[language]

  return (
    <section className="relative overflow-hidden">
      {/* Animated Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundIcons.map((Icon, i) => (
          <div
            key={i}
            className="absolute text-white/5"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 25) % 100}%`,
              animation: `float-${i % 3} ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Icon className="w-16 h-16 md:w-24 md:h-24" />
          </div>
        ))}
      </div>

      {/* Hero Background with Enhanced Gradient */}
      <div
        className="relative min-h-[850px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 74, 141, 0.95) 0%, rgba(13, 115, 119, 0.9) 50%, rgba(211, 47, 47, 0.85) 100%), url('/hero.jpg')`,
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-red-500/10 animate-gradient-shift" />

        {/* Animated lines overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-pulse-line"
                style={{
                  top: `${10 + i * 12}%`,
                  left: 0,
                  right: 0,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${3 + i * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-24 pb-32">
          <div className="mb-8 animate-fade-in-scale">
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-lg p-4 shadow-2xl border-4 border-white/20 hover:scale-110 transition-transform duration-500">
              <Image
                src="/logo.jpg"
                alt="Sog'lom Ona va Bola"
                fill
                className="object-contain p-4 drop-shadow-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-red-400/20 animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 animate-fade-in-up italic leading-tight drop-shadow-2xl">
            {content.title} <br />
            <span className="bg-gradient-to-r from-cyan-200 via-white to-red-200 bg-clip-text text-transparent">
              {content.titleSecond}
            </span>
          </h1>
          <p
            className="text-white/90 text-lg md:text-xl mb-10 max-w-3xl animate-fade-in-up font-medium drop-shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {content.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up mb-16" style={{ animationDelay: "0.4s" }}>
            <Link
              href="https://t.me/bakxriyevvv"
              className="bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105 shadow-lg"
            >
              {content.buttonPatients}
            </Link>
            <Link
              href="/doctors"
              className="bg-white/95 backdrop-blur text-[#1e4a8d] px-10 py-4 rounded-full font-semibold hover:bg-white transition-all hover:scale-105 shadow-lg"
            >
              {content.buttonDoctors}
            </Link>
          </div>

          <div className="w-full max-w-6xl animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {sampleVideos.map((video, index) => (
                <div
                  key={video.id}
                  className={`flex-shrink-0 w-64 h-96 rounded-3xl overflow-hidden snap-center transition-all duration-500 ${
                    index === currentVideoIndex
                      ? "scale-105 shadow-2xl ring-4 ring-white/50"
                      : "scale-95 opacity-60 hover:opacity-100"
                  }`}
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer group">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[16px] border-l-[#1e4a8d] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm">{video.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative -mt-16 z-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center group-hover:scale-110 transition-transform">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                {language === "ru" ? action.label_ru : action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -20px) rotate(5deg); }
          50% { transform: translate(-10px, -40px) rotate(-5deg); }
          75% { transform: translate(15px, -20px) rotate(3deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-15px, -25px) rotate(-7deg); }
          66% { transform: translate(15px, -35px) rotate(7deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(0, -30px) rotate(10deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.2; transform: translateX(-100%); }
          50% { opacity: 0.5; transform: translateX(100%); }
        }
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-gradient-shift {
          animation: gradient-shift 5s ease-in-out infinite;
        }
        .animate-pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 1s ease-out forwards;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
