"use client"

import Link from "next/link"
import { Plus, Globe, Shield, Layers, Users, Briefcase, Heart, Activity, Stethoscope, Cross, X, Phone, MessageCircle, Instagram } from "lucide-react"
import { HeroSkeleton } from "@/components/ui/loading-skeleton"
import { useLanguage } from "../../context/language-context"
import { useState, useEffect } from "react"
import Image from "next/image"
import { About, QuickAction, Slider } from "@/lib/types"

interface HeroSectionProps {
  isLoading?: boolean
    about?: About | null
  quickActions?: QuickAction[]
  slider?: Slider | null
}

interface AppointmentFormData {
  full_name: string
  phone_number: string
  department: string
  message: string
  appointment_date: string
  appointment_time: string
}

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'uz' | 'ru'
}

interface TimeSlot {
  id: number
  time: string
  available: boolean
}

const quickActions = [
  { icon: Plus, label: "Qabulga yozilish", label_ru: "Записатьcя на прием", href: "/appointment" },
  { icon: Shield, label: "Sug'urta", label_ru: "Страховка", href: "/insurance" },
  { icon: Layers, label: "Bo'limlar", label_ru: "Отделения", href: "/departments" },
  { icon: Users, label: "Shifokorlar", label_ru: "Врачи", href: "/doctors" },
  { icon: Briefcase, label: "Yangiliklar", label_ru: "Вакансии", href: "/news" },
]

const heroContent = {
  uz: {
    title: "Sizga bo'lgan g'amxo'rligimiz —",
    titleSecond: "bizning kasbimiz.",
    subtitle: "Endokrinologiya klinikasi -  salomatligi uchun ishonchli hamkor.",
    buttonPatients: "Biz bilan bog'lanish",
    buttonDoctors: "Shifokorlarimiz haqida",
    appointmentModal: {
      title: "Qabulga yozilish",
      fullName: "F.I.SH",
      phone: "Telefon raqam",
      department: "Bo'lim",
      message: "Qo'shimcha ma'lumot",
      date: "Sana",
      time: "Vaqt",
      submit: "Yuborish",
      cancel: "Bekor qilish",
      success: "Muvaffaqiyatli yuborildi!",
      error: "Xatolik yuz berdi, qayta urinib ko'ring.",
      loading: "Yuborilmoqda...",
      placeholder: {
        fullName: "Ism familiyangiz",
        phone: "+998 90 123 45 67",
        department: "Bo'limni tanlang",
        message: "Simptomlar yoki qo'shimcha ma'lumot",
        date: "Sana tanlang",
        time: "Vaqt tanlang",
      }
    },
    contactModal: {
      title: "Biz bilan bog'lanish",
      phone: "Telefon orqali",
      telegram: "Telegram orqali",
      instagram: "Instagram orqali",
      appointment: "Qabulga yozilish",
      close: "Yopish"
    }
  },
  ru: {
    title: "Забота о вас —",
    titleSecond: "наша профессия.",
    subtitle: "Клиника 'ENDOKRINOLOGIYA' - надежный партнер для здоровья.",
    buttonPatients: "Связаться с нами",
    buttonDoctors: "О наших врачах",
    appointmentModal: {
      title: "Запись на прием",
      fullName: "Ф.И.О",
      phone: "Номер телефона",
      department: "Отделение",
      message: "Дополнительная информация",
      date: "Дата",
      time: "Время",
      submit: "Отправить",
      cancel: "Отмена",
      success: "Успешно отправлено!",
      error: "Произошла ошибка, попробуйте снова.",
      loading: "Отправляется...",
      placeholder: {
        fullName: "Ваше имя и фамилия",
        phone: "+998 90 123 45 67",
        department: "Выберите отделение",
        message: "Симптомы или дополнительная информация",
        date: "Выберите дата",
        time: "Выберите время",
      }
    },
    contactModal: {
      title: "Связаться с нами",
      phone: "По телефону",
      telegram: "Через Telegram",
      instagram: "Через Instagram",
      appointment: "Запись на прием",
      close: "Закрыть"
    }
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

// Time slots for the day
const timeSlots: TimeSlot[] = [
  { id: 1, time: "09:00", available: true },
  { id: 2, time: "09:30", available: true },
  { id: 3, time: "10:00", available: true },
  { id: 4, time: "10:30", available: true },
  { id: 5, time: "11:00", available: true },
  { id: 6, time: "11:30", available: true },
  { id: 7, time: "12:00", available: true },
  { id: 8, time: "12:30", available: true },
  { id: 9, time: "14:00", available: true },
  { id: 10, time: "14:30", available: true },
  { id: 11, time: "15:00", available: true },
  { id: 12, time: "15:30", available: true },
  { id: 13, time: "16:00", available: true },
  { id: 14, time: "16:30", available: true },
  { id: 15, time: "17:00", available: true },
]

// Contact Modal Component
const ContactModal = ({ isOpen, onClose, language }: ContactModalProps) => {
  const content = heroContent[language].contactModal
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl animate-fade-in-scale overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Phone */}
          <a
            href="tel:+998901234567"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{content.phone}</h3>
              <p className="text-sm text-gray-600">+9989 55 902 10 10</p>
              
              <p className="text-sm text-gray-600">+998 77 313 01 30</p>
            </div>
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/endokrinologiya_kardialogiya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-cyan-50 hover:border-cyan-300 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
              <MessageCircle className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{content.telegram}</h3>
              <p className="text-sm text-gray-600">Telegram kanalimiz</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/endokrinolog_uz_/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:from-pink-600 group-hover:to-purple-700 transition-colors">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{content.instagram}</h3>
              <p className="text-sm text-gray-600">endokrinolog_uz_</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export function HeroSection({ isLoading, about }: HeroSectionProps) {
  const { language } = useLanguage()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [departments, setDepartments] = useState<string[]>([])
  const [loadingDepartments, setLoadingDepartments] = useState(false)

  const [formData, setFormData] = useState<AppointmentFormData>({
    full_name: "",
    phone_number: "",
    department: "",
    message: "",
    appointment_date: "",
    appointment_time: "",
  })

  // Fetch departments from API
  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    setLoadingDepartments(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
      const response = await fetch(`${apiUrl}/direction`)
      
      if (response.ok) {
        const data = await response.json()
        // Assuming the API returns an array of department objects with 'name' property
        if (Array.isArray(data)) {
          const departmentNames = data.map(dept => dept.name || dept.title || dept)
          setDepartments(departmentNames)
        }
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
      // Fallback departments if API fails
    
    } finally {
      setLoadingDepartments(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % sampleVideos.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleQuickActionClick = (href: string) => {
    if (href === "/appointment") {
      setIsAppointmentModalOpen(true)
    }
  }

  const handleContactClick = () => {
    setIsContactModalOpen(true)
  }

  const handleTimeSlotClick = (time: string) => {
    setFormData(prev => ({
      ...prev,
      appointment_time: time
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      
      // First submit appointment data
      const appointmentResponse = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          phone_number: formData.phone_number.replace(/\D/g, ''),
          doctor_name: "" // Empty since doctor selection is removed
        })
      })

      if (appointmentResponse.ok) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          full_name: "",
          phone_number: "",
          department: "",
          message: "",
          appointment_date: "",
          appointment_time: "",
        })
        // Close modal after 2 seconds
        setTimeout(() => {
          setIsAppointmentModalOpen(false)
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseAppointmentModal = () => {
    if (!isSubmitting) {
      setIsAppointmentModalOpen(false)
      setSubmitStatus("idle")
      // Reset form
      setFormData({
        full_name: "",
        phone_number: "",
        department: "",
        message: "",
        appointment_date: "",
        appointment_time: "",
      })
    }
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
  }

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  // Get date 30 days from now for max date
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  if (isLoading) {
    return <HeroSkeleton />
  }

  const content = heroContent[language]

  return (
    <section className="relative overflow-hidden">
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        language={language}
      />

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-fade-in-scale overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">
                {content.appointmentModal.title}
              </h2>
              <button
                onClick={handleCloseAppointmentModal}
                disabled={isSubmitting}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {content.appointmentModal.fullName}
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder={content.appointmentModal.placeholder.fullName}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1e4a8d] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {content.appointmentModal.phone}
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder={content.appointmentModal.placeholder.phone}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1e4a8d] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {content.appointmentModal.department}
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    disabled={loadingDepartments}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1e4a8d] focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">{loadingDepartments ? "Yuklanmoqda..." : content.appointmentModal.placeholder.department}</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {content.appointmentModal.date}
                  </label>
                  <input
                    type="date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    min={getTodayDate()}
                    max={getMaxDate()}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1e4a8d] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {content.appointmentModal.time}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => handleTimeSlotClick(slot.time)}
                      disabled={!slot.available}
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${
                        formData.appointment_time === slot.time
                          ? "bg-[#1e4a8d] text-white ring-2 ring-[#1e4a8d] ring-offset-2"
                          : slot.available
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:border-gray-300"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {content.appointmentModal.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={content.appointmentModal.placeholder.message}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1e4a8d] focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {submitStatus === "success" && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-center animate-fade-in">
                  ✅ {content.appointmentModal.success}
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center animate-fade-in">
                  ❌ {content.appointmentModal.error}
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-[#1e4a8d] to-[#0d7377] text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? content.appointmentModal.loading : content.appointmentModal.submit}
                </button>
                <button
                  type="button"
                  onClick={handleCloseAppointmentModal}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
                >
                  {content.appointmentModal.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-2 pb-12">
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
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up mb-16" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={handleContactClick}
              className="bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] text-white px-10 py-4 rounded-full font-semibold hover:shadow-2xl transition-all hover:scale-105 shadow-lg"
            >
              {content.buttonPatients}
            </button>
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
      <div className="relative -mt- z-10 max-w-6xl mx-auto px-4 mn-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => {
            if (action.href === "/appointment") {
              return (
                <button
                  key={action.href}
                  onClick={() => handleQuickActionClick(action.href)}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2 animate-fade-in-up group cursor-pointer"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#0d7377] to-[#1e4a8d] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {language === "ru" ? action.label_ru : action.label}
                  </span>
                </button>
              )
            }

            return (
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
            )
          })}
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 5s ease-in-out infinite;
        }
        .animate-pulse-line {
          animation: pulse-line 3s ease-in-out infinite;
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
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