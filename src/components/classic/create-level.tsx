'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Difficulty, Duration } from "../../../types/level"
import { createClassic } from "@/lib/services/level-service"
import { useDialogStore } from "@/stores/dialog-store"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

const initialForm = {
  ingameId: "",
  name: "",
  publisher: "",
  difficulty: "EASY_DEMON" as keyof typeof Difficulty,
  duration: "TINY" as keyof typeof Duration,
  videoLink: "",
  thumbnailLink: "",
  minimumCompletion: 0,
  ranking: 0,
}

const validators = {
  ingameId: (v: string) => {
    if (!v) return "In-game id cannot be empty."
    if (!/^[0-9]+$/.test(v)) return "In-game id must contain only numbers."
    if (v.length > 255) return "In-game id must be at most 255 characters."
    return null
  },
  name: (v: string) => {
    if (!v) return "Name cannot be empty."
    if (v.length > 255) return "Name must be at most 255 characters."
    return null
  },
  publisher: (v: string) => {
    if (!v) return "Publisher cannot be empty."
    if (v.length > 255) return "Publisher must be at most 255 characters."
    return null
  },
  difficulty: (v: string) => {
    if (!v) return "Difficulty must be selected."
    if (!(v in Difficulty)) return "Difficulty must be valid."
    return null
  },
  duration: (v: string) => {
    if (!v) return "Duration must be selected."
    if (!(v in Duration)) return "Duration must be valid."
    return null
  },
  videoLink: (v: string) => {
    if (!v) return "Video link cannot be empty."
    if (v.length > 255) return "Video link must be at most 255 characters."
    return null
  },
  thumbnailLink: (v: string) => {
    if (!v) return "Thumbnail link cannot be empty."
    if (v.length > 255) return "Thumbnail link must be at most 255 characters."
    return null
  },
  minimumCompletion: (v: number) => {
    if (v == null) return "Minimum completion is required."
    if (v < 1) return "Minimum completion must be at least 1."
    if (v > 100) return "Minimum completion cannot exceed 100."
    return null
  },
  ranking: (v: number) => {
    if (v == null) return "Ranking is required."
    if (v <= 0) return "Ranking must be positive."
    return null
  },
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export function CreateClassicLevelDialog() {
  const open = useDialogStore(state => state.dialogOpen)
  const setOpen = useDialogStore(state => state.setDialogOpen)

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<{ [k: string]: string | null }>({})
  const [submitting, setSubmitting] = useState(false)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validate = (field: string, value: any) => {
    if (field === "thumbnailLink") {
      if (!thumbnailFile) return "Thumbnail is required."
      if (!ACCEPTED_IMAGE_TYPES.includes(thumbnailFile.type)) return "Only image files are allowed."
      if (thumbnailFile.size > MAX_FILE_SIZE) return "Image must be less than 5MB."
      return null
    }
    // @ts-ignore
    return validators[field](value)
  }

  const validateAll = () => {
    const newErrors: { [k: string]: string | null } = {}
    Object.entries(form).forEach(([k, v]) => {
      if (k === "thumbnailLink") {
        newErrors[k] = validate(k, thumbnailFile)
      } else {
        // @ts-ignore
        newErrors[k] = validators[k](v)
      }
    })
    setErrors(newErrors)
    return Object.values(newErrors).every(e => !e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    let val: any = value
    if (["minimumCompletion", "ranking"].includes(name)) {
      val = value === "" ? "" : parseInt(value)
    }
    setForm(prev => ({ ...prev, [name]: val }))
    setErrors(prev => ({ ...prev, [name]: validate(name, val) }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setThumbnailFile(file || null)
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file))
      setTimeout(() => {
        setErrors(prev => ({ ...prev, thumbnailLink: null }))
      }, 0)
    } else {
      setThumbnailPreview(null)
      setErrors(prev => ({ ...prev, thumbnailLink: "Thumbnail is required." }))
    }
  }

  const handleFileAreaClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("ingameId", form.ingameId)
      formData.append("name", form.name)
      formData.append("publisher", form.publisher)
      formData.append("difficulty", form.difficulty)
      formData.append("duration", form.duration)
      formData.append("videoLink", form.videoLink)
      formData.append("minimumCompletion", String(form.minimumCompletion))
      formData.append("ranking", String(form.ranking))
      if (thumbnailFile) {
        formData.append("file", thumbnailFile)
      }
      await createClassic(formData)
      setOpen(false)
      setForm(initialForm)
      setThumbnailFile(null)
      setThumbnailPreview(null)
      setErrors({})
    } catch (err) {
      console.error("Failed to create classic level", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Classic Level</DialogTitle>
        </DialogHeader>
        <form id="create-classic-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {[{ label: "In-game ID", name: "ingameId" },
            { label: "Name", name: "name" },
            { label: "Publisher", name: "publisher" },
            { label: "Video Link", name: "videoLink" }].map(({ label, name }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
                aria-invalid={!!errors[name]}
              />
              {errors[name] && <div className="text-red-500 text-xs">{errors[name]}</div>}
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="minimumCompletion">Minimum Completion (%)</Label>
              <Input
                type="number"
                name="minimumCompletion"
                value={form.minimumCompletion}
                onChange={handleChange}
                min={1}
                max={100}
                aria-invalid={!!errors.minimumCompletion}
              />
              {errors.minimumCompletion && <div className="text-red-500 text-xs">{errors.minimumCompletion}</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ranking">Ranking</Label>
              <Input
                type="number"
                name="ranking"
                value={form.ranking}
                onChange={handleChange}
                min={1}
                aria-invalid={!!errors.ranking}
              />
              {errors.ranking && <div className="text-red-500 text-xs">{errors.ranking}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                name="difficulty"
                value={form.difficulty}
                onValueChange={value => handleSelectChange("difficulty", value)}
                required
              >
                <SelectTrigger id="difficulty" className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(Difficulty).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.difficulty && <div className="text-red-500 text-xs">{errors.difficulty}</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                name="duration"
                value={form.duration}
                onValueChange={value => handleSelectChange("duration", value)}
                required
              >
                <SelectTrigger id="duration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(Duration).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration && <div className="text-red-500 text-xs">{errors.duration}</div>}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center">
            <Label htmlFor="file" className="mb-2">Thumbnail</Label>
            <div
              className="w-full max-w-2xl flex flex-col items-center justify-center"
              onClick={handleFileAreaClick}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleFileAreaClick() }}
              role="button"
              aria-label="Select thumbnail image"
            >
              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="mx-auto rounded mb-2"
                  style={{ width: '320px', height: '180px', objectFit: 'cover', background: '#eee' }}
                />
              ) : (
                <Skeleton className="mx-auto mb-2" style={{ width: '320px', height: '180px' }} />
              )}
              <Button type="button" variant="outline" className="mt-2" onClick={handleFileAreaClick}>
                Choose Image
              </Button>
              <Input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                aria-invalid={!!errors.thumbnailLink}
                className="hidden"
              />
            </div>
            {errors.thumbnailLink && <div className="text-red-500 text-xs mt-2">{errors.thumbnailLink}</div>}
          </div>
        </form>
        <DialogFooter className="mt-4">
          <Button type="submit" form="create-classic-form" disabled={submitting || Object.values(errors).some(e => e)}>
            {submitting ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
