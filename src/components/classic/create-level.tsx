'use client'

import { useState } from "react"
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

export function CreateClassicLevelDialog() {
  const open = useDialogStore(state => state.dialogOpen)
  const setOpen = useDialogStore(state => state.setDialogOpen)

  const [form, setForm] = useState({
    ingameId: "",
    name: "",
    publisher: "",
    difficulty: Difficulty.EASY_DEMON,
    duration: Duration.TINY,
    videoLink: "",
    thumbnailLink: "",
    minimumCompletion: 0,
    ranking: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: ["minimumCompletion", "ranking"].includes(name)
        ? parseInt(value)
        : value,
    }))
  }

  const handleSubmit = async () => {
    try {
      await createClassic(form)
      setOpen(false)
    } catch (err) {
      console.error("Failed to create classic level", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Classic Level</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {[
            { label: "In-game ID", name: "ingameId" },
            { label: "Name", name: "name" },
            { label: "Publisher", name: "publisher" },
            { label: "Video Link", name: "videoLink" },
            { label: "Thumbnail Link", name: "thumbnailLink" },
          ].map(({ label, name }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="space-y-2">
            <Label htmlFor="minimumCompletion">Minimum Completion (%)</Label>
            <Input
              type="number"
              name="minimumCompletion"
              value={form.minimumCompletion}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ranking">Ranking</Label>
            <Input
              type="number"
              name="ranking"
              value={form.ranking}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              name="difficulty"
              value={form.difficulty}
              onValueChange={(value) =>
                setForm(prev => ({
                  ...prev,
                  difficulty: value as Difficulty,
                }))
              }
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Select
              name="duration"
              value={form.duration}
              onValueChange={(value) =>
                setForm(prev => ({
                  ...prev,
                  duration: value as Duration,
                }))
              }
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
          </div>

        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
